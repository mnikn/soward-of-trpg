import * as _ from 'lodash';

export class Skill {
    public assignedPoint = 0;
    public initialPoint = 0;

    public id: string;
    public label: string;
    public keyAbility: string;

    constructor(skillInfo: any, assignedPoint: number = 0) {
        this.id = skillInfo.id;
        this.label = skillInfo.label;
        this.keyAbility = skillInfo.keyAbility;
        this.assignedPoint = assignedPoint;
    }
}

interface ISkillInfo {
    id: string;
    label: string;
    keyAbility: number;
    class: string[];
    crossClass: string[];
}

// let skillDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/skill.json';
export class SkillInfo {

    // public static readonly SKILLS: ISkillInfo[] = JSON.parse(fs.readFileSync(skillDataPath).toString());
    public static readonly SKILLS: ISkillInfo[] = [];

    public static getSkillById(id: number): any {
        return _.find(SkillInfo.SKILLS, { id: id });
    }

    public static createSkills(): Skill[] {
        let skills: Skill[] = [];
        _.forEach(SkillInfo.SKILLS, (skill: any) => {
            skills.push(new Skill(skill));
        });
        return skills;
    }

    public static getSkillInfos(): any[] {
        return SkillInfo.SKILLS;
    }
}


