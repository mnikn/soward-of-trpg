import * as _ from 'lodash';

export interface Race {
    id: number;
    label: string;
}

// let raceDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/race.json';
export class RaceInfo {

    // public static readonly RACES: Race[] = JSON.parse(fs.readFileSync(raceDataPath).toString());
    public static readonly RACES: Race[] = [];

    public static getRace(id: number): Race {
        return _.find(RaceInfo.RACES, { id: id });
    }
}
