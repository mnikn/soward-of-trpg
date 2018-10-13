import * as _ from 'lodash';
import { FileService } from '../../../base/services/file.service';
import { Injectable } from '@angular/core';
import { AppContext } from '../../../base/constants/app-context';

export interface Belief {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeliefInfo {

  constructor(private fileService: FileService) {
  }

  private _cache: Belief[] = null;

  public getBelief(id: string): Belief {
    return _.find(this._cache, {id: id});
  }

  public getBeliefs(): Belief[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('belief'))
          .toString());
    }
    return this._cache;
  }
}
