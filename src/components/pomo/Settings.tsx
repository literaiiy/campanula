import SettingsOption from "./SettingsOption"
import '../../styles/Settings.scss'

export default function Settings() {
  return (
    <ul className="settings-list">
      <SettingsOption type="hms" id="work-time" label="Work length" ph="25:00"/>
      <SettingsOption type="hms" id="break-time" label="Break length" ph="5:00"/>
      <SettingsOption type="hms" id="long-break-time" label="Long break length" ph="15:00"/>
      <SettingsOption type="integer" id="set-length" label="Pomodoros" ph="4"/>
      <SettingsOption type="color" id="bg-color" label="Background color" ph="#000000"/>
      <SettingsOption type="color" id="text-color" label="Text color"/>
      <SettingsOption type="font" id="font" label="Font" ph="Readex Pro"/>
    </ul>
  )
}