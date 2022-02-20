import "../../../styles/StartPause.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default function StartPause() {
  return (
    <button className="start-pause button">
      <FontAwesomeIcon icon={faPlay} />
    </button>
  )
}