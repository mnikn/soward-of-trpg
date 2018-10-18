import { Injectable } from '@angular/core';
import { HpSettingsType, Role } from '../models/role';
import { ProfessionInfo } from '../models/profession';

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
          return result + (Math.ceil(Math.random() * this.professionInfo.getProfession(profession.id).hpDiceType) +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.FULL:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getProfession(profession.id).hpDiceType +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.HALF:
        return role.professions.reduce((result, profession) => {
          return result + (this.professionInfo.getProfession(profession.id).hpDiceType / 2 +
            role.getCon().getModifier()) *
            profession.level;
        }, 0);
      case HpSettingsType.CUSTOM:
        return role.customMaxHp;
    }
  }
}
