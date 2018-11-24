import { Charisma, Constitution, Dexterity, Intelligence, Strength, Wisdom } from './ability';
import { Profession } from './profession';
import { Skill } from './skill';
import { Goods } from './goods';
import { Magic } from './magic';

export enum HpSettingsType {
  RANDOM,
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

  public race: string;
  public alignment: string;
  public belief: string;
  public professions: Profession[];
  public skills: Skill[] = [];
  public languages: string[] = [];

  public weapons: string[] = [];
  public armors: string[] = [];
  public goods: Goods[] = [];

  public magics: Magic[] = [];

  public str: Strength = new Strength();
  public dex: Dexterity = new Dexterity();
  public con: Constitution = new Constitution();
  public int: Intelligence = new Intelligence();
  public wis: Wisdom = new Wisdom();
  public cha: Charisma = new Charisma();

  public toJsonData(): any {
    return {
      id: this.id,
      age: this.age,
      name: this.name,
      description: this.description,
      sex: this.sex,
      maxHp: this.maxHp,
      hpSettingsType: this.hpSettingsType,
      abilities: {
        str: this.str.value,
        con: this.con.value,
        dex: this.dex.value,
        int: this.int.value,
        wis: this.wis.value,
        cha: this.cha.value,
      },
      race: this.race,
      alignment: this.alignment,
      belief: this.belief,
      professions: this.professions.map(e => e.toJsonData()),
      skills: this.skills.map(e => e.toJsonData()),
      languages: this.languages,
      weapons: this.weapons,
      armors: this.armors,
      goods: this.goods.map(e => e.toJsonData()),
      magics: this.magics.map(e => e.toJsonData()),
    };
  }

}
