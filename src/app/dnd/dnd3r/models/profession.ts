import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';

export interface Profession {
  id: string;
  label: string;
  hpDiceType: number;
  skillPointIncrement: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionInfo {


  private _cache: Profession[] = null;

  constructor(private fileService: FileService) {
  }

  public getProfession(id: string): Profession {
    return _.find(this._cache, {id: id});
  }

  public getProfessions(): Profession[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('profession'))
          .toString());
    }
    return this._cache;
  }
}
