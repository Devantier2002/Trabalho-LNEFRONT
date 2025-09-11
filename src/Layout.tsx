import Titulo from './components/Titulo.tsx'
import { Outlet } from 'react-router-dom'
import Rodape from './components/rodape.tsx'
import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />
      <Toaster richColors position="top-center" />
      <Rodape />
    </>
  )
}
