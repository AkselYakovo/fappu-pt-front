import { useContext, useState } from 'react'
import UserContext from '../contexts/user'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)

  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    const headers = new Headers()
    const URL = import.meta.env.VITE_BACKEND_ADDRESS + '/login/user'
    setIsSubmitted(true)
    headers.append('Content-Type', 'application/json')

    fetch(URL, {
      method: 'post',
      body: JSON.stringify({
        user,
        password,
        token: Math.ceil(Math.random() * 100)
      }),
      headers: headers,
      credentials: 'include'
    })
      .then((request) => {
        if (request.ok) return request.json()
        else if (request.status === 401) {
          alert('invalid credentials!')
        }
      })
      .then((data) => {
        dispatch(
          {
            type: 'SET-USER',
            payload: {
              username: data.username,
              favList: [],
              userID: data.user_id
            }
          },
          state
        )
        navigate('/')
      })
      .finally(() => setIsSubmitted(false))
  }

  return (
    <form onSubmit={submitHandler} encType="x-www-form-urlencoded">
      <div className="row d-flex pt-5">
        <h3 className="mb-5">Login:</h3>
        <div className="d-flex row justify-content-center mb-3">
          <label className="form-label text-center">Username:</label>
          <input
            type="text"
            name="nick"
            className="form-control w-75"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="d-flex row justify-content-center mb-3">
          <label className="form-label text-center">Password:</label>
          <input
            type="password"
            name="pass"
            className="form-control w-75"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center column-gap-1 mb-4">
          <input type="checkbox" id="remindme" name="reminder" className="" />
          <label htmlFor="remindme" className="form-label mb-0">
            Remind me
          </label>
        </div>
        <div className="d-flex justify-content-center align-items-center column-gap-1">
          {isSubmitted ? (
            <button className="btn btn-secondary w-100">
              <div className="spinner-border text-light">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button className="btn btn-primary w-100">Login In</button>
          )}
        </div>
      </div>
    </form>
  )
}

export default LoginForm
