import 'should'
import pack from '../src/pack'
import unpack from '../src/unpack'
import realOffer from './realOffer.json'
import unpackedOffer from './unpackedOffer.json'

const expectedPackedOffer = 'oƶźðÎď×ŔğŰƖÊƉĿƐáƳŖÔũōãÔüćƛÅÕĄƂĶćŪ1ØÅŌŔƦƼuIEO,/wflRKbnu+vxwmL7kd6N/g14'

it('should pack a real offer', () => {
  pack(realOffer as RTCSessionDescription).should.eql(expectedPackedOffer)
})

it('should unpack a real offer', () => {
  unpack(expectedPackedOffer).should.eql(unpackedOffer)
})

// TODO add test cases for failures
