import { useContext, useEffect, useRef } from 'react'
import UserContext from '../contexts/user'

function SafeToggle() {
  useEffect(() => {
    if (user.state.nsfw_content) {
      toggle.current.classList.add('btn-warning')
    } else {
      toggle.current.classList.add('btn-success')
    }
  })

  const toggle = useRef(null)
  const user = useContext(UserContext)

  const clickHandler = () => {
    if (toggle.current.classList.contains('btn-warning')) {
      toggle.current.classList.remove('btn-warning')
      toggle.current.classList.add('btn-success')
      user.dispatch({ type: 'NSFW-CONTENT-OFF' }, user.state)
    } else {
      toggle.current.classList.add('btn-warning')
      toggle.current.classList.remove('btn-success')
      user.dispatch({ type: 'NSFW-CONTENT-ON' }, user.state)
    }
  }

  return (
    <button className="btn" onClick={() => clickHandler()} ref={toggle}>
      NSFW: <b>{user.state.nsfw_content ? 'ON' : 'OFF'}</b>
    </button>
  )
}

export default SafeToggle
