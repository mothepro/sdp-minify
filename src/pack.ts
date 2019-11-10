import { delimiter, bytesToStr } from './util'

/**
 * Pack a RTC Session Description to the minimal
 * 
 * SDP must be version 0.
 * Only candidates with IPv4 are encoded.
 * 
 * String is broken into:
 *  + type (1 byte)
 *  + fingerprint (32 bytes)
 *  + candidate count (1 byte)
 *  + candidates (7 bytes each)
 *  + ufrag (unknown)
 *  + delimiter (1 byte)
 *  + pwd (unknown)
 * 
 * The grammar can be found here
 * @see https://tools.ietf.org/html/rfc5245#section-15.1
 * 
 * The explanation on how this works
 * @see https://webrtchacks.com/the-minimum-viable-sdp/
 */
export default function ({ type, sdp }: RTCSessionDescription): string {
  if (!sdp.startsWith('v=0'))
    throw Error('Provided SDP is not version 0')
  
  let ufrag!: string,
    pwd!: string,
    fingerprint!: string,
    candidates: string[] = []
  
  for (const line of sdp.split('\n')) {
    const splitter = line.indexOf(':')
    if (splitter <= 0) // must have a attribute and value pair
      continue
    
    const [attribute, value] = [line.slice(0, splitter), line.slice(splitter + 1).trim()]
    
    switch (attribute) {
    case 'a=ice-ufrag':
      ufrag = value
      break

    case 'a=ice-pwd':
      pwd = value
      break

    case 'a=fingerprint':
      fingerprint = bytesToStr(value.substr('sha-256'.length).trim().split(':').map(byte => parseInt(byte, 16)))
      break
      
    case 'a=candidate':
      const [foundation, componentId, transport, priority, connectionAddress, port] = line.split(' ')
      const ipBytes = connectionAddress.split('.').map(parseInt)
      if (ipBytes.length == 4) {
        const portNum = parseInt(port)
        candidates.push(bytesToStr([...ipBytes, portNum & 0xff0000, portNum & 0x00ff00, portNum & 0x0000ff]))
      }
      break
    }
  }

  return type.charAt(0) +
    fingerprint +
    candidates.length.toString(36) + // easier than the byte conversion
    candidates +
    ufrag +
    delimiter +
    pwd
}
