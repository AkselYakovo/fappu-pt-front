import { useEffect, useState } from 'react'
import SingleRecordTableRow from './SingleRecordTableRow'

function SingleRecordTable({ scrappedRecords }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <table className="table table-striped-columns table-hover mb-0">
      <thead>
        <tr>
          <th>Index:</th>
          <th>Scrapped On:</th>
          <th>Scrapped Set:</th>
        </tr>
      </thead>
      <tbody>
        {scrappedRecords.map((recordData, i) => (
          <SingleRecordTableRow recordData={recordData} index={i} />
        ))}
      </tbody>
    </table>
  )
}

export default SingleRecordTable
