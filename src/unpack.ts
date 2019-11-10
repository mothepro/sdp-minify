import { strToBytes, bytesToStr, delimiter } from './util'

/** Converts the first char of a RTC SDP type to the full value. */
function sdpType(char: string): RTCSdpType {
  switch (char) {
    case 'o':
      return 'offer'
    case 'a':
      return 'answer'
    case 'r':
      return 'rollback'
    case 'p':
      return 'pranswer'
  }
  throw Error(`'${char}' doesn't map to a RTC DSP type.`)
}

/** 
 * Unpacks a minified SDP.
 * 
 * All candidates are restored as `typ host`
 * 
 */
export default function (packed: string) {
  const type = sdpType(packed.substr(0, 1)),
    fingerprint = strToBytes(packed.slice(1, 33)).map(byte => ('0' + byte.toString(16)).slice(-2)),
    candidateCount = parseInt(packed.substr(33, 1), 36),
    [ufrag, password] = packed.substr(34 + candidateCount * 6).split(delimiter),
    candidates: { ip: string, port: number }[] = new Array(candidateCount).map((_, i) => {
      const portBytes = strToBytes(packed.substr(34 + i * 6 + 4, 3))
      return {
        ip: strToBytes(packed.substr(34 + i * 6, 4)).join('.'),
        port: (portBytes[0] << 8) + portBytes[1],
      }
    })

  const sdpParts = [
    'v=0',
    'o=- 5498186869896684180 2 IN IP4 127.0.0.1',
    's=-',
    't=0 0',
    'a=msid-semantic: WMS',
    'm=application 9 DTLS/SCTP 5000',
    'c=IN IP4 0.0.0.0',
    'a=mid:data',
    'a=sctpmap:5000 webrtc-datachannel 1024',
    `a=setup:${type === 'answer' ? 'active' : 'actpass'}`,
    `a=ice-ufrag:${ufrag}`,
    `a=ice-pwd:${password}`,
    `a=fingerprint:sha-256 ${fingerprint.join(':').toUpperCase()}`,
  ]

  let priority = 1
  for (const {ip, port} of candidates) {
    sdpParts.push(`a=candidate:${[
      0, // foundation
      1, // component id
      'udp', // transport
      priority++,
      ip,
      port,
      'typ', 'host', // should be okay
    ].join(' ')}`)
  }
  
  return ({ //new RTCSessionDescription({
    type,
    sdp: sdpParts.join('\r\n') + '\r\n'
  })
}
