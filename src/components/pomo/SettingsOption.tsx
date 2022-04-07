import React, { useEffect, useState,  } from "react";
import "../../styles/SettingsOption.scss"
import { themeFonts } from "../../lib/constants"
import { forceHMSFormat, formatHMS, hmsToSec, secToHMS } from "../../lib/funcs"
interface Props {
  readonly onUpdate: Function;
  readonly id: string;
  readonly label?: string;
  readonly val?: any;
  readonly def: string;
}

interface GenericProps {
  readonly content: JSX.Element;
  readonly id: string;
  readonly label?: string;
  readonly val?: any;
}

export default function SettingsOption(props: GenericProps) {
  return (
    <li id={props.id + "-container"} className='option-container'>
      <label htmlFor={props.id}>{props.label}</label>
      {props.content}
    </li>
  )
}

export function SetOpHMS(props: Props): JSX.Element {
  console.log(secToHMS(props.val, true))
  const [HMSInputValue, setHMSInputValue] = useState(secToHMS(props.val, true) || props.def);

  useEffect(() => {
    console.log(HMSInputValue)
    console.log(secToHMS(props.val, true))
    setHMSInputValue(secToHMS(props.val, true))
  }, [props.val])

  // Handle change in the work/break/long break inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedHMS = formatHMS(e.target.value);
    setHMSInputValue(formattedHMS);
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedHMS = forceHMSFormat(e.target.value);
    setHMSInputValue(formattedHMS);
    props.onUpdate(e.target.name, hmsToSec(formattedHMS))
  }

  return (
    <SettingsOption 
      content={<input 
        onChange={(e) => handleChange(e)} 
        onBlur={(e) => handleBlur(e)}
        value={HMSInputValue} 
        className="teal-shadow" 
        type="tel" 
        name={props.id} 
        maxLength={8}
        placeholder={props.def}
      />}
      id={props.id}
      label={props.label}
      // val={props.val}
    />
  )
}

export function SetOpInteger(props: Props): JSX.Element {
  const [intInputValue, setIntInputValue] = useState(props.val || props.def);

  // Handle change in pomodoro input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX = 30;
    const MIN = 1;
    const formattedPomo = formatPomoCount(e.target.value, MIN, MAX)
    setIntInputValue(formattedPomo)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(e.target.name, e.target.valueAsNumber || 4)
  }

  return (
    <SettingsOption 
      content={<input
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        className="purple-shadow"
        type="number"
        value={intInputValue}
        placeholder={props.def}
        name={props.id}
      />}
      id={props.id}
      label={props.label}
      val={props.val}
    />
  )
}

export function SetOpColor(props: Props): JSX.Element {
  const [color, setColor] = useState(props.val || props.def)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value)
    props.onUpdate(e.target.name, e.target.value)
  }

  return (
    <SettingsOption 
      content={<input 
        type="color" 
        className="velvet-shadow"
        name={props.id} 
        value={color}
        placeholder={props.def}
        onChange={handleChange}
      />}
      id={props.id}
      label={props.label}
      val={props.val}
    />
  )
}

export function SetOpText(props: Props): JSX.Element {
  const [font, setFont] = useState(props.val || props.def)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFont(e.target.value)
    props.onUpdate(e.target.name, e.target.value)
  }

  let array = []
  for (let x of themeFonts) {
    array.push(<option 
      key={toKebabCase(x)} 
      className={"font-" + toKebabCase(x)} 
      value={x}>{x}
    </option>)
  }

  return (
    <SettingsOption content={<select 
        className="velvet-shadow" 
        name={props.id} 
        value={font}
        onChange={handleChange}
        placeholder={props.def}>{array}
      </select>}
      id={props.id}
      label={props.label}
      val={props.val}
    />
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