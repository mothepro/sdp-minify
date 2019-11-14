import Level from './level'
import jsonUnpack from './json/unpack'
import utf16Unpack from './utf16/unpack'

/** Unpacks a stringified SDP from a certain level. */
export default function (str: string, level = Level.RAW) {
  switch (level) {
    case Level.JSON:
    case Level.RAW:
      return jsonUnpack(str)
    
    case Level.UTF16:
      return utf16Unpack(str)
  }

  throw Error('Unreachable')
}
