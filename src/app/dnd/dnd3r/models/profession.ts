import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { BaseDnd3rInfoData, BaseDnd3rInfoItem } from './base-dnd3r-info-data';

export class Profession {
  readonly id: string;
  public level: number;
  public isMainProfession: boolean;

  constructor(id?: string, level?: number, isMainProfession?: boolean) {
    this.id = id;
    this.level = level;
    this.isMainProfession = isMainProfession;
  }

  public toJsonData(): any {
    return {
      id: this.id,
      level: this.level,
      isMainProfession: this.isMainProfession
    };
  }
}

export interface ProfessionInfoItem extends BaseDnd3rInfoItem {
  label: string;
  keyAbility: string;
  hpDiceType: number;
  skillPointIncrement: number;
  magicType: string;
  magicNumbers: number[][];
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionInfo extends BaseDnd3rInfoData<ProfessionInfoItem> {

  constructor(private fileService: FileService) {
    super(fileService, 'profession');
  }
}
