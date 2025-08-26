import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function EmptySinglePost() {
  const navigate = useNavigate()
  useEffect(() => navigate('/'))
  return <h6 className="display-6 mt-3 text-center">Nothing to show here...</h6>
}

export default EmptySinglePost
