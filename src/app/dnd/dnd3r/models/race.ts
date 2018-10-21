import { FileService } from '../../../base/services/file.service';
import { Injectable } from '@angular/core';
import { BaseDnd3rInfoData, BaseDnd3rInfoItem } from './base-dnd3r-info-data';

export interface RaceInfoItem extends BaseDnd3rInfoItem {
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class RaceInfo extends BaseDnd3rInfoData<RaceInfoItem> {

  constructor(private fileService: FileService) {
    super(fileService, 'race');
  }
}
