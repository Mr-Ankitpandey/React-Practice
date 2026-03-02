import MainNavbar from '../components/MainNavbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <MainNavbar/>
      <Outlet/>
    </>
  )
}

export default RootLayout
