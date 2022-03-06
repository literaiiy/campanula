import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShareNodes as share } from '@fortawesome/free-solid-svg-icons'
import "../../styles/ShareMenu.scss"

export default function ShareMenu(): JSX.Element {
  return (
    <>
      <button className='share-button button'>
        <FontAwesomeIcon icon={share}/>
        <span>Share</span>
      </button>
    </>
  )
}