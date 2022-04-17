import { Link } from 'react-router-dom';

interface Props {
  slug: string,
  name: string,
  sets: number,
  work: number,
  break: number,
  longBreak: number,
}

interface IColors {
  bgColor: string,
  color: string
}

const TEAL_CUTOFF: number = 3.5;
const PURPLE_CUTOFF: number = 5;

export default function PomoTemplate(props: Props): JSX.Element {
  const determineColor = (): IColors => {
    let wbRatio: number = props.work / props.break;
    if (wbRatio <= TEAL_CUTOFF) { 
      return {bgColor: "teal", color: "black"}
    }
    else if (wbRatio <= PURPLE_CUTOFF) {
      return {bgColor: "purple", color: "cream"}
    }
    return {bgColor: "velvet", color: "cream"}
  }

  const colorScheme: IColors = determineColor();

  return (
    <li className={`pomo-template bg${colorScheme.bgColor} ${colorScheme.color}`}>
      <Link to={props.slug}>
        <div className='internals'>
          <h2>{props.name}</h2>
          <div><b>{props.sets} </b>{props.sets > 1 ? "pomodoros" : "pomodoro"}</div>
          <div><b>{props.work / 60} min</b> work</div>
          <div><b>{props.break / 60} min</b> break</div>
          <div><b>{props.longBreak / 60} min</b> long break </div>
        </div>
      </Link>
    </li>
  )
  
}