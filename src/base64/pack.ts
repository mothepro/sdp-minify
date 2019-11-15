import { toEnum } from '../sdpType'

/** Packs the SDP into a BASE64 strng. */
export default ({ type, sdp }: Required<RTCSessionDescriptionInit>) =>
  btoa(toEnum(type) + sdp)
