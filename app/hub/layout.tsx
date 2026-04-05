import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const session = cookieStore.get('hub-session')

  // Middleware handles the redirect, but this is a fallback for server components
  if (!session || session.value !== process.env.HUB_PASSWORD) {
    // Only redirect if password is configured (avoids dev loop without .env)
    if (process.env.HUB_PASSWORD) {
      redirect('/hub/login')
    }
  }

  return <>{children}</>
}
