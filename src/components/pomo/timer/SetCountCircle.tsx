// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCircle as full, faCircleHalfStroke as half } from '@fortawesome/free-solid-svg-icons'
// import { faCircle as empty } from '@fortawesome/free-regular-svg-icons'
import { CircleFill, CircleHalf, Circle } from 'react-bootstrap-icons'

interface Props {
  fill: "empty" | "half" | "full";
}

export default function SetCountCircle(props: Props): JSX.Element {

  return (
    <span>{
      props.fill === "full" ? 
        <CircleFill /> : 
        props.fill === "half" ? 
          <CircleHalf /> : 
          <Circle />
    }
    </span>
  )
}