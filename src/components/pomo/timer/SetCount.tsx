import "../../../styles/SetCount.scss"
import SetCountCircle from "./SetCountCircle";
import { TParts } from "../../../lib/constants"

interface Props {
  readonly pomodoros: number;
  readonly currentSet: number;
  readonly currentPart: TParts;
}

export default function SetCount(props: Props): JSX.Element {
  let circles: JSX.Element[] = [];
  if (props.currentPart !== "longBreak") {
    for (let x: number = 0; x < props.currentSet - 1; x++) {
      circles.push(
        <SetCountCircle key={circles.length+1} fill="full"/>
      )
    }
    if (props.currentPart === "break"){
      circles.push(
        <SetCountCircle key={circles.length+1} fill={"half"} />
      )
      for (let x: number = 0; x < props.pomodoros - props.currentSet; x++) {
        circles.push(
          <SetCountCircle key={circles.length+1}fill="empty"/>
        )
      }
    } else {
      for (let x: number = 0; x < props.pomodoros + 1 - props.currentSet; x++) {
        circles.push(
          <SetCountCircle key={circles.length+1} fill="empty"/>
        )
      }
    }
  }
  
  return (
    <div className="set-progress">
      <span>{props.currentPart === "longBreak" ? "Enjoy your long break!" : `Pomodoro ${props.currentSet} — `}</span>
      <span className="set-progress-circles">
        {circles}
      </span>
    </div>
  )
}