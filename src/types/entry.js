import PropTypes from 'prop-types'

export const entryShape = {
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  includesDownloads: PropTypes.bool.isRequired
}
