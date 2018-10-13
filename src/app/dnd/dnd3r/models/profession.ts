import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';

export class Profession {
  public level: number;
  readonly id: string;

  constructor(id: string, level?: number) {
    this.id = id;
    this.level = level;
  }
}

export interface IProfessionInfo {
  id: string;
  label: string;
  hpDiceType: number;
  skillPointIncrement: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionInfo {


  private _cache: IProfessionInfo[] = null;

  constructor(private fileService: FileService) {
  }

  public getProfession(id: string): IProfessionInfo {
    return _.find(this._cache, {id: id});
  }

  public getProfessions(): IProfessionInfo[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('profession'))
          .toString());
    }
    return this._cache;
  }
}
