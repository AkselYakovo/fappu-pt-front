import { useEffect, useState } from 'react'
import SinglePostTableRow from './SinglePostTableRow'
import '../scss/table.scss'
import PropTypes from 'prop-types'
import TablePagination from './TablePagination'
import TablePaginationSkeleton from './TablePaginationSkeleton'

let lastTableColumnStyles = {
  maxWidth: '150px'
}

function SinglePostTable({ website }) {
  const [records, setRecords] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [initialTens, setInitialTens] = useState(null)

  useEffect(() => {
    const URL =
      import.meta.env.VITE_BACKEND_ADDRESS +
      `/website/${website.title.toLowerCase()}/records`

    setIsLoading(true)
    fetch(URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setRecords(data.links))
      .catch((err) => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }, [website.title])

  useEffect(() => {
    if (!records) return
    const newArray = records.slice(0, 10)
    setInitialTens(newArray)
  }, [records])

  const updateInitialTen = (records) => {
    setInitialTens(records)
  }

  if (isLoading) {
    return (
      <table className="table table-striped">
        <thead>
          <tr className="text-center text-warning">
            <th>Index:</th>
            <th>Appended On:</th>
            <th>Link:</th>
            <th>Latest Check:</th>
            <th>Promo Image:</th>
            <th>Sets:</th>
            <th>Info:</th>
          </tr>
        </thead>
        <tbody className="placeholder-wave">
          <tr>
            <td>
              <p className="text-center m-0 p-0">
                <span className="placeholder w-25 py-1"></span>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <span className="placeholder w-75 py-1"></span>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <button className="btn btn-primary btn-sm disabled w-50 placeholder"></button>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <span className="placeholder w-75 py-1"></span>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <span className="placeholder w-50 py-3"></span>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <span className="placeholder w-25 py-1"></span>
              </p>
            </td>
            <td>
              <p className="text-center m-0 p-0">
                <button className="btn btn-sm btn-disabled btn-dark w-75"></button>
              </p>
            </td>
          </tr>
        </tbody>
        <TablePaginationSkeleton totalLinks={8} />
      </table>
    )
  }

  if (!initialTens && !isLoading) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Index:</th>
            <th>Appended On:</th>
            <th>Link:</th>
            <th>Latest Check:</th>
            <th>Promo Image:</th>
            <th>Sets:</th>
            <th>Info:</th>
          </tr>
        </thead>
        <tr>
          <td colSpan="6">
            <p className="text-center">
              Failed to load records for&quot;{website.title}&quot;
            </p>
          </td>
        </tr>
      </table>
    )
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Index:</th>
            <th>Appended On:</th>
            <th>Link:</th>
            <th>Latest Check:</th>
            <th>Promo Image:</th>
            <th>Sets:</th>
            <th style={lastTableColumnStyles}>Info:</th>
          </tr>
        </thead>
        <tbody>
          {initialTens.map((record) => (
            <SinglePostTableRow key={record.index} data={record} />
          ))}
        </tbody>
      </table>
      <TablePagination
        website={website.title}
        updateInitialTen={updateInitialTen}
        totalLinks={website.total_links}
      />
    </>
  )
}

export default SinglePostTable

SinglePostTable.propTypes = {
  website: PropTypes.objectOf({
    title: PropTypes.string.isRequired
  })
}
