import { useState } from "react";
import "../../styles/SettingsOption.scss"
import { themeFonts } from "../../lib/constants"

interface Props {
  readonly type: "hms" | "integer" | "color" | "font";
  readonly id: string;
  readonly label?: string;
  readonly ph? : string;
}

export default function SettingsOption(props: Props) {
  const [HMSInputValue, setHMSInputValue] = useState("");
  const [pomoInputValue, setPomoInputValue] = useState('');

  function handleHMSInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedHMS = formatHMS(e.target.value);
    setHMSInputValue(formattedHMS);
  }
  
  function handlePomoInput(e: React.ChangeEvent<HTMLInputElement>) {
    const MAX = 30;
    const MIN = 1;
    console.log(e.target.value)

    const formattedPomo = formatPomoCount(e.target.value, MIN, MAX)
    setPomoInputValue(formattedPomo)
  }

  let input = <input type='text' name={props.id} placeholder={props.ph}/>
  switch (props.type) {
    case "hms":
      input = <input 
        onChange={(e) => handleHMSInput(e)} 
        value={HMSInputValue} 
        className="teal-shadow" 
        type="tel" 
        name={props.id} 
        maxLength={8} 
        placeholder={props.ph}
      />;
      break;
    case "integer":
      input = <input
        className="purple-shadow"
        type="number"
        onChange={(e) => handlePomoInput(e)}
        value={pomoInputValue}
        name={props.id}
        placeholder={props.ph}
      />;
      break;
    case "color":
      input = <input 
        type="color" 
        name={props.id} 
        placeholder={props.ph}
      />
      break;
    case "font":
      let array = []
      for (let x of themeFonts) {
        array.push(<option 
          key={toKebabCase(x)} 
          className={"font-" + toKebabCase(x)} 
          value={toKebabCase(x)}>{x}
        </option>)
    }
    input = <select 
      className="velvet-shadow" 
      name={props.id} 
      placeholder={props.ph}>{array}
    </select>
    break;
  }
  return (
    <li id={props.id + "-container"} className='option-container'>
      <label htmlFor={props.id}>{props.label}</label>
      {input}
    </li>
  )
}

function formatHMS(v: string) {
  if (!v) return v;

  const HMS = v.replace(/[^\d]/g, "")
  const length = HMS.length;

  if (length < 3) { return HMS; }
  if (length < 4) { return `${HMS.slice(0,1)}:${HMS.slice(1,)}` }
  if (length < 5) { return `${HMS.slice(0,2)}:${HMS.slice(2,)}` }
  if (length < 6) { return `${HMS.slice(0,1)}:${HMS.slice(1,3)}:${HMS.slice(3,6)}` }
  return `${HMS.slice(0,2)}:${HMS.slice(2,4)}:${HMS.slice(4,7)}`
}

function formatPomoCount(v: string, MIN: number, MAX: number) {
  if (!v) return v;

  if (MIN <= +v && +v <= MAX) { return ("" + v) }
  else if (+v > MAX) { return ("" + MAX) }
  else if (+v < MIN) { return ("" + MIN) }
  else { return ("") }
}

function toKebabCase(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase();
}