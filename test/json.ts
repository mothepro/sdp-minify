import 'should'
import pack from '../src/json/pack'
import unpack from '../src/json/unpack'
import realOffer from './realOffer.json'

// Replace literal newlines with '\r\n'
const packedOffer = `{"type":"offer","sdp":"v=0
o=- 6136167713777872556 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=msid-semantic: WMS
m=application 59132 UDP/DTLS/SCTP webrtc-datachannel
c=IN IP4 24.5.140.148
a=candidate:2138393493 1 udp 2113937151 4c835a32-e955-4b92-9690-2c52068d3b96.local 59132 typ host generation 0 network-cost 999
a=candidate:2496871252 1 udp 2113939711 e14deb53-2dc1-48b7-8443-51ce2d947d30.local 59133 typ host generation 0 network-cost 999
a=candidate:842163049 1 udp 1677729535 24.5.140.148 59132 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999
a=ice-ufrag:uIEO
a=ice-pwd:/wflRKbnu+vxwmL7kd6N/g14
a=ice-options:trickle
a=fingerprint:sha-256 F6:BA:30:0E:4F:17:94:5F:B0:D6:0A:C9:7F:D0:21:F3:96:14:A9:8D:23:14:3C:47:DB:05:15:44:C2:76:47:AA
a=setup:actpass
a=mid:0
a=sctp-port:5000
a=max-message-size:262144
"}`.replace(/\n/g, '\\r\\n')

describe('JSON encoding', () => {
  it('should pack a real offer', () => {
    pack(realOffer as Required<RTCSessionDescriptionInit>).should.eql(packedOffer)
  })

  it('should unpack a real offer', () => {
    unpack(packedOffer).should.eql(realOffer)
  })
})

// TODO add test cases for failures & answers
