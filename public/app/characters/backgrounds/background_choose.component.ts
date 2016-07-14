import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { DropdownComponent } from '../../common/dropdown.component';
import { TextDropdownComponent } from '../../common/text-dropdown.component';

import { BackgroundsService } from './backgrounds.service';
import { SkillsService } from '../skills/skills.service';
 
import { ObjToArrPipe } from '../../common/obj_to_arr.pipe';

@Component({
  selector: 'background-choose',
  templateUrl: '/partials/characters/backgrounds/choose',
  directives: [ROUTER_DIRECTIVES, DropdownComponent, TextDropdownComponent],
  providers: [BackgroundsService],
  pipes: [ObjToArrPipe]
})

export class BackgroundChooseComponent {
  public background_id;
  public bond: string;
  public flaw: string;
  public ideal;
  public personality_traits: string[];
  public tie: string;

  constructor(private service: BackgroundsService, private skills_service: SkillsService) { }

  ngOnInit() {
    this.background_id = null;
    this.bond = '';
    this.flaw = '';
    this.ideal = {};
    this.personality_traits = ['',''];
    this.tie = '';

    this.service.getBackgrounds(backgrounds => {
      _.each(this.backgrounds, (b, b_id) => {
        let ideals = this.backgrounds[b_id].info.ideals;
        _.each(ideals, ideal => {
          let bs_type = this.getBsTypeByIdealAlignment(ideal.alignment);

          ideal.display = `<label class='label label-${bs_type}'>${ideal.name}</label> ${ideal.description} ( <b>${ideal.alignment}</b> )`;
        });
      });
      this.setRandomBackground();
    });
  }

  set background (clss) {
    this.background_id = _.isEmpty(clss) ? null : clss._id;
    clss = this.background;
    let traits = clss.traits ? clss.traits : [];
    this.skills_service.setAllowedProficienciesFromTraits('background', traits);

    this.setRandomBackgroundInfo();
  }

  get background () {
    if (!this.background_id) {
      return {};
    }

    return this.backgrounds[this.background_id];
  }

  get backgrounds () {
    return this.service.backgrounds;
  }

  get ideal_alignments () {
    return 'Good Evil Lawful Chaotic Neutral Any'.split(' ');
  }

  getBsTypeByIdealAlignment (alignment) {
    let bs_type;

    switch (alignment) {
      case "Good":
        bs_type = "success";
        break;
      case "Evil":
        bs_type = "danger";
        break;
      case "Lawful":
        bs_type = "primary";
        break;
      case "Chaotic":
        bs_type = "warning";
        break;
      case "Any":
      case "":
        bs_type = "info";
        break;
      case "Neutral":
      default:
        bs_type = "default";
        break;
    }

    return bs_type;
  }

  setRandomBackground () {
    this.background = _.sample(this.backgrounds);
  }

  setRandomBackgroundInfo () {
    let info = this.background.info;

    this.bond = _.sample(info.bonds);
    this.flaw = _.sample(info.flaws);
    this.ideal = _.sample(info.ideals);
    this.tie = _.sample(info.ties.list);

    this.personality_traits[0] = _.sample(info.personality_traits);
    do {
      this.personality_traits[1] = _.sample(info.personality_traits);
    } while (this.personality_traits[0] === this.personality_traits[1]);
  }
}
