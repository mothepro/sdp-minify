# SDP Minify

> Removes all the fluff from a simple SDP to make it easily transmitted over IRC or SMS

## How To Use

Host can create an offer.

```typescript
import {pack} from 'sdp-minify'

const pc = new RTCPeerConnection
// Setup ...
const offer = await pc.createOffer()
pc.setLocalDescription(offer)
const length70ish = pack(offer) // send this over IRC, discord, SMS w/e
```

Then the client an accept it and send an answer.

```typescript
import {pack, unpack} from 'sdp-minify'

const pc = new RTCPeerConnection
// Setup ...
const obj = unpack(length70ish) // the received string
pc.setRemoteDescription(new RTCSessionDescription(obj))
const answer = await pc.createAnswer()
pc.setLocalDescription(answer)
const length70ish = pack(answer) // send this over IRC, discord, SMS w/e
```

## Install

`yarn add sdp-minify` or `npm i sdp-minify`
