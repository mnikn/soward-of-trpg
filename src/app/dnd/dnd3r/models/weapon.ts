import * as _ from 'lodash';

export interface Weapon {
    id: string;
    label: string;
    damageDiceNumber: number;
    damageDiceValue: number;
    damgeType: number;
}

// let weaponDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/weapon.json';
export class WeaponInfo {
    // public static readonly WEAPONS: Weapon[] = JSON.parse(fs.readFileSync(weaponDataPath).toString());
    public static readonly WEAPONS: Weapon[] = [];

    public static getWeaponById(id: string): Weapon {
        return _.find(WeaponInfo.WEAPONS, { id: id });
    }
}
