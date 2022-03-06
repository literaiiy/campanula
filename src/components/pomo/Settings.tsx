import SettingsOption from "./SettingsOption"
import '../../styles/Settings.scss'

interface Props {
  readonly onUpdate: Function;
}

export default function Settings(props: Props): JSX.Element {
  const liftState = (opt: string, value: string | number): void => {
    props.onUpdate(opt, value)
  }
  
  return (
    <ul className="settings-list">
      <SettingsOption onUpdate={liftState} type="hms" id="work" label="Work length" ph="25:00"/>
      <SettingsOption onUpdate={liftState} type="hms" id="break" label="Break length" ph="5:00"/>
      <SettingsOption onUpdate={liftState} type="hms" id="longBreak" label="Long break length" ph="15:00"/>
      <SettingsOption onUpdate={liftState} type="integer" id="pomodoros" label="Pomodoros" ph="4"/>
      <SettingsOption onUpdate={liftState} type="color" id="bg_color" label="Background color" ph="#000000"/>
      <SettingsOption onUpdate={liftState} type="color" id="text_color" label="Text color"/>
      <SettingsOption onUpdate={liftState} type="font" id="font" label="Font" ph="Readex Pro"/>
    </ul>
  )
}