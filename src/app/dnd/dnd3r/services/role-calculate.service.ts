import { Injectable } from '@angular/core';
import { HpSettingsType, Role } from '../models/role';
import { Profession, ProfessionInfo } from '../models/profession';
import { Skill, SkillInfo } from '../models/skill';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleCalculateService {

  constructor(private professionInfo: ProfessionInfo, private skillInfo: SkillInfo) {
  }

  public calculateMaxHp(role: Role) {
    switch (role.hpSettingsType) {
      case HpSettingsType.RADNOM:
        return role.professions.reduce((result, profession) => {
          return result + (Math.ceil(Math.random() * this.professionInfo.getInfo(profession.id).hpDiceType) +
            role.con.getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.FULL:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getInfo(profession.id).hpDiceType +
            role.con.getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.HALF:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getInfo(profession.id).hpDiceType / 2 +
            role.con.getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.CUSTOM:
        return role.maxHp;
    }
  }

  public calculateProfessionTotalSkillPoint(profession: Profession, modifier: number) {
    return _.range(0, profession.level + 1).reduce((result, level) => {
      let professionInfo = this.professionInfo.getInfo(profession.id);
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
    let assignedPoints = 0;
    for (let skill of skills) {
      let assignedPoint = skill.professionsAssignedPoint[profession.id];
      if (!this.skillInfo.getSkill(skill.id).keyProfessions.includes(profession.id)) {
        assignedPoint *= 2;
      }
      assignedPoints += assignedPoint;
    }
    return totalSkillPoints - assignedPoints;
  }

  public calculateAbilityModifier(value: number): number {
    return Math.round((value - 10) / 2);
  }
}
