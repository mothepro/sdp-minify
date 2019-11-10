/** Char used to separate non-fixed width parts. */
export const delimiter = ','

/**
 * Moves the range of 0x00 to 0xFF to the following chars:
 * ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒ
 * ēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤť
 * ŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿ
 */
const charOffset = 192

/** Converts an array of bytes to a 'human friendly' string. */
export const bytesToStr = (bytes: number | number[]): string =>
  typeof bytes == 'number'
    ? bytesToStr([bytes])
    : String.fromCharCode(...bytes.map(byte => byte + charOffset))

/** Convert a 'human friendly' string to an array of bytes. */
export const strToBytes = (str: string): number[] =>
    str.split('').map(char => char.charCodeAt(0) - charOffset)

export const strToByte = (char: string): number =>
      strToBytes(char.substr(0, 1))[0]
