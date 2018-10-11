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

export default class Role {
    name: string;
    age: number;

    abilities: Ability[];
    race: Race;
    alignment: Alignment;
    shape: Shape;
    belief: Belief;
    level: number;
    profession: Profession;
    skills: Skill[];
    languages: Language[];

    weapons: Weapon[];

    maxHp: number;
    // hpAssignType: HpAssignType;
    // hpDiceNumbers: number[] = [];

    public getStr(): Ability {
        return _.find(this.abilities, { id: 'STRENGTH' });
    }

    public getDex(): Ability {
        return _.find(this.abilities, { id: 'DEXTERITY' });
    }

    public getCon(): Ability {
        return _.find(this.abilities, { id: 'CONSTITUTION' });
    }

    public getInt(): Ability {
        return _.find(this.abilities, { id: 'INTELLIGENCE' });
    }

    public getWis(): Ability {
        return _.find(this.abilities, { id: 'WISDOM' });
    }

    public getCha(): Ability {
        return _.find(this.abilities, { id: 'CHARISMA' });
    }

}
