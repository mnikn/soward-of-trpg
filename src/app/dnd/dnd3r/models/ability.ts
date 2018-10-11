import * as _ from 'lodash';

export class Ability {
    public value: number;

    public id: string;
    public label: string;

    constructor(abilityInfo: IAbilityInfo, value?: number) {
        this.id = abilityInfo.id;
        this.label = abilityInfo.label;
        this.value = value;
    }

    public getModifier(): number {
        return Math.round((this.value - 10) / 2);
    }
}

export interface IAbilityInfo {
    id: string;
    label: string;
}

// let abilityDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/ability.json';
export class AbilityInfo {

    // public static readonly ABILITIES: IAbilityInfo[] = JSON.parse(fs.readFileSync(abilityDataPath).toString());
    public static readonly ABILITIES: IAbilityInfo[] = [];

    public static getAbility(id: string): IAbilityInfo {
        return _.find(AbilityInfo.ABILITIES, { id: id });
    }

    public static createAbilities(): Ability[] {
        let abilities: Ability[] = [];
        _.forEach(AbilityInfo.ABILITIES, (ability: IAbilityInfo) => {
            abilities.push(new Ability(ability, 8));
        });
        return abilities;
    }
}
