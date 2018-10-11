import * as _ from 'lodash';

export interface Shape {
    id: number;
    label: string;
}

export class ShapeInfo {

    public static readonly SHAPES = {
        SMALL: { id: 1, label: '小型' },
        MEDIUM: { id: 2, label: '中型' }
    };

    public static getShape(id: number): Shape {
        return _.find(ShapeInfo.SHAPES, { id: id });
    }
}
