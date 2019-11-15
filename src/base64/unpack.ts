import { toType } from '../sdpType'

/** Packs the SDP into a BASE64 strng. */
export default function (sdp: string): Required<RTCSessionDescriptionInit> {
  const str = atob(sdp)
  return {
    type: toType(parseInt(str.substr(0, 1))),
    sdp: str.substr(1)
  }
}
