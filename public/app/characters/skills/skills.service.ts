import { Http } from "@angular/http";
import { Service } from '../../base/service';

export class SkillsService extends Service {
  private proficiencies;
  private skills;

  constructor (private http: Http) {
    this.proficiencies = {
      allowed: {
        all: this.getBlankProficiencies(),
        background: this.getBlankProficiencies(),
        race: this.getBlankProficiencies(),
        class: this.getBlankProficiencies(),
        subrace: this.getBlankProficiencies()
      },
      is_proficient: {}
    };
    this.skills = {};
    super(this.http);
  }

  private getBlankProficiencies () {
    return {
      any: 0,
      fixed: [],
      list: {
        skill_ids: [],
        count: 0
      }
    };
  }

  getSkills (fn) {
    if (!_.isEmpty(this.skills)) {
      fn(this.skills);
      return;
    }

    super.http_get('/characters/skills/get', result => {
      this.skills = this.arrayToObjectByObjectID(result.skills);

      let is_proficient = {};
      _.each(this.skills, (skill, skill_id) => {
        is_proficient[skill._id] = false;
      });

      this.proficiencies.is_proficient = is_proficient;
      fn(this.skills);
    });
  }

  private determineAllAllowedProficiencies () {
    if (!this.proficiencies.allowed) {
      return;
    }

    let all_proficiencies = this.getBlankProficiencies();

    _.each(this.proficiencies.allowed, (proficiencies, type) => {
      if (type === 'all') {
        return;
      }

      all_proficiencies.any += proficiencies.any;
      all_proficiencies.fixed = all_proficiencies.fixed.concat(proficiencies.fixed);
      all_proficiencies.list.skill_ids = all_proficiencies.list.skill_ids.concat(proficiencies.list.skill_ids);
      all_proficiencies.list.count += proficiencies.list.count;
    });
    all_proficiencies.list.skill_ids = _.uniq(all_proficiencies.list.skill_ids);

    let both_fixed_and_list = _.intersection(all_proficiencies.fixed, all_proficiencies.list.skill_ids);

    _.pullAll(all_proficiencies.list.skill_ids, both_fixed_and_list);

    let list_count = all_proficiencies.list.skill_ids.length;

    if (all_proficiencies.list.count >= list_count) {
      all_proficiencies.fixed = all_proficiencies.fixed.concat(all_proficiencies.list.skill_ids);
      all_proficiencies.list.skill_ids = [];
      all_proficiencies.any += all_proficiencies.list.count - list_count;
      all_proficiencies.list.count = 0;
    }

    let fixed_count = all_proficiencies.fixed.length;

    all_proficiencies.fixed = _.uniq(all_proficiencies.fixed);
    all_proficiencies.any += fixed_count - all_proficiencies.fixed.length;

    this.proficiencies.allowed.all = all_proficiencies;

    _.each(this.proficiencies.is_proficient, (is_p, s_id) => {
      this.proficiencies.is_proficient[s_id] = false;
      this.setProficiency(s_id, is_p);
    });
  }

  setAllowedProficienciesFromTraits (proficiency_type, traits, do_recalculate=true) {
    if (!this.proficiencies.allowed[proficiency_type]) {
      return;
    }

    let proficiencies = this.getProficienciesFromTraits(traits);

    this.proficiencies.allowed[proficiency_type] = this.getBlankProficiencies();

    proficiencies.forEach(p => {
      if (p.proficiency_ids.length === 0) {
        this.proficiencies.allowed[proficiency_type].any = p.count;
        return;
      }

      if (p.count == 0 || p.count >= p.proficiency_ids.length) {
        this.proficiencies.allowed[proficiency_type].fixed = p.proficiency_ids;
        return;
      }

      this.proficiencies.allowed[proficiency_type].list.skill_ids = p.proficiency_ids;
      this.proficiencies.allowed[proficiency_type].list.count = p.count == 0 ? p.proficiency_ids.length : p.count;
    });

    if (do_recalculate) {
      this.determineAllAllowedProficiencies();
    }
  }

  private getProficienciesFromTraits (traits) {
    let proficiencies = [];

    if (!Array.isArray(traits)) {
      return proficiencies;
    }

    traits.forEach(trait => {
      if (!trait.proficiencies) {
        return;
      }

      if (!trait.proficiencies.skills) {
        return;
      }

      proficiencies = proficiencies.concat(trait.proficiencies.skills);
    });

    return proficiencies;
  }

  private isFixed (skill_id) {
    return this.proficiencies.allowed.all.fixed.indexOf(skill_id) !== -1;
  }

  private isInList (skill_id) {
    return this.proficiencies.allowed.all.list.skill_ids.indexOf(skill_id) !== -1;
  }

  private isListFull () {
    let proficiencies_from_list_count = 0;

    this.proficiencies.allowed.all.list.skill_ids.forEach(s_id => {
      proficiencies_from_list_count += this.proficiencies.is_proficient[s_id] ? 1 : 0;
    });

    return proficiencies_from_list_count >= this.proficiencies.allowed.all.list.count;
  }

  private areAnyAvailable () {
    let any_allowed = this.proficiencies.allowed.all.any;

    if (any_allowed === 0) {
      return false;
    }

    let any_count = 0,
    in_list_count = 0;

    _.each(this.proficiencies.is_proficient, (is_p, s_id) => {
      if (!is_p) {
        return;
      }

      if (this.isFixed(s_id)) {
        return;
      }

      if (this.isInList(s_id)) {
        if (in_list_count !== this.proficiencies.allowed.all.list.count) {
          in_list_count++;
          return;
        }
      }

      any_count++;
    });

    return any_allowed > any_count;
  }

  setProficiency (skill_id, is_proficient = false) {
    if (this.isFixed(skill_id)) {
      is_proficient = true;
    } else if (is_proficient) {
      if (!this.areAnyAvailable()) {
        if (this.isInList(skill_id)) {
          if (this.isListFull()) {
            is_proficient = false;
          }
        } else {
          is_proficient = false;
        }
      }
    }

    this.proficiencies.is_proficient[skill_id] = is_proficient;
  }

  isProficiencyOptional (skill_id) {
    if (this.isFixed(skill_id)) {
      return false;
    }

    if (this.proficiencies.is_proficient[skill_id]) {
      return true;
    }

    if (this.areAnyAvailable()) {
      return true;
    }

    if (this.isInList(skill_id)) {
      return !this.isListFull();
    }

    return false;
  }
}
