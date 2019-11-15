/** Packs the SDP into a JSON strng. */
export default JSON.stringify as unknown as (str: string) => Required<RTCSessionDescriptionInit>
