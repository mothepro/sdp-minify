import Level from './level'
import jsonPack from './json/pack'

/** Packs an SDP stringable format. */
export default function({ type, sdp }: RTCSessionDescriptionInit, level = Level.RAW): string {
  if (!sdp || !sdp.startsWith('v=0'))
    throw Error('Provided SDP is not version 0')

  switch (level) {
    case Level.JSON:
    case Level.RAW:
      return jsonPack({ type, sdp })
  }

  throw TypeError('Unreachable')
}
