import React, { useState } from "react";
import "../../styles/SettingsOption.scss"
import { themeFonts } from "../../lib/constants"
import { forceHMSFormat, formatHMS, hmsToSec } from "../../lib/funcs"


interface onUpdateArgs {
  
  // fn: (opt: string, value: string | number) => {s: string, n: number};
}
interface Props {
  readonly onUpdate: Function;
  readonly type: "hms" | "integer" | "color" | "font";
  readonly id: string;
  readonly label?: string;
  readonly ph? : string;
}

export default function SettingsOption(props: Props) {
  const [HMSInputValue, setHMSInputValue] = useState("");
  const [pomoInputValue, setPomoInputValue] = useState('');

  // Handle change in the work/break/long break inputs
  const handleHMSOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedHMS = formatHMS(e.target.value);
    setHMSInputValue(formattedHMS);
  }

  const handleHMSOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedHMS = forceHMSFormat(e.target.value);
    setHMSInputValue(formattedHMS);
    props.onUpdate(e.target.name, hmsToSec(formattedHMS))
  }

  // Handle change in pomodoro input
  const handlePomoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX = 30;
    const MIN = 1;

    const formattedPomo = formatPomoCount(e.target.value, MIN, MAX)
    setPomoInputValue(formattedPomo)
  }

  const handleIntOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(e.target.name, e.target.valueAsNumber)
  }

  // Create input
  let input = <input type='text' name={props.id} placeholder={props.ph}/>
  switch (props.type) {
    case "hms":
      input = <input 
        onChange={(e) => handleHMSOnChange(e)} 
        onBlur={(e) => handleHMSOnBlur(e)}
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
        onChange={(e) => handlePomoInput(e)}
        onBlur={(e) => handleIntOnBlur(e)}
        className="purple-shadow"
        type="number"
        
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