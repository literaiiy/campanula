
// Converts a string in the HH:MM:SS format to an integer amount of seconds
export const hmsToSec = (str: string) => {
  const h = +str.slice(0, 2);
  const m = +str.slice(3, 5);
  const s = +str.slice(6,  );
  return 3600 * h + 60 * m + s;
}

// Converts minutes to seconds
export const minToSec = (m: number) => {
  return m * 60;
}

// Convert an positive integer amount of seconds to the HH:MM:SS format
// Maxes out at 99:59:59 (359999 sec)
export const secToHMS = (sec: number, removeHourPadding: boolean) => {
  sec = Math.min(sec, 359999)

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
export const forceHMSFormat = (str: string) => {
  return secToHMS(hmsToSec(str.padStart(8, "00:00:00")), false);
}


// Format a numeric string into the HH:MM:SS format
export const formatHMS = (v: string) => {
  if (!v) return v;

  const HMS = v.replace(/[^\d]/g, "")
  const length = HMS.length;

  if (length < 3) { return HMS; }
  if (length < 4) { return `${HMS.slice(0,1)}:${HMS.slice(1,)}` }
  if (length < 5) { return `${HMS.slice(0,2)}:${HMS.slice(2,)}` }
  if (length < 6) { return `${HMS.slice(0,1)}:${HMS.slice(1,3)}:${HMS.slice(3,6)}` }
  return `${HMS.slice(0,2)}:${HMS.slice(2,4)}:${HMS.slice(4,7)}`
}