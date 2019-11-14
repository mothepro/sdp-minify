import 'should'
import pack from '../src/utf16/pack'
import unpack from '../src/utf16/unpack'
import realOffer from './realOffer.json'
import utf16Offer from './utf16Offer.json'

const packedOffer = 'oƶźðÎď×ŔğŰƖÊƉĿƐáƳŖÔũōãÔüćƛÅÕĄƂĶćŪ1ØÅŌŔƦƼuIEO,/wflRKbnu+vxwmL7kd6N/g14'

it('should pack a real offer to UTF-16', () => {
  pack(realOffer as Required<RTCSessionDescriptionInit>).should.eql(packedOffer)
})

it('should unpack a real offer from UTF-16', () => {
  unpack(packedOffer).should.eql(utf16Offer)
})

// TODO add test cases for failures & answers
