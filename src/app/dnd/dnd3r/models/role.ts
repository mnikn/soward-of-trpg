import { Weapon } from './weapon';
import { Alignment } from './alignment';
import { Shape } from './shape';
import { Belief } from './belief';
import { Skill } from './skill';
import { Profession } from './profession';
import { Language } from './language';
import { Race } from './race';
import { Ability } from './ability';
import * as _ from 'lodash';

export class Role {
  public id: number;
  public name: string;
  public age: number;
  public description: string;

  public abilities: Ability[];
  public race: Race;
  public alignment: Alignment;
  public shape: Shape;
  public belief: Belief;
  public level: number;
  public profession: Profession;
  public skills: Skill[];
  public languages: Language[];

  public weapons: Weapon[];

  public getStr(): Ability {
    return _.find(this.abilities, {id: 'STRENGTH'});
  }

  public getDex(): Ability {
    return _.find(this.abilities, {id: 'DEXTERITY'});
  }

  public getCon(): Ability {
    return _.find(this.abilities, {id: 'CONSTITUTION'});
  }

  public getInt(): Ability {
    return _.find(this.abilities, {id: 'INTELLIGENCE'});
  }

  public getWis(): Ability {
    return _.find(this.abilities, {id: 'WISDOM'});
  }

  public getCha(): Ability {
    return _.find(this.abilities, {id: 'CHARISMA'});
  }

}
