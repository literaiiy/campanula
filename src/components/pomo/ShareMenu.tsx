// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faShareNodes as share } from '@fortawesome/free-solid-svg-icons'
import { ShareFill } from "react-bootstrap-icons"
import "../../styles/ShareMenu.scss"

export default function ShareMenu(): JSX.Element {
  return (
    <>
      <button className='share-button button'>
        <ShareFill/>
        <span>Share</span>
      </button>
    </>
  )
}