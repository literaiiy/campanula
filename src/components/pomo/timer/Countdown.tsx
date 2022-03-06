import { useEffect, useState, useRef } from "react";
import { secToHMS } from "../../../lib/funcs";
interface Props {
  //currentlyPlaying: boolean;
  cdTime: number;
  // workTime: number;
  // breakTime: number;
  // longBreakTime: number;
}

export default function Countdown(props: Props) {
  return (
    <>
      <div className='time'>
        {secToHMS(props.cdTime, true)}
      </div>
    </>
  )
}

