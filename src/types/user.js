import PropTypes from 'prop-types'

const propTypes = {
  username: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
  favList: PropTypes.arrayOf(
    PropTypes.shape({
      postID: 1
    })
  )
}

export default propTypes
