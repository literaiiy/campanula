import React, { useRef, useEffect } from 'react';

export const META_DESC = "Campanula is a completely customizable pomodoro timer application that is easy-to-use, fast, and sleek— ready for any work or study session."

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

export interface DBQueryRes {
  response: string;
  isRc: boolean;
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

export const nullOptions: ISettingsObj = {
  work: 1500,
  break: 300,
  longBreak: 900,
  pomodoros: 31,
  bg_color: "#FFFFFF",
  text_color: "#1c1c20",
  font: "Readex Pro",
}

export const nullerOptions: ISettingsObj = {
  work: 1500,
  break: 300,
  longBreak: 900,
  pomodoros: 32,
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

export const DB_BASEURL: string = "http://localhost:5000"

export function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current
}

export const templates: any = {
  "default":        "0015000003000009004FFFFFF1c1c200",
  "hard-worker":    "0036000006000018004FFFFFF1c1c200",
  "lenient":        "0018000006000012004FFFFFF1c1c200",
  "workhorse":      "0021000003000009003FFFFFF1c1c200",
  "5217":           "0031200010200010204FFFFFF1c1c200",
  "3-hour-special": "0018000003600009005FFFFFF1c1c200",
}

export const templatesReversed: any = {
  '0015000003000009004FFFFFF1c1c200': "default",
  '0018000003600009005FFFFFF1c1c200': "3-hour-special",
  '0018000006000012004FFFFFF1c1c200': "lenient",
  '0021000003000009003FFFFFF1c1c200': "workhorse",
  '0031200010200010204FFFFFF1c1c200': "5217",
  '0036000006000018004FFFFFF1c1c200': "hard-worker"
}