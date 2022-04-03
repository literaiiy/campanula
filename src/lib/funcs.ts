import { ISettingsObj, IDBResObj, themeFonts, DB_BASEURL } from "./constants";

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
export const cAdjust = (color: string, percent: number): string => {
  let hex = color;

  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length === 3) {
      hex = hex.replace(/(.)/g, "$1$1");
  }

  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  const calculatedPercent = (100 + percent) / 100;

  r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
  g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
  b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));

  return `#${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b
      .toString(16)
      .toUpperCase()}`;
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
export const rawConfigToOptions = (rawConfig: string): ISettingsObj => {
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

// Queries database to see if the raw config already exists in the database
// Returns an object with status and body if request succeeded
// export const rawConfigToCode = async (rawConfig: string): Promise<IDBResObj> => {

//   const response = await fetch(`${DB_BASEURL}/pomodb/${rawConfig}`, { 
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })

//   const res = await response.json()

//   return {
//     "ok": response.ok,
//     "body": response.ok ? res : null 
//   }
// }

// Queries database to see if the raw config already exists in the database
// Returns an object with status and body if request succeeded
export const queryDB = async (str: string): Promise<IDBResObj> => {
  const response = await fetch(`${DB_BASEURL}/pomodb/${str}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const res = await response.json()
  console.log()

  return {
    "ok": response.ok,
    "body": response.ok ? res : null 
  }
}

export const postPair = async (code: string, rawConfig: string) => {
  let restonse: any; 
  const response = await fetch(`${DB_BASEURL}/pomodb/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([rawConfig, code])
  }).then((res) => {
    console.log("POST request completed")
    restonse = res.json()
  }).catch(() => {
    console.error("POST request did not complete")
  })

  // const res = await response.json();

  console.log(restonse)
}

// Helper method: queries the database to check if RC already exists
// Returns RC if found
// const queryDBforRC = async (code: string) => {

// }

// Helper method: queries the database to check if code already exists
// Returns code if found
// const queryDBforCode = async (rawConfig: string) => {
//   await fetch (`${DB_BASEURL}/pomo/${rawConfig}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then(res => {
//     return res;
//   })
//   .catch(e => { console.error(e); return;})
// }

// Generates a 4-digit code
// const generateCode = (): string => {

// }