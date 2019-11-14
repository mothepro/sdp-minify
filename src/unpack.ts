import Level from './level'
import jsonUnpack from './json/unpack'

/** Unpacks a stringified SDP from a certain level. */
export default function (str: string, level = Level.RAW) {
  switch (level) {
    case Level.JSON:
    case Level.RAW:
      return jsonUnpack(str)
  }

  throw Error('Unreachable')
}
