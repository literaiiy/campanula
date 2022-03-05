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
  const [playing, changePlaying] = useState(false)

  const updateYeah = () => {
    changePlaying(!playing);
  }

  return (
    <div className='timer'>
      <SetCount pomodoros={props.conf.pomodoros}/>
      <Countdown currentlyPlaying={playing} workTime={props.conf.work} breakTime={props.conf.break}/>
      <StartPause onUpdate={updateYeah} playing={!playing}/>
    </div>
  )
}