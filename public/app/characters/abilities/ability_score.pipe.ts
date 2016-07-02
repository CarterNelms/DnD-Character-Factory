import { Pipe, PipeTransform } from '@angular/core';

import { AbilitiesService } from './abilities.service';

/*
 * Display the value as a valid ability score
 * Takes a value to display when there is no score (score = 0) - defaults to expty string
 *
 * Usage:
 *   value | ability_score:empty
 * Examples:
 *   {{ 15 | ability_score}}
 *   formats to: 15
 *   {{ 0 | ability_score:'?'}}
 *   formats to: 2 (display ? as value for empty)
 *   {{ 30 | ability_score}}
 *   formats to: 18
 *   {{ 10.8 | ability_score}}
 *   formats to: 10
*/
@Pipe({
  name: 'ability_score',
  providers: [AbilitiesService]
})
export class AbilityScorePipe implements PipeTransform {
  constructor(private service: AbilitiesService) { }

  transform(val: number, empty: string = ''): number {
    if (val == null) {
      return empty;
    }

    let min = this.service.min_score - 1,
    max = this.service.max_score;

    val = _.clamp(Math.floor(val), min, max);

    if (val === min) {
      return empty;
    }

    return val;
  }
}