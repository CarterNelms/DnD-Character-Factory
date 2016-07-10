import { Pipe, PipeTransform } from '@angular/core';

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
  name: 'ability_modifier'
})
export class AbilityModifierPipe implements PipeTransform {
  transform(val: number, use_parentheses: boolean = false, empty: string = ''): string {
    if (val === null || val === '' || val === undefined) {
      return empty;
    } else if (!val) {
      val = 0;
    } else if (val > 0) {
      val = `+${val}`;
    }

    if (use_parentheses) {
      val = `(${val})`;
    }

    return val;
  }
}