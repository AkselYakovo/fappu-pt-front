function SingleRecordTableRow({ recordData, index }) {
  const emptyArray = Array.from({ length: 4 }, () => 0)

  const filledArray = emptyArray.map((value, i) => {
    if (recordData.scrapped_entries[i]) return recordData.scrapped_entries[i]
    else return value
  })
  return (
    <tr>
      <td>{index}</td>
      <td>{recordData.scrapped_on}</td>
      <td>
        <table className="table table-sm nested-table mb-0">
          <tr>
            {filledArray.map((set) => (
              <th>
                {set.duration}&nbsp;{set.type}
              </th>
            ))}
          </tr>
          <tr>
            {filledArray.map((set) =>
              set.price ? <td>${set.price}</td> : <td>&nbsp;</td>
            )}
          </tr>
          <tr>
            {filledArray.map((set) =>
              set ? (
                set.includesDownloads ? (
                  <td>
                    <small className="badge rounded-pill text-bg-success fs-7">
                      <i className="bi bi-cloud-download"></i>
                    </small>
                  </td>
                ) : (
                  <td>
                    <small className="badge rounded-pill text-bg-danger">
                      <i className="bi bi-cloud-download"></i>
                    </small>
                  </td>
                )
              ) : (
                <td>&nbsp;</td>
              )
            )}
          </tr>
        </table>
      </td>
    </tr>
  )
}

export default SingleRecordTableRow
