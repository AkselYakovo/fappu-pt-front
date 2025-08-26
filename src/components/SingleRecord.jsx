import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SingleRecordSkeleton from './SingleRecordSkeleton'
import UserContext from '../contexts/user'
import SingleRecordTable from './SingleRecordTable'

let closeButtonStyles = {
  top: '8px',
  left: '8px'
}

function SingleRecord() {
  const user = useContext(UserContext)
  const { index: recordID, id: website } = useParams()
  const [recordData, setRecordData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nsfwVisibility, setNsfwVisibility] = useState(user.state.nsfw_content)
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/')
  }

  useEffect(() => {
    const web = website.toLocaleLowerCase()
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${web}/record/${recordID}`

    setIsLoading(true)

    fetch(URL)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((data) => setRecordData(data))
      .catch((err) => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }, [website, recordID])

  useEffect(() => {
    setNsfwVisibility(user.state.nsfw_content)
  }, [user.state.nsfw_content])

  if (isLoading) {
    return <SingleRecordSkeleton />
  }

  if (!isLoading && !recordData) {
    return (
      <div className="card col-md-8 mt-3 mx-auto">
        <div className="card-header">
          <h3 className="text-center">
            No records found for index #{recordID}
          </h3>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mx-auto" onClick={() => goBack()}>
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card col-md-8 mt-3 mx-auto">
      <button
        type="button"
        className="btn-close position-absolute"
        aria-label="Close"
        style={closeButtonStyles}
        onClick={() => goBack()}
      ></button>

      <div className="card-header">
        <h2 className="display-5 text-center mb-0">
          RECORD #{recordID} OF {website.toUpperCase()}
        </h2>
      </div>

      <div className="card-body d-flex">
        <figure className="col-md-3 ms-3">
          {nsfwVisibility ? (
            <img src={recordData.promo_image_src} className="img-fluid" />
          ) : (
            <img
              src={recordData.promo_image_src}
              className="img-fluid censored"
            />
          )}
          <figcaption className="d-flex justify-content-center">
            <button className="btn btn-info mt-3">Open Image</button>
          </figcaption>
        </figure>
        <div className="flex-fill">
          <p className="text-center fw-bold mb-1">Record Number:</p>
          <p className="text-center">{recordData.index}</p>
          <p className="text-center fw-bold mb-1">First Appeneded on:</p>
          <p className="text-center">{recordData.created_on}</p>
          <p className="text-center fw-bold mb-1">Total Scrapped Sets:</p>
          <p className="text-center">{recordData.scrap_index.length}</p>
          <p className="text-center fw-bold mb-1">Latest Scrapped Date:</p>
          <p className="text-center">{recordData.scrap_index[0].scrapped_on}</p>
          <p className="text-center">
            <a
              href={recordData.link}
              className="btn btn-primary"
              target="_blank"
            >
              Visit Website&nbsp;
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
            <button className="btn btn-light">
              <b>Scrap&nbsp;</b>
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </p>
        </div>
      </div>
      <div className="card-footer p-0">
        <SingleRecordTable scrappedRecords={recordData.scrap_index} />
      </div>
    </div>
  )
}

export default SingleRecord
