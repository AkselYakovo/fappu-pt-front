import Header from './components/Header'
import Content from './components/Content'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import SinglePost from './components/SinglePost'
import EmptySinglePost from './components/EmptySinglePost'
import { useReducer } from 'react'
import UserContext, { initialUserState } from './contexts/user'
import userReducer from './reducers/user'
import Login from './components/Login'
import SingleRecord from './components/SingleRecord'

function App() {
  const [currentUser, dispatch] = useReducer(userReducer, initialUserState)

  return (
    <UserContext.Provider value={{ state: currentUser, dispatch }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="website">
            <Route path=":id" element={<SinglePost />} />
            <Route index element={<EmptySinglePost />} />
          </Route>
          <Route path="website/:id/record/:index" element={<SingleRecord />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
