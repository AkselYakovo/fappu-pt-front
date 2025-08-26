function TablePaginationSkeleton({ totalLinks }) {
  return (
    <ul className="pagination mb-0 justify-content-center">
      { Array.from({length: totalLinks}).map((item, i) => (
        <li className="page-item disabled" key={i}>
          <a href="#" className="page-link">{i + 1}</a>
        </li>
      )) }
    </ul>
  )
}

export default TablePaginationSkeleton