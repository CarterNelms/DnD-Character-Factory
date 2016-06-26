import { Component }                    from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';

import { CharacterService }             from './characters.service';
 
@Component({
    // templateUrl: '/partials/index',
    templateUrl: '/partials/characters/create.jade',
    directives: [ROUTER_DIRECTIVES],
    providers: [CharacterService]
})

export class CharacterCreateComponent {
  public abilityRollMethods = [];
  public abilityRollMethod = {};

  constructor(private service: CharacterService) { }

  ngOnInit() {
    // $('select').select2({
    //   minimumResultsForSearch: -1
    // });

    $('input').iCheck({
      checkboxClass: 'icheckbox_minimal-orange',
      radioClass: 'iradio_minimal-orange',
      increaseArea: '20%' // optional
    });

    $('#abilities-table').DataTable( {
      "responsive": true,
      "bLengthChange": false,
      "bSort": false,
      "processing": false,
      "serverSide": false,
      "dom": '<"clear">rt',
    } );

    this.service.getAbilitiesInfo(abilitiesInfo => {
      abilitiesInfo.abilityRollMethods.forEach(method => {
        this.abilityRollMethods[method._id] = method;
      });

      // let $abilityRollMethod = $("#ability-score-method");

      // $abilityRollMethod.on('change', () => {
      //   let val = $abilityRollMethod.select2('val'),
      //   rulesNA = true,
      //   method = this.abilityRollMethods[val];

      //   if (!method) {
      //     return;
      //   }

      //   let assignment = method.assignment,
      //   $assignment = $('#ability-assignment');
      //   if (assignment) {
      //     $assignment.hide();
      //   } else {
      //     $assignment.show();
      //     rulesNA = false;
      //   }

      //   $('.ability-score-method-name').text(method.name);
      //   $('.ability-score-method-description').text(method.description);
      //   $('#roll-abilities-btn').prop('disabled', !method.isRollable);
      //   $('#rules-na')[rulesNA ? 'show' : 'hide']();

      // }).trigger('change');
    });
  }

  setAbilityRollMethod (_id) {
    console.log(_id);
    // this.abilityRollMethod = this.abilityRollMethods[_id];
  }
}
