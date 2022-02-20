import "../../../styles/SetCount.scss"
import SetCountCircle from "./SetCountCircle";

interface Props {
  readonly pomodoros: number;
}

export default function SetCount(props: Props) {
  let circles: JSX.Element[] = [];
  for (let x = 0; x < props.pomodoros; x++) {
    circles.push(
      <SetCountCircle key={x} fill="empty"/>
    )
  }
  
  return (
    <div className="set-progress">
      <span>Pomodoro {/* Handle this with state */} {5}{" — "}</span>
      <span className="set-progress-circles">
        {circles}
      </span>
    </div>
  )
}