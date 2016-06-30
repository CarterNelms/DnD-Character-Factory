import { Pipe, PipeTransform } from '@angular/core';
/*
 * Display the modifier of an ability score
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
@Pipe({name: 'ability_modifier'})
export class AbilityModifierPipe implements PipeTransform {
  transform(val: number, use_parentheses: boolean = true, empty: string = ''): string {
    val = _.clamp(Math.floor(val), 2, 18);

    if (val === 2) {
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