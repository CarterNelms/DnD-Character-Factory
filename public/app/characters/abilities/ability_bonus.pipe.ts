import { Pipe, PipeTransform } from '@angular/core';

/*
 * Display the value as a valid ability bonus
 * Takes a value to display when there is no score (score = 0) - defaults to expty string
 *
 * Usage:
 *   value | ability_bonus:empty
 * Examples:
 *   {{ 2 | ability_bonus}}
 *   formats to: +2
 *   {{ 0 | ability_bonus:'?'}}
 *   formats to: ?
 *   {{ 0 | ability_bonus}}
 *   formats to: 
 *   {{ -2 | ability_bonus}}
 *   formats to: -2
*/
@Pipe({
  name: 'ability_bonus'
})
export class AbilityBonusPipe implements PipeTransform {
  constructor() { }

  transform(val: number, empty: string = ''): number {
    if (val == null || val === 0) {
      return empty;
    }

    let sign = val > 0 ? '+' : '-';

    val = Math.abs(val);

    return `${sign}${val}`;
  }
}