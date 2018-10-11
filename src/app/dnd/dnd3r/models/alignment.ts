import * as _ from 'lodash';

export interface Alignment {
    id: number;
    label: string;
}

export class AlignmentInfo {

    public static readonly ALIGNMENTS = {
        LAWFUL_GOOD: { id: 1, label: '守序善良' },
        LAWFUL_NEUTRAL: { id: 2, label: '守序中立' },
        LAWFUL_EVIL: { id: 3, label: '守序邪恶' },
        NEUTRAL_GOOD: { id: 4, label: '中立善良' },
        ABSOLUTE_NEUTRAL: { id: 5, label: '绝对中立' },
        NEUTRAL_EVIL: { id: 6, label: '中立邪恶' },
        CHAOS_GOOD: { id: 7, label: '混乱善良' },
        CHAOS_NEUTRAL: { id: 8, label: '混乱中立' },
        CHAOS_EVIL: { id: 9, label: '混乱邪恶' },
    };

    public static getAlignment(id: number): Alignment {
        return _.find(AlignmentInfo.ALIGNMENTS, { id: id });
    }
}
