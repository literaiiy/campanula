import { DBQueryRes, DB_BASEURL, defaultOptions, ISettingsObj, templates, templatesReversed, themeFonts } from "./constants";
import axios from "axios";

// Converts a string in the HH:MM:SS format to an integer amount of seconds
export const hmsToSec = (str: string): number => {
  const h = +str.slice(0, 2);
  const m = +str.slice(3, 5);
  const s = +str.slice(6,  );
  return 3600 * h + 60 * m + s;
}

// Converts minutes to seconds
export const minToSec = (m: number): number => {
  return m * 60;
}

// Convert an positive integer amount of seconds to the HH:MM:SS format
// Maxes out at 99:59:59 (359999 sec) & minimizes at 00:00:01 (1 sec)
export const secToHMS = (sec: number, removeHourPadding: boolean): string => {
  sec = Math.max(Math.min(sec, 359999), 1)

  const h = Math.floor(sec/3600);
  const m = Math.floor((sec - h * 3600)/60);
  const s = sec % 60;

  if (removeHourPadding && h === 0) {
    return `${(''+m).padStart(2, "0")}:${(''+s).padStart(2, "0")}`
  }
  return `${(''+h).padStart(2, "0")}:${(''+m).padStart(2, "0")}:${(''+s).padStart(2, "0")}`
}

// Forces the HH:MM:SS format on a specified string
// Also sanitizes input, reducing out-of-bounds numbers into the maximum specified time limit 
export const forceHMSFormat = (str: string): string => {
  return secToHMS(hmsToSec(str.padStart(8, "00:00:00")), false);
}

// Format a numeric string into the HH:MM:SS format
export const formatHMS = (v: string): string => {
  if (!v) return v;

  const HMS = v.replace(/[^\d]/g, "")
  const length = HMS.length;

  if (length < 3) { return HMS; }
  if (length < 4) { return `${HMS.slice(0,1)}:${HMS.slice(1,)}` }
  if (length < 5) { return `${HMS.slice(0,2)}:${HMS.slice(2,)}` }
  if (length < 6) { return `${HMS.slice(0,1)}:${HMS.slice(1,3)}:${HMS.slice(3,6)}` }
  return `${HMS.slice(0,2)}:${HMS.slice(2,4)}:${HMS.slice(4,7)}`
}

// Darken a hex-formatted color string
export const cAdjust = (color: string, amount: number): string => {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 0xFF)
  const fill = (str: string) => ('00' + str).slice(-2)

  const num = parseInt(color.slice(1), 16)
  const red = clamp((num >> 16) + amount)
  const green = clamp(((num >> 8) & 0x00FF) + amount)
  const blue = clamp((num & 0x0000FF) + amount)
  return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
}

// Convert to a CSS-safe font name
export const convertToCSSSafe = (str: string): string => {
  if (str === "System UI") { return "system-ui"}
  return str
}

// Convert options object to raw config string
export const optionsToRawConfig = (options: ISettingsObj): string => {
  return (
    ("" + options.work).padStart(6, "0") + 
    ("" + options.break).padStart(6, "0") + 
    ("" + options.longBreak).padStart(6, "0") + 
    options.pomodoros.toString(32) +
    options.bg_color.slice(1) +
    options.text_color.slice(1) +
    (themeFonts.indexOf(options.font) || 0 ).toString(32)
  )
}

// Convert raw config string to options object
export const rawConfigToOptions = (rawConfig: string | null): ISettingsObj => {
  if (rawConfig === null) { return defaultOptions; }
  return {
    work: +rawConfig.slice(0, 6),
    break: +rawConfig.slice(6, 12),
    longBreak: +rawConfig.slice(12, 18),
    pomodoros: parseInt(rawConfig.slice(18, 19), 32),
    bg_color: "#" + rawConfig.slice(19, 25),
    text_color: "#" + rawConfig.slice(25, 31),
    font: themeFonts[parseInt(rawConfig.slice(31), 32)],
  }
}

// Returns code from raw config. Checks for existing pairs, then uses that if exists 
// or creates a new pair if it doesn't. Returns null if the POST request fails
export const qDBRtoC = async (rc: string): Promise<string | null> => {
  let res;

  // Check if the RC is a template's RC
  if (Object.keys(templatesReversed).includes(rc)) {
    // console.log('template reached, skipping DB')
    return templatesReversed[rc];
  }

  try {
    res = await getQuery(rc)
    if (res.isRc === null) { 
      throw new Error("Not an error, just need to post new code")
    }
    return res.response;
  } catch(e) {
      // console.error(e)
    const validCode = generateCode(6)
    try {
      // console.log('asdasd')
      postPair(validCode, rc)
      return validCode;
    } catch (e) {
      // console.error(e)
    }
    return null;
  }
}

// Returns raw config from code. Returns null if no code exists.
export const qDBCtoR = async (code: string): Promise<string | null> => {
  
  // Check if the code is a template's code
  if (Object.keys(templates).includes(code)) {
    // console.log('2: template reached, skipping DB')
    return templates[code]
  }
  
  try {
    const res = await getQuery(code)
    // console.log("queried database (code to raw config)")
    return res.response
  } catch (e) {
    // console.error("Error with DB query")
    // console.error(e)
    return "noal";
  }
}

// Makes the actual GET request
export const getQuery = async (str: string): Promise<DBQueryRes | null> => {
  try {
    const res = await axios.get(`${DB_BASEURL}/pomodb/${str}`)
    // console.log(res.data)
    // const res = await response.json()
    return res.data;
  } catch(e) {
    // console.error(e)
    return null;
  }
}

// POSTs a code/raw config pair to the DB
export const postPair = (code: string, rawConfig: string): void => {
  // console.log("postPair has been reached")
  axios.post(`${DB_BASEURL}/pomodb/add`,
    [rawConfig, code]
  ).then((res) => {
    // console.log(res)
  }).catch((e) => {
    // console.error(e)
  })
  // console.log("pair post attempt finished")
}

//: generates a 4-digit code
export const generateCode = (len: number): string => {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-~';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Increases the `sessionStorage` `sharesSinceLoad` counter
export const sessionStorageShare = (): void => {
  if (window.sessionStorage.length === 0) {
    window.sessionStorage.setItem("intialLoad", "" + new Date().getTime())
    window.sessionStorage.setItem("sharesSinceLoad", "0")
  }
  window.sessionStorage.setItem("sharesSinceLoad", "" + (+window.sessionStorage.getItem("sharesSinceLoad") + 1))
  // console.log(window.sessionStorage);
}

// Checks to see if the user has overrun the share rate limit
export const isShareLimited = (): boolean => {
  const RATE_LIMIT: number = 60; // rate limit in shares/hour

  if (window.sessionStorage.length === 0) {
    return false;
  }

  const timeSinceLoad: number = new Date().getTime() - +window.sessionStorage.getItem("intialLoad");
  const fullHours: number = Math.floor(timeSinceLoad / 3600000);
  // console.log(fullHours);

  if (+window.sessionStorage.getItem("sharesSinceLoad") >= (fullHours + 1) * RATE_LIMIT) {
    return true;
  }
  return false;
}