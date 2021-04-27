import { TimeManipulator } from '@/data/protocols'

import moment from 'moment-timezone'

export class MomentAdapter implements TimeManipulator {
  format (millis: number, format: string): string {
    return moment(millis).format(format)
  }
}
