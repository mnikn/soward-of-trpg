import { HpSettingsType, Role } from '../models/role';
import { Profession } from '../models/profession';
import * as _ from 'lodash';
import { Ability } from '../models/ability';
import { Skill } from '../models/skill';
import { Weapon } from '../models/weapon';

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

  public setAbilities(abilities: Ability[]) {
    this._role.abilities = abilities;
    return this;
  }

  public setBasicsInfo(name: string, age: number, description?: string): RoleBuilder {
    this._role.name = name;
    this._role.age = age;
    this._role.description = description;
    return this;
  }

  public setProfessions(professions: Profession[]): RoleBuilder {
    this._role.professions = professions;
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

  public build(): Role {
    return _.cloneDeep(this._role);
  }
}
