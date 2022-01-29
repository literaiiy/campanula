import { URL } from "url"
import SettingsOption from "./SettingsOption"

export default function Settings() {
  return (
    <ul className='settings-list'>
      <li><SettingsOption type="HMS"/></li>
      <li><SettingsOption type="HMS"/></li>
      <li><SettingsOption type="HMS"/></li>
      <li><SettingsOption type="integer"/></li>
      <li><SettingsOption type="color"/></li>
      <li><SettingsOption type="color"/></li>
      <li><SettingsOption type="color"/></li>
    </ul>
  )
}