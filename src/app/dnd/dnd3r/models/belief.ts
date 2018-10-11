import * as _ from 'lodash';

export interface Belief {
    id: number;
    label: string;
}

// let beliefDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/belief.json';
export class BeliefInfo {

    // public static readonly BELIEFS: Belief[] = JSON.parse(fs.readFileSync(beliefDataPath).toString());
    public static readonly BELIEFS: Belief[] = [];

    public static getBelief(id: number): Belief {
        return _.find(BeliefInfo.BELIEFS, { id: id });
    }
}
