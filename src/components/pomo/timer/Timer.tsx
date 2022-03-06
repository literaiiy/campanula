import SetCount from "./SetCount"
import Countdown from "./Countdown"
import StartPause from "./StartPause"
import "../../../styles/Timer.scss"
import { useState, useEffect, useRef } from 'react'
import type { ISettingsObj } from '../../../lib/constants.js'
import { TParts } from "../../../lib/constants"
import ding from "../../../lib/ding.mp3"
interface Props {
  conf: ISettingsObj;
}

export default function Timer(props: Props) {
  console.log("%c Timer.tsx has rerendered", "color:red; font-weight: 900")

  const [playing, changePlaying] = useState(false)
  const [set, setSet] = useState<number>(1)
  const [part, setPart] = useState<TParts>("work")
  const [cdTime, setCdTime] = useState<number>(props.conf.work);
  const prevCdTime = usePrevious(props.conf.work);

  // Returns the next part that should be incremented to
  const getNextPart = (): TParts => {
    if (part === "work") { return "break"}
    if (set === props.conf.pomodoros && part === "break") { return "longBreak" }
    return "work"
  }

  // Returns the next set that should be incremented to
  const getNextSet = (): number => {
    if (part === "longBreak") { return 1 }
    if (part === "work") { return set }
    return set % props.conf.pomodoros + 1
  }

  // Execute when the timer hits zero
  if (cdTime === 0) {
    setCdTime(props.conf[getNextPart()]);
    setPart(getNextPart());
    setSet(getNextSet());
    changePlaying(!playing)
    console.log("shitterton")
    new Audio(ding).play()
  }

  // If the work length input is changed, reset timer
  useEffect(() => {
    if (prevCdTime !== props.conf.work) {
      setCdTime(props.conf.work)
    }
  }, [prevCdTime, props.conf.work])
  
  // The actual countdown
  useEffect(() => {
    let interval: NodeJS.Timer;

    if (!cdTime) return;

    if (playing) {
      interval = setInterval(() => {
        setCdTime(cdTime - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [cdTime, playing])

  const updateYeah = (): void => {
    changePlaying(!playing);
  }

  return (
    <div className='timer'>
      <div>{part}</div>
      <SetCount currentSet={set} currentPart={part} pomodoros={props.conf.pomodoros}/>
      <Countdown cdTime={cdTime}/>
      <StartPause onUpdate={updateYeah} playing={!playing}/>
    </div>
  )
}

// usePrevious hook
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current
}