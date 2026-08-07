import PropTypes from 'prop-types'
import { entryShape } from './entry'

export const recordShape = {
  scraped_on: PropTypes.string.isRequired,
  scrape_index: PropTypes.arrayOf(PropTypes.shape(entryShape))
}
