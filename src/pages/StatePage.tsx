import { useState } from "react"
import Filter from "../components/Filter"
import User from "../components/User"
import type { userType } from "../Types/userType"

const StatePage = () => {
   const [userData, setUserData] = useState<userType[]>([])

   const getUserData = (user : userType)=> {
        setUserData((prevUser)=> [...prevUser, user])
   }
   console.log(userData);
   
  return (
    <>
    <h1>State Page</h1>
      <User passUserData = {getUserData}/>
      <Filter/>
    </>
  )
}

export default StatePage
