import Footer from './Footer'
import { useEffect, useState } from 'react'
import ContentSkeleton from './ContentSkeleton'
import WebsiteCard from './WebsiteCard'


function Content() {
  const [websites, setWebsites] = useState(localStorage.getItem('$$_WEBSITES'))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const URL = import.meta.env.VITE_BACKEND_ADDRESS + '/websites'
    setIsLoading(true)

    fetch(URL)
      .then((res) => (res.ok ? res.json() : new Error()))
      .then((data) => {
        setWebsites(JSON.parse(data).websites)
        localStorage.setItem('$$_WEBSITES')
      })
      .catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <ContentSkeleton />
  }

  if (!isLoading && !websites) {
    return (
      <>
        <main className="container col-md-10">
          <h2 className="display-1 text-center">No websites to show</h2>
        </main>
      </>
    )
  }

  return (
    <>
      <main className="container col-lg-10 col-md-12 d-flex row justify-content-center column-gap-3 m-auto gy-3">
        {websites.map((website) => (
          <WebsiteCard
            key={website.index}
            website={website.name}
            linksNumber={website.total_links}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}

export default Content
