export interface ISettingsObj {
  work: number;
  break: number;
  long_break: number;
  pomodoros: number;
  bg_color: string;
  text_color: string;
  font: string;
}

export const defaultOptions: ISettingsObj = {
  work: 1500,
  break: 300,
  long_break: 900,
  pomodoros: 4,
  bg_color: "#FFFFFF",
  text_color: "#000000",
  font: "Readex Pro",
}

export const themeFonts = [
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