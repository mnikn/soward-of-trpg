import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { Observable } from 'rxjs';
import { AppContext } from '../../../base/constants/app-context';
import { Role } from '../models/role';
import { RoleBuilder } from '../factory/role-builder';
import * as _ from 'lodash';
import { AbilityInfo } from '../models/ability';
import { Skill } from '../models/skill';
import { Profession } from '../models/profession';

@Injectable({
  providedIn: 'root'
})
export class RoleFileService {
  constructor(private baseFileService: FileService, private abilityInfo: AbilityInfo) {
  }

  public writeRoleFile(role: Role[]): Observable<boolean> {
    let toWriteData = JSON.stringify(role);
    return this.baseFileService.writeFile(AppContext.DND3R_ROLE_PATH, toWriteData);
  }

  public deleteRoleFile(): Observable<boolean> {
    return this.baseFileService.deleteFile(AppContext.DND3R_ROLE_PATH);
  }

  public readRoleFile(): Observable<Role[]> {
    let self = this;
    return new Observable((observer) => {
      return self.baseFileService.readFile(AppContext.DND3R_ROLE_PATH)
        .subscribe((data: any) => {
          let roleDataList = JSON.parse(data);
          let roles = _.map(roleDataList, (roleData: any) => {
            let builder = new RoleBuilder();
            return builder
              .setId(roleData.id)
              .setAbilities(this.abilityInfo.createAbilities(roleData.abilities))
              .setHp(roleData.hpSettingsType, roleData.maxHp)
              .setBasicsInfo(roleData.name, roleData.age, roleData.description)
              .setProfessions(roleData.professions.map(professionData => new Profession(professionData.id, professionData.level)))
              .setRace(roleData.race)
              .setAlignment(roleData.alignment)
              .setBelief(roleData.belief)
              .setLanguages(roleData.languages)
              .setSex(roleData.sex)
              .setSkills(roleData.skills.map(e => new Skill(e.id, e.professionsAssignedPoint)))
              .setWeapons(roleData.weapons)
              .setArmors(roleData.armors)
              .setGoods(roleData.goods)
              .build();
          });
          observer.next(roles);
          observer.complete();
        });
    });
  }
}
