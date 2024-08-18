import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Container } from '@/ui/components/container/container'
import { AsideNav } from '@/ui/modules/aside-nav/aside-nav'

export default async function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <Container className='h-[100vh] flex flex-row'>
      <Container className='basis-1/6 overflow-hidden bg-white'>
        <AsideNav/>
      </Container>
      <Container className='basis-5/6 overflow-auto bg-primary-50 p-4'>
        <Container className='min-h-[95vh] bg-white rounded-lg p-4'>
          {children}
        </Container>
      </Container>
    </Container>
  )
}
