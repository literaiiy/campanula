import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as full, faCircleHalfStroke as half } from '@fortawesome/free-solid-svg-icons'
import { faCircle as empty } from '@fortawesome/free-regular-svg-icons'

interface Props {
  fill: "empty" | "half" | "full";
}

export default function SetCountCircle(props: Props) {

  return (
    <span><FontAwesomeIcon icon={
      props.fill === "full" ? 
        full : 
        props.fill === "half" ? 
          half : 
          empty
    } /></span>
  )
}