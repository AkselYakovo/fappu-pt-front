import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function TablePagination({
  website,
  initialTen,
  updateInitialTen,
  totalLinks
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)
  const [initialNumberOfNavigationLinks, setInitialNumberOfNavigationLinks] =
    useState(1)
  // const [maxNumberOfPages, setMaxNumberOfPages] = useState(0)
  // const [totalPages, setTotalPages] = useState(0)
  const numberOfNavLinks = 7

  useEffect(() => {
    const numberOfPages = Number.parseInt(totalLinks / recordsPerPage)
    const hasRemainer = totalLinks % recordsPerPage ? true : false
    setTotalNumberOfPages(hasRemainer ? numberOfPages + 1 : numberOfPages)
    // console.log('max number of pages:', numberOfPages)
  }, [totalLinks, recordsPerPage])

  const clickHandler = (logicalNavPage, page) => {
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${website.toLowerCase()}/records/${page - 1}`

    setIsLoading(true)

    if (logicalNavPage === numberOfNavLinks - 1 && page < totalNumberOfPages) {
      setInitialNumberOfNavigationLinks(page - (numberOfNavLinks - 2))
      setCurrentPage(page)
    } else if (logicalNavPage === 0 && page !== 1) {
      setInitialNumberOfNavigationLinks(page - 1)
      setCurrentPage(page)
    } else {
      setCurrentPage(page)
    }

    fetch(URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => updateInitialTen(data.links))
      .catch((err) => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }

  if (isLoading) {
    return (
      <ul className="pagination mb-0 justify-content-center">
        <li className="page-item disabled">
          <a href="#" className="page-link">
            First
          </a>
        </li>
        {Array.from({ length: numberOfNavLinks }).map((item, i) => (
          <li className="page-item disabled" key={i}>
            <a href="#" className="page-link">
              {initialNumberOfNavigationLinks + i}
            </a>
          </li>
        ))}
        <li className="page-item disabled">
          <a href="#" className="page-link">
            Last
          </a>
        </li>
      </ul>
    )
  }

  return (
    <ul className="pagination mb-0 justify-content-center">
      <li className="page-item">
        <a href="#" className="page-link">
          First
        </a>
      </li>
      {Array.from({ length: numberOfNavLinks }).map((item, i) => (
        <li
          className={
            currentPage === i + initialNumberOfNavigationLinks
              ? 'page-item active'
              : 'page-item'
          }
          key={i}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => clickHandler(i, initialNumberOfNavigationLinks + i)}
          >
            {initialNumberOfNavigationLinks + i}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a href="#" className="page-link">
          Last
        </a>
      </li>
    </ul>
  )
}

export default TablePagination

TablePagination.propTypes = {
  website: PropTypes.string.isRequired,
  totalLinks: PropTypes.number.isRequired
}
