import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';

export class Profession implements IProfessionInfo {
  public level: number;

  readonly hpDiceType: number;
  readonly id: string;
  readonly label: string;
  readonly skillPointIncrement: number;

  constructor(info: IProfessionInfo, level?: number) {
    this.id = info.id;
    this.label = info.label;
    this.hpDiceType = info.hpDiceType;
    this.skillPointIncrement = info.skillPointIncrement;

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
