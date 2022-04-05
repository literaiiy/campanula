import { isConstructorDeclaration, validateLocaleAndSetLanguage } from "typescript";
import { ISettingsObj, IDBResObj, TResClass, themeFonts, DB_BASEURL } from "./constants";

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

// Queries database
// Returns an object with status and body if request succeeded
// export const queryDB = async (str: string): Promise<IDBResObj> => {
//   let res;
//   let response: IDBResObj = {
//     ok: false,
//     body: {
//       response: "",
//       isRc: null,
//     }
//   };

//   try {
//     res = await getQuery(str)
//     console.log("YES")
//     const validCode = generateCode(4)
//     await postPair(validCode, res.response)
//     return res;
//   } catch (e) {
//     // if (res.createNewCode) {
//     //   console.log("YES2")
//     //   const validCode = await generateValidCode()
//     //   await postPair(validCode, res.response)
//     // }
//     return {
//       ok: false,
//       body: {
//         response: "ERROR: Code doesn't exist",
//         isRc: null,
//       }
//     }
//   }
//   console.log(response)
//   return response;
// }

// Returns code from raw config. Checks for existing pairs, then uses that if exists 
// or creates a new pair if it doesn't. Returns null if the POST request fails
export const qDBRtoC = async (rc: string): Promise<string | null> => {
  let res;
  try {
    res = await getQuery(rc)
    console.log("figg")
    console.log(res)
    if (res.isRc === null) { throw new Error("Not an error, just need to post new code") }
    return res.response;
  } catch(e) {
    console.error(e)
    const validCode = generateCode(4)
    try {
      await postPair(validCode, rc)
      return validCode;
    } catch (e) {
      console.error(e)
    }
    return null;
  }
}

// Returns raw config from code. Returns null if no code exists.
export const qDBCtoR = async (code: string): Promise<IDBResObj | null> => {
  try {
    const res = await getQuery(code)
    console.log("queried database (code to raw config)")
    return res[0].rawConfig
  } catch (e) {
    return null;
  }
}

// Makes the actual GET request
export const getQuery = async(str: string) => {
  const response = await fetch(`${DB_BASEURL}/pomodb/${str}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const res = await response.json()

  console.log(res)

  return res;

  // return {
  //   "ok": res.ok,
  //   "body": res.ok ? res.body : null
  // }
}

// POSTs a code/raw config pair to the DB
export const postPair = async (code: string, rawConfig: string) => {
  let restonse: any; 
  console.log("postPair has been reached")
  const response = await fetch(`${DB_BASEURL}/pomodb/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([rawConfig, code])
  })

  // const res = await response.json();
}

// Determines whether the specified string is a raw config or code
// const classifyResponse = (str: string): TResClass => {
//   if (str.length === 32) {
//     return "rawConfig";
//   } else if (str.length === 4) {
//     return "code";
//   } else if (str.slice(0, 5) === "ERROR") {
//     return "error";
//   }
//   return null;
// }

// Generates a VALID 4-digit code
// export const generateValidCode = async (): Promise<string> => {
//   let code = "default";
//   while (1) {
//     code = generateCode(4)
//     console.log("Verifying code...")
//     // const res = await queryDB(code);
//     console.log("DB query completed.")
//     //if (res.body.isRc === null) {
//       console.log("Valid code has been found & verified.")
//     //  break;
//     //}
//   }
//   return code;
// }


//: generates a 4-digit code
export const generateCode = (len: number): string => {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-~';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}