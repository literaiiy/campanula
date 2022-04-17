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

  const [playing, changePlaying] = useState<boolean>(false)
  const [set, setSet] = useState<number>(1)
  const [part, setPart] = useState<TParts>("work")
  const [cdTime, setCdTime] = useState<number>(props.conf.work);
  const prevWTime = usePrevious(props.conf.work);
  const prevBTime = usePrevious(props.conf.break);
  const prevLBTime = usePrevious(props.conf.longBreak);

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

  const updateYeah = (): void => {
    changePlaying(!playing);
  }

  if (set > props.conf.pomodoros) {
    setSet(0);
    setPart("longBreak");
  }

  // Execute when the timer hits zero
  if (cdTime === 0) {
    setCdTime(props.conf[getNextPart()]);
    setPart(getNextPart());
    setSet(getNextSet());
    changePlaying(!playing)
    new Audio(ding).play()
  }

  // If the work length input is changed, reset timer
  useEffect(() => {
    if (prevWTime !== props.conf.work && part === "work") {
      setCdTime(props.conf.work)
    }
    if (prevBTime !== props.conf.break && part === "break") {
      setCdTime(props.conf.break)
    }
    if (prevLBTime !== props.conf.longBreak && part === "longBreak") {
      setCdTime(props.conf.longBreak)
    }
  }, [prevWTime, prevBTime, prevLBTime, props.conf.work, props.conf.break, props.conf.longBreak, part])
  
  let baseline: number = Date.now() % 1000;

  useEffect(() => {
    baseline = Date.now() % 1000;
  }, [playing])
  
  // The actual countdown
    useEffect(() => {
      if (!cdTime) return;

      let int: any;

      if (playing) {
        int = setInterval(() => {
          setCdTime(cdTime - 1);
        }, 1000 - baseline)
      }

      return () => {clearInterval(int)}
    }, [cdTime, playing, baseline])

  return (
    <div className='timer'>
      {/* <div>{part}</div> */}
      <SetCount currentSet={set} currentPart={part} pomodoros={props.conf.pomodoros}/>
      <Countdown cdTime={cdTime}/>
      <StartPause onUpdate={updateYeah} playing={!playing}/>
    </div>
  )
}

// usePrevious hook
function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current
}