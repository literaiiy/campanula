import '../../styles/Settings.scss'
import { defaultOptions } from "../../lib/constants"
import { secToHMS } from "../../lib/funcs"
import { SetOpHMS, SetOpColor, SetOpInteger, SetOpText } from "./SettingsOption"

interface Props {
  readonly onUpdate: Function;
  readonly defaultOptions: any;
}

export default function Settings(props: Props): JSX.Element {
  console.log("%c Settings.tsx has rerendered", "color:navy; font-weight: 900")

  const liftState = (opt: string, value: string | number): void => {
    props.onUpdate(opt, value)
  }
  
  return (
    <ul className="settings-list">
      <SetOpHMS onUpdate={liftState} id="work" label="Work length" val={props.defaultOptions.work} def={secToHMS(defaultOptions.work, true)}/>
      <SetOpHMS onUpdate={liftState} id="break" label="Break length" val={props.defaultOptions.break} def={secToHMS(defaultOptions.break, true)}/>
      <SetOpHMS onUpdate={liftState} id="longBreak" label="Long break length" val={props.defaultOptions.longBreak} def={secToHMS(defaultOptions.longBreak, true)}/>
      <SetOpInteger onUpdate={liftState} id="pomodoros" label="Pomodoros" val={props.defaultOptions.pomodoros} def={"" + defaultOptions.pomodoros}/>
      <SetOpColor onUpdate={liftState} id="bg_color" label="Background color" val={props.defaultOptions.bg_color} def={"" + defaultOptions.bg_color}/>
      <SetOpColor onUpdate={liftState} id="text_color" label="Text color" val={props.defaultOptions.text_color} def={"" + defaultOptions.text_color}/>
      <SetOpText onUpdate={liftState} id="font" label="Font" val={props.defaultOptions.font} def={"" + defaultOptions.font}/>
    </ul>
  )
}