import { Ability } from './ability';
import * as _ from 'lodash';
import { Profession } from './profession';

export class Role {
  public id: number;
  public name: string;
  public age: number;
  public description: string;
  public sex: string;

  public abilities: Ability[];
  public race: string;
  public alignment: string;
  public shape: string;
  public belief: string;
  public level: number;
  public professions: Profession[];
  public skills: string[];
  public languages: string[];

  public weapons: string[];

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
