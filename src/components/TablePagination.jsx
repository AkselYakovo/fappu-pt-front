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
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    Number.parseInt(totalLinks / recordsPerPage) + 1
  )
  const [paginationLinks, setPaginationLinks] = useState(1)
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(1)
  const [maxNumberOfPaginationLinks, setMaxNumberOfPaginationLinks] =
    useState(7)

  useEffect(() => {
    if (totalLinks < maxNumberOfPaginationLinks * recordsPerPage) {
      setPaginationLinksNumber(Number.parseInt(totalLinks / recordsPerPage) + 1)
    } else {
      setPaginationLinksNumber(maxNumberOfPaginationLinks)
    }
  }, [maxNumberOfPaginationLinks, recordsPerPage, totalLinks])

  const clickHandler = (logicalNavPage, page) => {
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${website.toLowerCase()}/records/${page - 1}`

    setIsLoading(true)

    if (paginationLinksNumber === maxNumberOfPaginationLinks) {
      if (
        logicalNavPage === paginationLinksNumber - 1 &&
        page < totalNumberOfPages
      ) {
        setPaginationLinks(page - (paginationLinksNumber - 2))
        setCurrentPage(page)
      } else if (logicalNavPage === 0 && page !== 1) {
        setPaginationLinks(page - 1)
        setCurrentPage(page)
      } else {
        setCurrentPage(page)
      }
    } else {
      setCurrentPage(page)
    }

    fetch(URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => updateInitialTen(data.links))
      .catch((err) => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }

  const goToFirst = () => {
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${website.toLowerCase()}/records/0}`

    setIsLoading(true)
    setCurrentPage(1)
    setPaginationLinks(1)

    fetch(URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => updateInitialTen(data.links))
      .catch((err) => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }

  const goToLast = () => {
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${website.toLowerCase()}/records/${totalNumberOfPages - 1}}`
    setIsLoading(true)
    setCurrentPage(totalNumberOfPages)

    if (paginationLinksNumber === maxNumberOfPaginationLinks) {
      setPaginationLinks(totalNumberOfPages - (paginationLinksNumber - 1))
    } else {
      setPaginationLinks(1)
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
        {Array.from({ length: paginationLinksNumber }).map((item, i) => (
          <li className="page-item disabled" key={i}>
            <a href="#" className="page-link">
              {paginationLinks + i}
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
        <a href="#" className="page-link">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          First
        </a>
      </li>
      {Array.from({ length: paginationLinksNumber }).map((item, i) => (
        <li
          className={
            currentPage === i + paginationLinks
              ? 'page-item active'
              : 'page-item'
          }
          key={i}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => clickHandler(i, paginationLinks + i)}
          >
            {paginationLinks + i}
          </a>
        </li>
      ))}
        <a href="#" className="page-link">
      <li
        className={
          currentPage === totalNumberOfPages
            ? 'page-item disabled'
            : 'page-item'
        }
      >
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
