import { useRef, useEffect } from 'react';

export interface ISettingsObj {
  work: number;
  break: number;
  longBreak: number;
  pomodoros: number;
  bg_color: string;
  text_color: string;
  font: string;
}

export interface IDBResObj {
  ok: boolean;
  body: {
    response: string;
    isRc: boolean | null;
    // code: string;
  };
}

export type TResClass = "code" | "rawConfig" | "dne" | "error" | null

export type TParts = "work" | "break" | "longBreak";


export const defaultOptions: ISettingsObj = {
  work: 1500,
  break: 300,
  longBreak: 900,
  pomodoros: 4,
  bg_color: "#FFFFFF",
  text_color: "#1c1c20",
  font: "Readex Pro",
}

export const themeFonts: Array<string> = [
  'Readex Pro',
  'Manrope',
  'Open Sans',
  'Lato',
  'Overpass',
  'Source Sans Pro',
  'DM Sans',
  'Arial',
  'Tahoma',
  'Trebuchet MS',
  'Verdana' ,
  'System UI',
  'Fraunces',
  'DM Serif Display',
  'Josefin Slab',
  'Times New Roman',
  'Georgia',
  'Lucida Bright',
  'Azeret Mono',
  'Space Mono',
  'Courier New',
  'Lucida Sans Typewriter'
]

export const DB_BASEURL = "http://localhost:5000"

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current
}