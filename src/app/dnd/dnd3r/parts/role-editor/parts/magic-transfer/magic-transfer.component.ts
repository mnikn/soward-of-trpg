import * as _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { MagicInfo } from '../../../../models/magic';
import { TransferItem } from 'ng-zorro-antd';
import { Role } from '../../../../models/role';
import { Profession, ProfessionInfo, ProfessionInfoItem } from '../../../../models/profession';

@Component({
  selector: 'app-dnd3r-magic-transfer',
  templateUrl: './magic-transfer.component.html',
  styleUrls: ['./magic-transfer.component.css']
})
export class MagicTransferComponent implements OnInit {

  @Input() role: Role;
  magicLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalMagicTransferItems: Map<string, TransferItem[]> = new Map<string, TransferItem[]>();

  constructor(public magicInfo: MagicInfo,
              private professionInfo: ProfessionInfo) {
  }

  ngOnInit() {
    _.forEach(this.magicLevels, level => {
      _.forEach(this.getSelectableMagicTypes(), magicType => {
        let magicTransferItems = this.createMagicTransferItems(level, magicType);
        this.totalMagicTransferItems.set(level + magicType, magicTransferItems);
      });
    });
  }

  public createMagicTransferItems(level: number, magicType: string): TransferItem[] {
    let magicInfoTransferItems = this.magicInfo.getMagics(level, magicType);
    let selectedMagics = _.filter(this.role.magics, magic => this.magicInfo.getInfo(magic).level === level);
    return magicInfoTransferItems.map(info => {
      let item: TransferItem = {
        key: info.id,
        title: info.label
      };
      if (selectedMagics.includes(item.key)) {
        item.direction = 'left';
      } else {
        item.direction = 'right';
      }
      return item;
    });
  }

  public getMagicTransferItems(level: number, magicType: string): TransferItem[] {
    let items = this.totalMagicTransferItems.get(level + magicType);
    items = items ? items : [];
    return items;
  }

  updateMagics(transferChanged: any) {
    let originSelectedItems = this.role.magics;
    let changedItems = _.map(transferChanged.list, 'key');
    let magics = [];
    if (transferChanged.to === 'left') {
      magics = _.concat(originSelectedItems, _.difference(changedItems, originSelectedItems));
    } else {
      magics = _.filter(originSelectedItems, id => !changedItems.includes(id));
    }
    this.role.magics = magics;
  }

  private getSelectableMagicTypes(): string[] {
    let professionInfo = this.professionInfo;
    let professionMagicTypes = _.map(this.role.professions, p => professionInfo.getInfo(p.id).magicType);
    let magicTypes = _.filter(_.uniq(professionMagicTypes), e => !!e);
    return magicTypes;
  }

  public getMagicProfessions(): ProfessionInfoItem[] {
    let professionInfo = this.professionInfo;
    let professions = _.filter(this.role.professions, p => !!professionInfo.getInfo(p.id).magicType);
    let magicProfessions = _.map(professions, p => professionInfo.getInfo(p.id));
    return magicProfessions;
  }

}
