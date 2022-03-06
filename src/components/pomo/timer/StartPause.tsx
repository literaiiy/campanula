import "../../../styles/StartPause.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

interface Props {
  readonly onUpdate: Function; 
  playing: boolean;
}

export default function StartPause(props: Props): JSX.Element {
  
  const handleUpdate = () => {
    props.onUpdate(!props.playing);
  } 

  return (
    <button onClick={handleUpdate} className="start-pause button">
      <FontAwesomeIcon icon={props.playing ? faPlay : faPause} />
    </button>
  )
}