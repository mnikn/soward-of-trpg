import { Component, Input, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { WeaponInfo } from '../../../../models/weapon';
import { ArmorInfo } from '../../../../models/armor';
import { Goods, GoodsInfo } from '../../../../models/goods';
import { Role } from '../../../../models/role';

@Component({
  selector: 'app-dnd3r-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() role: Role;

  weapons: TransferItem[];
  armorTransferItems: TransferItem[];
  goodsTransferItems: TransferItem[];

  constructor(
    private weaponInfo: WeaponInfo,
    private armorInfo: ArmorInfo,
    private goodsInfo: GoodsInfo) {
  }

  ngOnInit() {
    this.weapons = this.createTransferItems(this.weaponInfo.getWeaponsInfo(), this.role.weapons);
    this.armorTransferItems = this.createTransferItems(this.armorInfo.getArmorsInfo(), this.role.armors);
    this.goodsTransferItems = this.createTransferItems(this.goodsInfo.getGoodsListInfo(), _.map(this.role.goods, 'id'));
  }

  updateWeapons(transferChanged: any): void {
    this.role.weapons = this.handleTransferChanged(this.role.weapons, transferChanged);
  }

  updateArmors(transferChanged: any): void {
    this.role.armors = this.handleTransferChanged(this.role.armors, transferChanged);
  }

  updateGoods(transferChanged: any): void {
    this.role.goods = this.handleTransferChanged(_.map(this.role.goods, 'id'), transferChanged).map(itemId => {
      return new Goods(itemId);
    });
  }


  private createTransferItems(total: any[], selected: string[]): TransferItem[] {
    return total.map(info => {
      let item: TransferItem = {
        key: info.id,
        title: info.label,
        description: info.description
      };
      if (selected.includes(item.key)) {
        item.direction = 'left';
      } else {
        item.direction = 'right';
      }
      return item;
    });
  }

  private handleTransferChanged(originSelectedItems: any, transferChanged: any): string[] {
    let changedItems = _.map(transferChanged.list, 'key');
    if (transferChanged.to === 'left') {
      return _.concat(originSelectedItems, _.difference(changedItems, originSelectedItems));
    } else {
      return _.filter(originSelectedItems, id => !changedItems.includes(id));
    }
  }

}
