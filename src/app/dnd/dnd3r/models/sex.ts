import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export interface Sex {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class SexInfo {

  private _cache: Sex[] = [
    {id: 'MALE', label: '男'},
    {id: 'FEMALE', label: '女'}
  ];

  public getSex(id: string): Sex {
    return _.find(this._cache, {id: id});
  }

  public getSexs(): Sex[] {
    return this._cache;
  }
}
