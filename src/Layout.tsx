import Titulo from './components/Titulo.tsx'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'
import Rodape from './components/Rodape.tsx'

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />
      <Toaster richColors position="top-center" />
      <Rodape/>
    </>
  )
}
