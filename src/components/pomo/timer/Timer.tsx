import SetCount from "./SetCount"
import Countdown from "./Countdown"
import StartPause from "./StartPause"
import "../../../styles/Timer.scss"
import { useState } from 'react'
import type { ISettingsObj } from '../../../lib/constants.js'

interface Props {
  conf: ISettingsObj;
}

export default function Timer(props: Props) {

  return (
    <div className='timer'>
      <SetCount pomodoros={props.conf.pomodoros}/>
      <Countdown workTime={props.conf.work} breakTime={props.conf.break}/>
      <StartPause/>
    </div>
  )
}