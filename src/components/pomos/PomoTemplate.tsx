import { Link } from 'react-router-dom';

interface Props {
  slug: string,
  name: string,
  sets: number,
  work: number,
  break: number,
  longBreak: number,
}

const TEAL_CUTOFF = 3.5;
const PURPLE_CUTOFF = 5;

export default function PomoTemplate(props: Props) {
  let colorScheme = determineColor()
  return (
    <li className={`pomo-template bg${colorScheme.bgColor} ${colorScheme.color}`}>
      <Link to={props.slug}>
        <div className='internals'>
          <h2>{props.name}</h2>
          <div><b>{props.sets} </b>{props.sets > 1 ? "pomodoros" : "pomodoro"}</div>
          <div><b>{props.work} min</b> work</div>
          <div><b>{props.break} min</b> break</div>
          <div><b>{props.longBreak} min</b> long break </div>
        </div>
      </Link>
    </li>
  )
  
  function determineColor() {
    let wbRatio = props.work / props.break;
    if (wbRatio <= TEAL_CUTOFF) { return {bgColor: "teal", color: "black"}}
    else if (wbRatio <= PURPLE_CUTOFF) { return {bgColor: "purple", color: "cream"}}
    else { return {bgColor: "velvet", color: "cream"}}
  }
}