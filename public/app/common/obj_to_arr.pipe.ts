import { Pipe, PipeTransform } from '@angular/core';

/*
 * Return an object as an array than can be iterated over by Angular 2
 *
 * Usage:
 *   value | ability_bonus:empty
 * Examples:
 *   {{ {foo: 2, bar: 'nine' } | ability_bonus}}
 *   formats to: [2, 'nine']
*/
@Pipe({
  name: 'obj_to_arr'
})
export class ObjToArrPipe implements PipeTransform {
  constructor() { }

  transform(val) {
    return _.values(val);
  }
}