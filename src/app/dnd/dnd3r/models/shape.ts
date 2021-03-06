import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export interface Shape {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})

export class ShapeInfo {

  private _cache: Shape[] = [
    {id: 'SMALL', label: '小型'},
    {id: 'MEDIUM', label: '中型'}
  ];

  public getShape(id: string): Shape {
    return _.find(this._cache, {id: id});
  }

  public getShapes(): Shape[] {
    return this._cache;
  }
}
