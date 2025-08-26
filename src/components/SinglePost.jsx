import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import UserContext from '../contexts/user'
import SinglePostSkeleton from './SinglePostSkeleton'
import SinglePostTable from './SinglePostTable'

const closeButtonStyles = {
  top: '8px',
  left: '8px'
}

const websiteImageStyles = {
  width: '100%'
}

function SinglePost() {
  const website = useParams().id
  const [web, setWeb] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [retryTimes, setRetryTimes] = useState(0)
  // const user = useContext(UserContext)
  const navigate = useNavigate()

  let isHalted = false

  useEffect(() => {
    const URL = import.meta.env.VITE_BACKEND_ADDRESS + '/website/' + website

    fetch(URL)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((website_object) => {
        setWeb(website_object)
      })
      .catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }, [website])

  const fetchPostAgain = () => {
    setIsLoading(true)

    if (retryTimes >= 3) {
      setIsLoading(false)
      isHalted = true
      return
    }

    setRetryTimes(retryTimes + 1)
    fetch(URL)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((website_object) => {
        setWeb(website_object)
      })
      .catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }

  const goBack = () => {
    navigate('/')
  }

  if (isLoading) {
    return <SinglePostSkeleton />
  } else if (web && !isLoading) {
    return (
      <article className="card w-75 mx-auto mt-5 mb-5">
        <button
          type="button"
          className="btn-close position-absolute"
          aria-label="Close"
          style={closeButtonStyles}
          onClick={() => goBack()}
        ></button>
        <div className="card-header position-static">
          <h2 className="display-3 text-center">{website.toUpperCase()}</h2>
        </div>
        <div className="row p-3">
          <div className="col-md-4 pr-0">
            <img
              src={`/${web.title.toLowerCase()}.png`}
              style={websiteImageStyles}
            />
          </div>
          <div className="col-md-8 p-0 mb-3">
            <div className="card-body p-0">
              <p className="text-center fw-bold mb-1">Title:</p>
              <p className="text-center">{web.title.toUpperCase()}</p>
              <p className="text-center fw-bold mb-1">Lowest Annual Price:</p>
              <p className="text-center">${web.lowest_annual_price} USD</p>
              <p className="text-center fw-bold mb-1">Lowest Monthly Price:</p>
              <p className="text-center">${web.lowest_montly_price} USD</p>
              <p className="text-center fw-bold mb-1">Total Links:</p>
              <p className="text-center">{web.total_links}</p>
              <p className="text-center">
                <a href={web.url} className="btn btn-primary" target="_blank">
                  Visit Website&nbsp;
                  <i className="bi bi-box-arrow-up-right"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer p-0">
          <SinglePostTable website={web} />
        </div>
      </article>
    )
  } else {
    return (
      <SinglePostSkeleton>
        <p className="text-center mb-0">
          <button
            className="btn btn-secondary"
            onClick={() => fetchPostAgain()}
          >
            Retry load&nbsp;
            <i className="bi-arrow-clockwise"></i>
          </button>
        </p>
      </SinglePostSkeleton>
    )
  }
}

export default SinglePost
