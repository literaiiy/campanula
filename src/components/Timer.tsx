import SetCount from "./SetCount"
import Countdown from "./Countdown"
import StartPause from "./StartPause"

export default function Timer() {
  return (
    <div className='timer'>
      <SetCount />
      <Countdown/>
      <StartPause/>
    </div>
  )
}