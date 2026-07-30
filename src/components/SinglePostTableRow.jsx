import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/user'
import { useParams } from 'react-router-dom'

function SinglePostTableRow({ data }) {
  const user = useContext(UserContext)
  const website = useParams().id.toLocaleLowerCase()
  const [nsfwVisibility, setNsfwVisibility] = useState(user.state.nsfw_content)

  useEffect(() => {
    setNsfwVisibility(user.state.nsfw_content)
  }, [user.state.nsfw_content])

  return (
    <tr>
      <td>{data.index}</td>
      <td>{data.created_on}</td>
      <td>
        <a href={data.link} className="btn btn-sm btn-primary">
          Link
        </a>
      </td>
      <td>{data.scrape_index[0].scraped_on}</td>
      <td>
        {nsfwVisibility ? (
          <img src={data.promo_image_src} />
        ) : (
          <img src={data.promo_image_src} className="censored" />
        )}
      </td>
      <td>{data.scrape_index.length}</td>
      <td>
        <a
          href={`/website/${website}/record/${data.index}`}
          className="btn btn-sm btn-dark"
        >
          View More&nbsp;
          <i className="bi bi-eye"></i>
        </a>
      </td>
    </tr>
  )
}

export default SinglePostTableRow
