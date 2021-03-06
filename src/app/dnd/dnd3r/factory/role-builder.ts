import { HpSettingsType, Role } from '../models/role';
import { Profession } from '../models/profession';
import * as _ from 'lodash';
import { Ability } from '../models/ability';
import { Skill } from '../models/skill';
import { Goods } from '../models/goods';
import { Magic } from '../models/magic';

export class RoleBuilder {

  private _role: Role;

  constructor() {
    this._role = new Role();
    this._role.professions = [];
  }

  public setId(id: number): RoleBuilder {
    this._role.id = id;
    return this;
  }

  public setAbilities(abilities: any) {
    this._role.str.value = abilities.str;
    this._role.dex.value = abilities.dex;
    this._role.con.value = abilities.con;
    this._role.int.value = abilities.int;
    this._role.cha.value = abilities.cha;
    this._role.wis.value = abilities.wis;
    return this;
  }

  public setBasicsInfo(name: string, age: number, description?: string): RoleBuilder {
    this._role.name = name;
    this._role.age = age;
    this._role.description = description;
    return this;
  }

  public setProfessions(professions: any[]): RoleBuilder {
    this._role.professions = professions.map(professionData =>
      new Profession(professionData.id, professionData.level, professionData.isMainProfession));
    return this;
  }

  public setRace(race: string): RoleBuilder {
    this._role.race = race;
    return this;
  }

  public setSex(sex: string): RoleBuilder {
    this._role.sex = sex;
    return this;
  }

  public setLanguages(languages: string[]): RoleBuilder {
    this._role.languages = languages;
    return this;
  }

  public setAlignment(alignment: string): RoleBuilder {
    this._role.alignment = alignment;
    return this;
  }

  public setBelief(belief: string): RoleBuilder {
    this._role.belief = belief;
    return this;
  }

  public setHp(hpSettingsType: HpSettingsType, maxHp?: number): RoleBuilder {
    this._role.hpSettingsType = hpSettingsType;
    this._role.maxHp = maxHp;
    return this;
  }

  public setSkills(skills: Skill[]): RoleBuilder {
    this._role.skills = skills;
    return this;
  }

  public setWeapons(weapons: string[]): RoleBuilder {
    this._role.weapons = weapons;
    return this;
  }

  public setArmors(armors: string[]): RoleBuilder {
    this._role.armors = armors;
    return this;
  }

  public setGoods(goods: any[]): RoleBuilder {
    this._role.goods = goods.map(item => new Goods(item.id, item.number));
    return this;
  }

  public setMagics(magics: any[]): RoleBuilder {
    this._role.magics = _.map(magics, data => {
      let magic = new Magic();
      magic.id = data.id;
      magic.profession = data.profession;
      return magic;
    });
    return this;
  }

  public build(): Role {
    return _.cloneDeep(this._role);
  }
}
