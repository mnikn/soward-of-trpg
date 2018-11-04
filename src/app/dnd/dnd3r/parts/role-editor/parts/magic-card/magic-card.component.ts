import * as _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { Magic, MagicInfo } from '../../../../models/magic';
import { TransferItem } from 'ng-zorro-antd';
import { Role } from '../../../../models/role';
import { Profession, ProfessionInfo } from '../../../../models/profession';

@Component({
  selector: 'app-dnd3r-magic-card',
  templateUrl: './magic-card.component.html',
  styleUrls: ['./magic-card.component.css']
})
export class MagicCardComponent implements OnInit {


  private _magicProfessions: Profession[];
  totalRemainMagicNumbers: Map<string, number> = new Map<string, number>();
  totalMagicTransferItems: Map<string, TransferItem[]> = new Map<string, TransferItem[]>();

  @Input() role: Role;

  @Input() set magicProfessions(value: Profession[]) {
    this._magicProfessions = value;
    _.forEach(value, profession => {
      _.forEach(_.range(profession.level), level => {
        let magicTransferItems = this.createMagicTransferItems(level, profession);
        this.totalMagicTransferItems.set(level + profession.id, magicTransferItems);
      });
    });

    this.updateTotalRemainMagicNumbers();
  }

  get magicProfessions(): Profession[] {
    return this._magicProfessions;
  }

  constructor(public magicInfo: MagicInfo,
              public professionInfo: ProfessionInfo) {
  }

  ngOnInit() {
  }

  public createMagicTransferItems(level: number, profession: Profession): TransferItem[] {
    let professionInfo = this.professionInfo.getInfo(profession.id);
    let magicInfoTransferItems = this.magicInfo.getMagics(level, professionInfo.magicType);
    let selectedMagics = _.filter(this.role.magics, magic =>
      this.magicInfo.getInfo(magic.id).level === level &&
      magic.profession === profession.id);
    return magicInfoTransferItems.map(info => {
      let item: TransferItem = {
        key: info.id,
        title: info.label,
        level: info.level,
        profession: profession.id
      };
      if (selectedMagics.map(e => e.id).includes(item.key)) {
        item.direction = 'left';
      } else {
        item.direction = 'right';
      }
      return item;
    });
  }

  private updateTotalRemainMagicNumbers(): void {
    _.forEach(this.magicProfessions, profession => {
      let professionInfo = this.professionInfo.getInfo(profession.id);
      let maxMagicLevel = Math.min(profession.level, professionInfo.magicNumbers.length);
      _.forEach(_.range(0, maxMagicLevel + 1), magicLevel => {
        let totalMagicNumber = professionInfo.magicNumbers[profession.level - 1][magicLevel];
        let selectedMagicNumber = this.role.magics.filter(item =>
          item.profession === profession.id && this.magicInfo.getInfo(item.id).level === magicLevel)
          .length;
        this.totalRemainMagicNumbers.set(magicLevel + profession.id, totalMagicNumber - selectedMagicNumber);
      });
    });
  }

  public getMagicTransferItems(level: number, profession: Profession): TransferItem[] {
    let items = this.totalMagicTransferItems.get(level + profession.id);
    items = items ? items : [];
    return items;
  }

  public getRemainMagicNumber(level: number, professionId: string) {
    let remainMagicNumbers = this.totalRemainMagicNumbers.get(level + professionId);
    remainMagicNumbers = remainMagicNumbers ? remainMagicNumbers : 0;
    return remainMagicNumbers;
  }

  public updateMagics(transferChanged: any) {
    if (!transferChanged.list || transferChanged.list.length === 0) {
      return;
    }

    let selectedMagics = transferChanged.list.map(item => {
      let magic = new Magic();
      magic.id = item.key;
      magic.profession = item.profession;
      return magic;
    });
    if (transferChanged.to === 'left') {
      this.role.magics = _.concat(this.role.magics, selectedMagics);
    } else {
      let removedMagics = selectedMagics.map(item => item.id);
      this.role.magics = _.filter(this.role.magics, item => !_.includes(removedMagics, item.id));
    }

    this.updateTotalRemainMagicNumbers();
  }

  public magicRange(profession: Profession): number[] {
    let info = this.professionInfo.getInfo(profession.id);
    let maxLevel = Math.min(profession.level, info.magicNumbers.length);
    return _.range(0, info.magicNumbers[maxLevel].length);
  }

}
