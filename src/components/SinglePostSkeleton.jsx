import { useNavigate, useParams } from 'react-router-dom'

let closeButtonStyles = {
  top: '8px',
  left: '8px'
}

let placeholderStyles = {
  minHeight: '225px'
}

function SinglePostSkeleton({ isHalted, children }) {
  const website = useParams().id
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }

  if (isHalted)
    return (
      <article className="card w-75 mx-auto mt-5">
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
        <div className="card-body">
          <p className="text-center mb-0">Try again later...</p>
        </div>
      </article>
    )

  return (
    <article className="card w-75 mx-auto mt-5">
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
      <div className="card-body placeholder-glow">
        {children ? (
          children
        ) : (
          <div className="d-flex">
            <figure
              className="col-md-4 p-0 ms-3 placeholder"
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
                <span className="placeholder col-md-3"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-4"></span>
              </p>
              <p className="text-center">
                <span className="placeholder col-md-3"></span>
              </p>
              <p className="text-center">
                <button className="btn placeholder btn-primary disabled col-md-2"></button>
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default SinglePostSkeleton
