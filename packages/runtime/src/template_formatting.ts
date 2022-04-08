import {Integer} from "./types";
import {ICharacter} from "./types/_character";
import {INumeric} from "./types/_numeric";

type options = {
  timestamp?: string,
  date?: string,
  time?: string,
  pad?: string,
  width?: number,
  decimals?: number,
  align?: "left" | "right",
};

export function templateFormatting(source: ICharacter | INumeric, options: options) {
  let text = source.get() + "";
  if (options.timestamp === "iso") {
    text = text.substr(0,4) + "-" + text.substr(4,2) + "-" + text.substr(6,2) + "T" + text.substr(8,2) + ":" + text.substr(10,2) + ":" + text.substr(12,2);
  }
  if (options.date === "iso") {
    text = text.substr(0,4) + "-" + text.substr(4,2) + "-" + text.substr(6,2);
  }
  if (options.time === "iso") {
    text = text.substr(0,2) + ":" + text.substr(2,2) + ":" + text.substr(4,2);
  }
  if (options.width && options.pad) {
    if (options.align === "right") {
      text = text.trimEnd().padStart(options.width, options.pad);
    } else {
      text = text.trimEnd().padEnd(options.width, options.pad);
    }
  } else if (options.width) {
    text = text.trimEnd().padEnd(options.width, " ");
  } else if (options.decimals && source instanceof Integer) {
    text = source.get() + "." + "".padEnd(options.decimals, "0");
  }
  return text;
}