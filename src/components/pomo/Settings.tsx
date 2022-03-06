import SettingsOption from "./SettingsOption"
import '../../styles/Settings.scss'

interface Props {
  readonly onUpdate: Function;
  readonly defaultOptions: any;
}

export default function Settings(props: Props): JSX.Element {
  console.log("%c Settings.tsx has rerendered", "color:navy; font-weight: 900")
  console.log(props.defaultOptions)

  const liftState = (opt: string, value: string | number): void => {
    props.onUpdate(opt, value)
  }
  
  return (
    <ul className="settings-list">
      <SettingsOption onUpdate={liftState} type="hms" id="work" label="Work length" ph={props.defaultOptions.work}/>
      <SettingsOption onUpdate={liftState} type="hms" id="break" label="Break length" ph={props.defaultOptions.break}/>
      <SettingsOption onUpdate={liftState} type="hms" id="longBreak" label="Long break length" ph={props.defaultOptions.longBreak}/>
      <SettingsOption onUpdate={liftState} type="integer" id="pomodoros" label="Pomodoros" ph={props.defaultOptions.pomodoros}/>
      <SettingsOption onUpdate={liftState} type="color" id="bg_color" label="Background color" ph={props.defaultOptions.bg_color}/>
      <SettingsOption onUpdate={liftState} type="color" id="text_color" label="Text color" ph={props.defaultOptions.text_color}/>
      <SettingsOption onUpdate={liftState} type="font" id="font" label="Font" ph={props.defaultOptions.font}/>
    </ul>
  )
}