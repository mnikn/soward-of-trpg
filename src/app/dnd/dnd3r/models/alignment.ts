import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export interface Alignment {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlignmentInfo {

  private _cache: Alignment[] = [
    {id: 'LAWFUL_GOOD', label: '守序善良'},
    {id: 'LAWFUL_NEUTRAL', label: '守序中立'},
    {id: 'LAWFUL_EVIL', label: '守序邪恶'},
    {id: 'NEUTRAL_GOOD', label: '中立善良'},
    {id: 'ABSOLUTE_NEUTRAL', label: '绝对中立'},
    {id: 'NEUTRAL_EVIL', label: '中立邪恶'},
    {id: 'CHAOS_GOOD', label: '混乱善良'},
    {id: 'CHAOS_NEUTRAL', label: '混乱中立'},
    {id: 'CHAOS_EVIL', label: '混乱邪恶'}
  ];

  public getAlignment(id: string): Alignment {
    return _.find(this._cache, {id: id});
  }

  public getAlignments(): Alignment[] {
    return this._cache;
  }
}
