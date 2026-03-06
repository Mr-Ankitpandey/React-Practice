import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate()

    const handleBackHandler = ()=> {
        navigate('/')
    }
  return (
    <>
      <h2>404 ! Page Not Found</h2>
      <button onClick={handleBackHandler}>Back</button>
    </>
  )
}

export default ErrorPage
