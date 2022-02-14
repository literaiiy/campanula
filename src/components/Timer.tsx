import SetCount from "./SetCount"
import Countdown from "./Countdown"
import StartPause from "./StartPause"
import "../styles/Timer.scss"

export default function Timer() {
  return (
    <div className='timer'>
      <SetCount />
      <Countdown/>
      <StartPause/>
    </div>
  )
}