import { Pipe, PipeTransform } from '@angular/core';
/*
 * Display the value as a valid ability score
 * Takes a value to display when there is no score (score = 0) - defaults to expty string
 *
 * Usage:
 *   value | ability_score
 * Examples:
 *   {{ 15 |  ability_score}}
 *   formats to: 15
 *   {{ 0 |  ability_score}}
 *   formats to: 2 (display as value for empty)
 *   {{ 30 |  ability_score}}
 *   formats to: 18
 *   {{ 10.8 |  ability_score}}
 *   formats to: 10
*/
@Pipe({name: 'ability_score'})
export class AbilityScorePipe implements PipeTransform {
  transform(val: number, empty: string = ''): number {
    val = _.clamp(Math.floor(val), 2, 18);

    if (val === 2) {
      return empty;
    }

    return val;
  }
}