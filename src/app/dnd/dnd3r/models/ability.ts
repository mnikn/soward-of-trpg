import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';


export class Ability {
  public value: number;

  constructor(value: number = 8) {
    this.value = value;
  }

  public getModifier(): number {
    return Math.round((this.value - 10) / 2);
  }
}

export class Strength extends Ability {
  public static label = '力量';

  constructor(value: number = 8) {
    super(value);
  }
}


export class Dexterity extends Ability {
  public static label = '敏捷';

  constructor(value: number = 8) {
    super(value);
  }
}


export class Constitution extends Ability {
  public static label = '体质';

  constructor(value: number = 8) {
    super(value);
  }
}


export class Wisdom extends Ability {
  public static label = '感知';

  constructor(value: number = 8) {
    super(value);
  }
}

export class Intelligence extends Ability {
  public static label = '智力';

  constructor(value: number = 8) {
    super(value);
  }
}

export class Charisma extends Ability {
  public static label = '魅力';

  constructor(value: number = 8) {
    super(value);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AbilityInfo {

  public getAbility(id: string): any {
    switch (id) {
      case 'STRENGTH':
        return Strength;
      case 'DEXTERITY':
        return Dexterity;
      case 'CONSTITUTION':
        return Constitution;
      case 'WISDOM':
        return Wisdom;
      case 'INTELLIGENCE':
        return Intelligence;
      case 'CHARISMA':
        return Charisma;
    }
  }
}
