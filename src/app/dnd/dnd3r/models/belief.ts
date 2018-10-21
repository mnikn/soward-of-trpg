import { FileService } from '../../../base/services/file.service';
import { Injectable } from '@angular/core';
import { BaseDnd3rInfoData, BaseDnd3rInfoItem } from './base-dnd3r-info-data';

export interface BeliefInfoItem extends BaseDnd3rInfoItem {
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeliefInfo extends BaseDnd3rInfoData<BeliefInfoItem> {

  constructor(private fileService: FileService) {
    super(fileService, 'belief');
  }
}
