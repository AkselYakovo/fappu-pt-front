
const buttonStyles = {
  width: '200px',
  height: '40px'
}

function ContentSkeleton() {
  // const initialObj = { id: 0 }
  const initialArray = Array.from({ length: 6 }, (v, i) => new Object({id: i}))

  return (
    <main className="container col-md-10 row gy-3 justify-content-center column-gap-3 mx-auto mt-3">
      {initialArray.map((item) => (
        <article key={item.id} className="card col-md-4 placeholder-wave px-0">
          <figure
            className="placeholder bg-text-primary mb-0 p-0"
            style={{ height: '225px' }}
          ></figure>
          <div className="card-body">
            <p className="text-center">
              <span className="placeholder w-75 py-2"></span>
            </p>
            <p className="text-center">
              <button className="btn btn-primary disabled" style={buttonStyles}></button>
            </p>
          </div>
          <p className="text-center mb-1">
            <small className="placeholder w-50 py-1"></small>
          </p>
        </article>
      ))}
    </main>
  )
}

export default ContentSkeleton
