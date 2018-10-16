import { Role } from '../models/role';
import { Profession } from '../models/profession';
import * as _ from 'lodash';

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

  public setBasicsInfo(name: string, age: number, description?: string): RoleBuilder {
    this._role.name = name;
    this._role.age = age;
    this._role.description = description;
    return this;
  }

  public setProfessions(professions: Profession[]): RoleBuilder {
    this._role.professions = _.map(professions, (data) => new Profession(data.id, data.level));
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

  public setShape(shape: string): RoleBuilder {
    this._role.shape = shape;
    return this;
  }

  public build(): Role {
    return _.cloneDeep(this._role);
  }
}
