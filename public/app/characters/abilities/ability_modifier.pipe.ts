import { Pipe, PipeTransform } from '@angular/core';

import { AbilitiesService } from './abilities.service';

/*
 * Display the modifier of an ability score
 * Takes a boolean to determine wether to include parentheses, and a value to display if there is no modifier
 *
 * Usage:
 *   value | ability_modifier:use_parentheses
 * Examples:
 *   {{ 15 | ability_modifier}}
 *   formats to: (+2)
 *   {{ 0 | ability_modifier}}
 *   formats to: 
 *   {{ 30 | ability_modifier:false}}
 *   formats to: +4
 *   {{ 0 | ability_modifier:false:'?'}}
 *   formats to: ?
*/
@Pipe({
  name: 'ability_modifier',
  providers: [AbilitiesService]
})
export class AbilityModifierPipe implements PipeTransform {
  constructor(private service: AbilitiesService) { }

  transform(val: number, use_parentheses: boolean = true, empty: string = ''): string {
    if (val == null) {
      return empty;
    }

    let min = this.service.min_score - 1,
    max = this.service.max_score;

    val = _.clamp(Math.floor(val), min, max);
    
    if (val === min) {
      return empty;
    }

    val = Math.floor((val - 10) / 2);

    if (val > 0) {
      val = `+${val}`;
    }

    if (use_parentheses) {
      val = `(${val})`;
    }

    return val;
  }
}