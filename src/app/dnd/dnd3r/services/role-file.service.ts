import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { Observable } from 'rxjs';
import { AppContext } from '../../../base/constants/app-context';
import { Role } from '../models/role';
import { RoleBuilder } from '../factory/role-builder';
import * as _ from 'lodash';
import { Skill } from '../models/skill';
import { ProfessionInfo } from '../models/profession';
import { SexInfo } from '../models/sex';
import { RaceInfo } from '../models/race';
import { AlignmentInfo } from '../models/alignment';
import { LanguageInfo } from '../models/language';
import { BeliefInfo } from '../models/belief';
import { WeaponInfo } from '../models/weapon';
import { MagicInfo } from '../models/magic';

declare const electron: any;
const fs = electron.remote.require('fs');

@Injectable({
  providedIn: 'root'
})
export class RoleFileService {
  constructor(private baseFileService: FileService,
              private raceInfo: RaceInfo,
              private professionInfo: ProfessionInfo,
              private alignmentInfo: AlignmentInfo,
              private beliefInfo: BeliefInfo,
              private languageInfo: LanguageInfo,
              private weaponInfo: WeaponInfo,
              private magicInfo: MagicInfo,
              private sexInfo: SexInfo) {
  }

  public writeRoleFile(role: Role[]): Observable<boolean> {
    let toWriteData = JSON.stringify(role.map(e => e.toJsonData()));
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
              .setAbilities(roleData.abilities)
              .setHp(roleData.hpSettingsType, roleData.maxHp)
              .setBasicsInfo(roleData.name, roleData.age, roleData.description)
              .setProfessions(roleData.professions)
              .setRace(roleData.race)
              .setAlignment(roleData.alignment)
              .setBelief(roleData.belief)
              .setLanguages(roleData.languages)
              .setSex(roleData.sex)
              .setSkills(roleData.skills.map(e => new Skill(e.id, e.professionsAssignedPoint)))
              .setWeapons(roleData.weapons)
              .setArmors(roleData.armors)
              .setGoods(roleData.goods)
              .setMagics(roleData.magics)
              .build();
          });
          observer.next(roles);
          observer.complete();
        });
    });
  }

  public toTxtFile(path: string, role: Role): Observable<string> {
    let weapons = role.weapons.map(e => this.weaponInfo.getWeaponInfo(e));
    return new Observable<string>((observer) => {
      let data = `
      -------------基本信息-------------\n
      姓名：${role.name}\n
      年龄：${role.age}\t体型：中型\n
      性别：${_.get(this.sexInfo.getSex(role.sex), 'label')}\n
      种族：${_.get(this.raceInfo.getInfo(role.race), 'label')}\n
      职业：${role.professions.map(e => this.professionInfo.getInfo(e.id).label).join(',')}\n
      阵营：${_.get(this.alignmentInfo.getAlignment(role.alignment), 'label')}\n
      信仰：${_.get(this.beliefInfo.getInfo(role.belief), 'label')}\n
      语言：${role.languages.map(e => _.get(this.languageInfo.getLanguage(e), 'label')).join(',')}\n
      \n\n
      -------------属性-------------\n
      力量：${role.str.value}\n
      敏捷：${role.dex.value}\n
      体质：${role.con.value}\n
      智力：${role.wis.value}\n
      感知：${role.int.value}\n
      魅力：${role.cha.value}\n
      总等级：${role.professions.reduce((result, curr) => result + curr.level, 0)}级\n
      ${role.professions.map(e => _.get(this.professionInfo.getInfo(e.id), 'label') + '：' + e.level + '级').join('\t')}\n
      最大生命值：${role.maxHp}\t当前生命值：${role.maxHp}\n
      -------------武器-------------\n
      装备武器\t\t\t握持手\t\t\t攻击次数\t\t\t基本伤害\t\t\t重击骰\t\t\t重击威力\t\t\t射程距离\t\t\t伤害类型\n
      ${weapons.map(e =>
        e.label + '\t\t\t' +
        e.holdWeaponType + '\t\t\t' +
        e.damageDiceNumber + '\t\t\t' +
        e.damageDiceType + '\t\t\t' +
        e.critDamage + '\t\t\t' +
        (e.range ? e.range : 'N/A') + '\t\t\t' +
        e.damageType + '\t\t\t' +
        '\n'
      )}
      -------------防具-------------\n
      -------------物品-------------\n
      `;
      if (!!role.professions.find(e => !!this.professionInfo.getInfo(e.id).magicType)) {
        data += `
      -------------法术-------------\n
        `;
      }
      data += `
      -------------简介-------------\n
      ${role.description}
      `;
      fs.writeFile(path, data, 'utf8', () => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
