export const enum SDPType {
  OFFER,
  ANSWER,
  PRANSWER,
  ROLLBACK,
}

export function toEnum(type: RTCSdpType) {
  switch (type) {
    case 'offer':
      return SDPType.OFFER
    case 'answer':
      return SDPType.ANSWER
    case 'pranswer':
      return SDPType.PRANSWER
    case 'rollback':
      return SDPType.ROLLBACK
  }
}

export function toType(type: SDPType): RTCSdpType {
  switch (type) {
    case SDPType.OFFER:
      return 'offer'
    case SDPType.ANSWER:
      return 'answer'
    case SDPType.ROLLBACK:
      return 'rollback'
    case SDPType.PRANSWER:
      return 'pranswer'
  }
}
