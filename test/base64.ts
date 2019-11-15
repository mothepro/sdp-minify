import 'should'
import pack from '../src/base64/pack'
import unpack from '../src/base64/unpack'
import realOffer from './realOffer.json'

declare global {
  namespace NodeJS {
    interface Global {
      btoa(s: string): string
      atob(s: string): string
    }
  }
}

const packedOffer = `MHY9MA0Kbz0tIDYxMzYxNjc3MTM3Nzc4NzI1NTYgMiBJTiBJUDQgMTI3LjAu
MC4xDQpzPS0NCnQ9MCAwDQphPWdyb3VwOkJVTkRMRSAwDQphPW1zaWQtc2VtYW50aWM6IFdNUw0KbT1hc
HBsaWNhdGlvbiA1OTEzMiBVRFAvRFRMUy9TQ1RQIHdlYnJ0Yy1kYXRhY2hhbm5lbA0KYz1JTiBJUDQgMj
QuNS4xNDAuMTQ4DQphPWNhbmRpZGF0ZToyMTM4MzkzNDkzIDEgdWRwIDIxMTM5MzcxNTEgNGM4MzVhMzI
tZTk1NS00YjkyLTk2OTAtMmM1MjA2OGQzYjk2LmxvY2FsIDU5MTMyIHR5cCBob3N0IGdlbmVyYXRpb24g
MCBuZXR3b3JrLWNvc3QgOTk5DQphPWNhbmRpZGF0ZToyNDk2ODcxMjUyIDEgdWRwIDIxMTM5Mzk3MTEgZ
TE0ZGViNTMtMmRjMS00OGI3LTg0NDMtNTFjZTJkOTQ3ZDMwLmxvY2FsIDU5MTMzIHR5cCBob3N0IGdlbm
VyYXRpb24gMCBuZXR3b3JrLWNvc3QgOTk5DQphPWNhbmRpZGF0ZTo4NDIxNjMwNDkgMSB1ZHAgMTY3Nzc
yOTUzNSAyNC41LjE0MC4xNDggNTkxMzIgdHlwIHNyZmx4IHJhZGRyIDAuMC4wLjAgcnBvcnQgMCBnZW5l
cmF0aW9uIDAgbmV0d29yay1jb3N0IDk5OQ0KYT1pY2UtdWZyYWc6dUlFTw0KYT1pY2UtcHdkOi93ZmxSS
2JudSt2eHdtTDdrZDZOL2cxNA0KYT1pY2Utb3B0aW9uczp0cmlja2xlDQphPWZpbmdlcnByaW50OnNoYS
0yNTYgRjY6QkE6MzA6MEU6NEY6MTc6OTQ6NUY6QjA6RDY6MEE6Qzk6N0Y6RDA6MjE6RjM6OTY6MTQ6QTk
6OEQ6MjM6MTQ6M0M6NDc6REI6MDU6MTU6NDQ6QzI6NzY6NDc6QUENCmE9c2V0dXA6YWN0cGFzcw0KYT1t
aWQ6MA0KYT1zY3RwLXBvcnQ6NTAwMA0KYT1tYXgtbWVzc2FnZS1zaXplOjI2MjE0NA0K`.replace(/\n/g, '')


describe('Base64 encoding', () => {

  global.btoa = (raw: string) => Buffer.from(raw).toString('base64')
  global.atob = (b64: string) => Buffer.from(b64, 'base64').toString()
  
  it('should pack a real offer', () => {
    pack(realOffer as Required<RTCSessionDescriptionInit>).should.eql(packedOffer)
  })

  it('should unpack a real offer', () => {
    unpack(packedOffer).should.eql(realOffer)
  })
})

// TODO add test cases for failures & answers
