import * as _ from 'lodash';

export interface Profession {
    id: string;
    label: string;
    hpDiceType: number;
    skillPointIncrement: number;
}

// let professionDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/profession.json';
export class ProfessionInfo {

    // public static readonly PROFESSIONS: Profession[] = JSON.parse(fs.readFileSync(professionDataPath).toString());
    public static readonly PROFESSIONS: Profession[] = [];

    public static getProfession(id: string): Profession {
        return _.find(ProfessionInfo.PROFESSIONS, { id: id });
    }
}
