'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DnaCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const helix = new THREE.Group()
    scene.add(helix)

    const NUM_POINTS = 60
    const TURNS = 3
    const HELIX_RADIUS = 1.4
    const HEIGHT = 9

    const sphereGeo = new THREE.SphereGeometry(0.09, 10, 10)
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x9ca3af })
    const bridgeMat = new THREE.MeshBasicMaterial({ color: 0x27272a })

    const positions1: THREE.Vector3[] = []
    const positions2: THREE.Vector3[] = []

    for (let i = 0; i < NUM_POINTS; i++) {
      const t = i / (NUM_POINTS - 1)
      const angle = t * Math.PI * 2 * TURNS
      const y = (t - 0.5) * HEIGHT

      const x1 = HELIX_RADIUS * Math.cos(angle)
      const z1 = HELIX_RADIUS * Math.sin(angle)
      const x2 = HELIX_RADIUS * Math.cos(angle + Math.PI)
      const z2 = HELIX_RADIUS * Math.sin(angle + Math.PI)

      const v1 = new THREE.Vector3(x1, y, z1)
      const v2 = new THREE.Vector3(x2, y, z2)
      positions1.push(v1)
      positions2.push(v2)

      const s1 = new THREE.Mesh(sphereGeo, mat1)
      s1.position.copy(v1)
      helix.add(s1)

      const s2 = new THREE.Mesh(sphereGeo, mat2)
      s2.position.copy(v2)
      helix.add(s2)
    }

    const lineGeo1 = new THREE.BufferGeometry().setFromPoints(positions1)
    const lineGeo2 = new THREE.BufferGeometry().setFromPoints(positions2)
    const lineMat1 = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.6, transparent: true })
    const lineMat2 = new THREE.LineBasicMaterial({ color: 0x9ca3af, opacity: 0.6, transparent: true })
    helix.add(new THREE.Line(lineGeo1, lineMat1))
    helix.add(new THREE.Line(lineGeo2, lineMat2))

    const bridgeGeos: THREE.CylinderGeometry[] = []
    for (let i = 0; i < NUM_POINTS; i += 5) {
      const v1 = positions1[i]
      const v2 = positions2[i]
      const mid = v1.clone().add(v2).multiplyScalar(0.5)
      const dir = v2.clone().sub(v1)
      const len = dir.length()

      const bridgeGeo = new THREE.CylinderGeometry(0.025, 0.025, len, 6)
      bridgeGeos.push(bridgeGeo)
      const bridge = new THREE.Mesh(bridgeGeo, bridgeMat)
      bridge.position.copy(mid)

      const axis = new THREE.Vector3(0, 1, 0)
      bridge.quaternion.setFromUnitVectors(axis, dir.normalize())
      helix.add(bridge)
    }

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      helix.rotation.y += 0.004
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      sphereGeo.dispose()
      mat1.dispose()
      mat2.dispose()
      bridgeMat.dispose()
      lineGeo1.dispose()
      lineGeo2.dispose()
      lineMat1.dispose()
      lineMat2.dispose()
      bridgeGeos.forEach(g => g.dispose())
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}
