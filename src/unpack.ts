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
  let priority = 1
  const type = sdpType(packed[0]),
    fingerprint = strToBytes(packed.slice(1, 33)).map(byte => ('0' + byte.toString(16)).slice(-2)),
    candidateCount = parseInt(packed[34], 36),
    [ufrag, password] = packed.substr(35 + candidateCount * 7).split(delimiter),
    candidates: {ip: string, port: number}[] = []
  
  for (let i = 0; i < candidateCount; i++) {
    const ipBytes = strToBytes(packed.substr(35 + i * 7, 4)),
      portBytes = strToBytes(packed.substr(35 + i * 7 + 4, 3))
    candidates.push({
      ip: ipBytes.join('.'),
      port: portBytes[0] << 16
        + portBytes[1] << 8
        + portBytes[2],
    })
  }

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
