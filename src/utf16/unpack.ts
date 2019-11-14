import { strToBytes, delimiter, strToByte } from './util'

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
  throw Error(`'${char}' doesn't map to a RTC SDP type.`)
}

/** 
 * Unpacks a minified SDP.
 * 
 * All candidates are restored as `typ host`
 * 
 */
export default function (packed: string): RTCSessionDescriptionInit {
  const type = sdpType(packed.substr(0, 1)),
    /** Get 32 bytes for the fingerprint */
    fingerprint = strToBytes(packed.slice(1, 1 + 32)).map(byte => ('0' + byte.toString(16)).slice(-2)),
    /** 1 byte for the candidate count */
    candidateCount = parseInt(packed.substr(1 + 32, 1), 36),
    /** the candidates are 6 bytes each (4 byte IP + 2 byte port) */
    candidates = [...Array(candidateCount)].map((_, i) => ({
      ip: strToBytes(packed.substr(1 + 32 + 1 + i * 6, 4)).join('.'),
      port: (strToByte(packed.substr(1 + 32 + 1 + i * 6 + 4)) << 8) +
        strToByte(packed.substr(1 + 32 + 1 + i * 6 + 4 + 1)),
    })),
    /** ufrag and password are split with a delimiter */
    [ufrag, password] = packed.substr(1 + 32 + 1 + candidateCount * 6).split(delimiter)

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
  for (const {ip, port} of candidates)
    sdpParts.push(`a=candidate:${[
      0, // foundation
      1, // component id
      'udp', // transport
      priority++,
      ip,
      port,
      'typ', 'host', // should be okay, maybe
    ].join(' ')}`)

  return {
    type,
    sdp: sdpParts.join('\r\n') + '\r\n'
  }
}
