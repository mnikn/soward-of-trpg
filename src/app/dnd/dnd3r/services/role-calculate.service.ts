import { Injectable } from '@angular/core';
import { HpSettingsType, Role } from '../models/role';
import { Profession, ProfessionInfo } from '../models/profession';
import { Skill } from '../models/skill';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleCalculateService {

  constructor(private professionInfo: ProfessionInfo) {
  }

  public calculateMaxHp(role: Role) {
    switch (role.hpSettingsType) {
      case HpSettingsType.RADNOM:
        return role.professions.reduce((result, profession) => {
          return result + (Math.ceil(Math.random() * this.professionInfo.getProfessionInfo(profession.id).hpDiceType) +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.FULL:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getProfessionInfo(profession.id).hpDiceType +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.HALF:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getProfessionInfo(profession.id).hpDiceType / 2 +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.CUSTOM:
        return role.customMaxHp;
    }
  }

  public calculateProfessionTotalSkillPoint(profession: Profession, modifier: number) {
    return _.range(0, profession.level + 1).reduce((result, level) => {
      let professionInfo = this.professionInfo.getProfessionInfo(profession.id);
      let incrementSkillPoint = (professionInfo.skillPointIncrement + modifier);
      if (level === 1 && profession.isMainProfession) {
        return result + incrementSkillPoint * 4;
      } else {
        return result + incrementSkillPoint;
      }
    });
  }

  public calculateProfessionRemainSkillPoint(profession: Profession, modifier: number, skills: Skill[]) {
    let totalSkillPoints = this.calculateProfessionTotalSkillPoint(profession, modifier);
    let assignedPoints = _.sumBy(_.map(skills, 'professionsAssignedPoint'), profession.id);
    return totalSkillPoints - assignedPoints;
  }
}
