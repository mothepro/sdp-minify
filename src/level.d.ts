export default Level

declare const enum Level {
  /** Loosest packing, just makes raw SDP. */
  RAW,

  /** Just stringifys the SDP's as JSON. */
  JSON = RAW,

  /** Gets the important values from the SDP and packes it into a string to be C&P. */
  UTF16,

  /** A BASE64 encoding of the entire SDP */
  BASE64,
}
