import { Link } from 'react-router-dom'
// import defaultImage from '../images/notfound.webp'
import PropTypes from 'prop-types'

const imageStyles = {
  width: 'auto',
  height: '180px'
}

function WebsiteCard({ website, linksNumber }) {
  return (
    <article className="card text-center col-lg-3 col-sm-6">
      <img
        src={`/${website.toLowerCase()}.png`}
        className="card-img-top object-fit-cover pt-2"
        style={imageStyles}
        alt={website}
      />
      <div className="card-body">
        <h3 className="display-h2 text-truncate" title={website}>
          {website}
        </h3>
        <Link
          className="btn btn-primary"
          to={'/website/' + website.toLowerCase()}
        >
          View Records
        </Link>
      </div>
      <small className="fw-bold text-body-secondary">
        {linksNumber || 0} links saved
      </small>
    </article>
  )
}

WebsiteCard.propTypes = {
  website: PropTypes.string.isRequired,
  linksNumber: PropTypes.number.isRequired
}

export default WebsiteCard
