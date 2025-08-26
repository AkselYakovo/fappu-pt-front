import { useNavigate, useParams } from 'react-router-dom'

let closeButtonStyles = {
  top: '8px',
  left: '8px'
}

let placeholderStyles = {
  minHeight: '225px'
}

function SingleRecordSkeleton({ isHalted, children }) {
  const { id: website, index: recordID } = useParams()
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }

  return (
    <article className="card col-md-8 mx-auto mt-3">
      <button
        type="button"
        className="btn-close position-absolute"
        aria-label="Close"
        style={closeButtonStyles}
        onClick={() => goBack()}
      ></button>

      <div className="card-header position-static">
        <h2 className="display-4 text-center">
          RECORD #{recordID} of {website.toUpperCase()}
        </h2>
      </div>
      <div className="card-body placeholder-glow">
        {children ? (
          children
        ) : (
          <div className="d-flex">
            <figure
              className="col-md-3 p-0 placeholder ms-3"
              style={placeholderStyles}
            ></figure>
            <div className="col-md-8">
              <p className="text-center">
                <span className="placeholder col-md-3"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-2"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-4"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-2"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-4"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-1"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-4"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-3"></span>
              </p>
              <p className="text-center">
                <button className="btn placeholder btn-primary disabled col-md-3"></button>
                <button className="btn placeholder btn-light disabled col-md-2"></button>
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default SingleRecordSkeleton
