import { createContext } from 'react'

export const initialUserState = localStorage.getItem('$User')
  ? JSON.parse(localStorage.getItem('$User'))
  : {
      username: null,
      user_id: null,
      nsfw_content: false
    }

localStorage.setItem('$User', JSON.stringify(initialUserState))

const UserContext = createContext()

export default UserContext
