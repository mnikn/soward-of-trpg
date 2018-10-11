import * as _ from 'lodash';

export interface Language {
    id: number;
    label: string;
}

// let languageDataPath = '/Users/zhengzhizhao/Local Documents/project/trpg-runner/src/dnd/resources/data/language.json';
export class LanguageInfo {

    // public static readonly LANGUAGES: Language[] = JSON.parse(fs.readFileSync(languageDataPath).toString());
    public static readonly LANGUAGES: Language[] = [];


    public static getLanguage(id: number): Language {
        return _.find(LanguageInfo.LANGUAGES, { id: id });
    }

    public static getLanguages(ids: number[]): Language[] {
        return _.filter(LanguageInfo.LANGUAGES, lan => _.includes(ids, lan.id));
    }
}
