import { useContext } from 'react'
import UserContext from '../contexts/user'
import LoginForm from './LoginForm'
import LoginSidebar from './LoginSidebar'
import { Navigate } from 'react-router-dom'

function Login() {
  const { userID } = useContext(UserContext)['state']
  console.log(userID)
  return !userID ? (
    <main className="container d-flex column row-gap-1">
      <section className="col-6">
        <LoginForm />
      </section>
      <LoginSidebar />
    </main>
  ) : (
    <Navigate to="/" replace />
  )
}

export default Login
