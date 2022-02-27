import { useState } from "react";
import { secToHMS } from "../../../lib/funcs";

interface Props {
  workTime: number;
  breakTime: number;
}

export default function Countdown(props: Props) {
  const [cdTime, setCdTime] = useState(props.workTime);

  return (
    <>
      <div className='time'>
        {secToHMS(props.workTime, true)}
      </div>
    </>
  )
}