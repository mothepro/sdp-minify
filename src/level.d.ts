declare const enum Level {
  /** Loosest packing, just makes raw SDP. */
  RAW,

  /** Just stringifys the SDP's as JSON. */
  JSON = RAW,
}


export default Level
