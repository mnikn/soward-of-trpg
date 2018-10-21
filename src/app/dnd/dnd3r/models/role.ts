import { Ability } from './ability';
import * as _ from 'lodash';
import { Profession } from './profession';
import { Skill } from './skill';
import { Goods } from './goods';

export enum HpSettingsType {
  RADNOM,
  FULL,
  HALF,
  CUSTOM
}

export class Role {
  public id: number;
  public name: string;
  public age: number;
  public description: string;
  public sex: string;
  public maxHp: number;
  public hpSettingsType: HpSettingsType;

  public abilities: Ability[];
  public race: string;
  public alignment: string;
  public belief: string;
  public professions: Profession[];
  public skills: Skill[] = [];
  public languages: string[] = [];

  public weapons: string[] = [];
  public armors: string[] = [];
  public goods: Goods[] = [];

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
