import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { BaseDnd3rInfoData, BaseDnd3rInfoItem } from './base-dnd3r-info-data';

export class Magic {
  id: string;
  profession: string;
}

export interface MagicInfoItem extends BaseDnd3rInfoItem {
  label: string;
  level: number;
  magicType: string;
}

@Injectable({
  providedIn: 'root'
})
export class MagicInfo extends BaseDnd3rInfoData<MagicInfoItem> {

  constructor(private fileService: FileService) {
    super(fileService, 'magic');
  }

  public getMagics(level: number, magicType: string) {
    return _.filter(this.getInfoList(), magic => magic.level === level && magic.magicType === magicType);
  }
}
