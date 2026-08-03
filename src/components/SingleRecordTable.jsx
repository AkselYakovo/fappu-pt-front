import { useEffect, useState } from 'react'
import SingleRecordTableRow from './SingleRecordTableRow'

function SingleRecordTable({ scrapedRecords }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <table className="table table-striped-columns table-hover mb-0">
      <thead>
        <tr>
          <th>Index:</th>
          <th>Scraped On:</th>
          <th>Scraped Set:</th>
        </tr>
      </thead>
      <tbody>
        {scrapedRecords.map((recordData, i) => (
          <SingleRecordTableRow recordData={recordData} index={i} />
        ))}
      </tbody>
    </table>
  )
}

export default SingleRecordTable
