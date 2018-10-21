import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';
import { BaseDnd3rInfo, BaseDnd3rInfoItem } from './base-dnd3r-info';

export class Profession {
  readonly id: string;
  public level: number;
  public isMainProfession: boolean;

  constructor(id?: string, level?: number) {
    this.id = id;
    this.level = level;
  }
}

export interface ProfessionInfoItem extends BaseDnd3rInfoItem {
  label: string;
  keyAbility: string;
  hpDiceType: number;
  skillPointIncrement: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionInfo extends BaseDnd3rInfo<ProfessionInfoItem> {

  constructor(private fileService: FileService) {
    super(fileService, 'profession');
  }

  // public getProfessionInfo(id: string): IProfessionInfo {
  //   return _.find(this._cache, {id: id});
  // }
  //
  // public getProfessionsInfo(): IProfessionInfo[] {
  //   if (this._cache === null) {
  //     this._cache = JSON.parse(
  //       this.fileService
  //         .readFileSync(AppContext.getDnd3rData('profession'))
  //         .toString());
  //   }
  //   return this._cache;
  // }
}
