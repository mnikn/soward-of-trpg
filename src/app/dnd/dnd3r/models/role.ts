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
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get abilities(): Ability[] {
    return this._abilities;
  }

  set abilities(value: Ability[]) {
    this._abilities = value;
  }

  get race(): Race {
    return this._race;
  }

  set race(value: Race) {
    this._race = value;
  }

  get alignment(): Alignment {
    return this._alignment;
  }

  set alignment(value: Alignment) {
    this._alignment = value;
  }

  get shape(): Shape {
    return this._shape;
  }

  set shape(value: Shape) {
    this._shape = value;
  }

  get belief(): Belief {
    return this._belief;
  }

  set belief(value: Belief) {
    this._belief = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get profession(): Profession {
    return this._profession;
  }

  set profession(value: Profession) {
    this._profession = value;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

  get languages(): Language[] {
    return this._languages;
  }

  set languages(value: Language[]) {
    this._languages = value;
  }

  get weapons(): Weapon[] {
    return this._weapons;
  }

  set weapons(value: Weapon[]) {
    this._weapons = value;
  }

  private _id: number;
  private _name: string;
  private _age: number;
  private _description: string;

  private _abilities: Ability[];
  private _race: Race;
  private _alignment: Alignment;
  private _shape: Shape;
  private _belief: Belief;
  private _level: number;
  private _profession: Profession;
  private _skills: Skill[];
  private _languages: Language[];

  private _weapons: Weapon[];

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
