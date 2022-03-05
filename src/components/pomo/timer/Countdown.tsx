import { useEffect, useState } from "react";
import { secToHMS } from "../../../lib/funcs";

interface Props {
  currentlyPlaying: boolean;
  workTime: number;
  breakTime: number;
}

export default function Countdown(props: Props) {
  const [cdTime, setCdTime] = useState(props.workTime);
  
  useEffect(() => {
    let interval: NodeJS.Timer;

    if (!cdTime) return;

    if (props.currentlyPlaying) {
      interval = setInterval(() => {
        setCdTime(cdTime - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [cdTime, props.currentlyPlaying])

  return (
    <>
      <div className='time'>
        {secToHMS(cdTime, true)}
      </div>
    </>
  )
}