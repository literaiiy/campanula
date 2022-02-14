import "../styles/SettingsOption.scss"
import { themeFonts } from "../lib/constants"

interface Props {
  readonly type: "hms" | "integer" | "color" | "font";
  readonly id: string;
  readonly label?: string;
  readonly ph? : string;
}

export default function SettingsOption(props: Props) {
  let input = <input type='text' name={props.id} placeholder={props.ph}/>
  switch (props.type) {
    case "hms":
      input = <input type="tel" pattern="[0-9]{2}h [0-9]{2}m [0-9]{2}s" name={props.id} placeholder={props.ph}/>;
      break;
    case "integer":
      input = <input type="number" min="0" max="999" name={props.id} placeholder={props.ph}/>;
      break;
    case "color":
      input = <input type="color" name={props.id} placeholder={props.ph}/>
      break;
    case "font":
      let array = []
      for (let x of themeFonts) {
        array.push(<option key={toKebabCase(x)} className={"font-" + toKebabCase(x)} value={toKebabCase(x)}>{x}</option>)
      }
      input = <select name={props.id} placeholder={props.ph}>{array}</select>
      break;
  }
  return (
    <li id={props.id + "-container"} className='option-container'>
      <label htmlFor={props.id}>{props.label}</label>
      {input}
    </li>
  )
}

function toKebabCase(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase();
}