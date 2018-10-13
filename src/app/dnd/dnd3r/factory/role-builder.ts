import { Role } from '../models/role';
import { Profession } from '../models/profession';
import * as _ from 'lodash';

export class RoleBuilder {

  private _role: Role;

  constructor() {
    this._role = new Role();
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
    this._role.professions = professions;
    return this;
  }

  public build(): Role {
    return _.cloneDeep(this._role);
  }
}
