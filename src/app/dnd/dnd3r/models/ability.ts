import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';

export class Ability {
  public id: string;
  public value: number;

  constructor(id: string, value: number = 8) {
    this.id = id;
    this.value = value;
  }

  public getModifier(): number {
    return Math.round((this.value - 10) / 2);
  }
}

export interface IAbilityInfo {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbilityInfo {


  public abilities = {
    STRENGTH: {
      id: 'STRENGTH',
      label: '力量'
    },
    DEXTERITY: {
      id: 'DEXTERITY',
      label: '敏捷'
    },
    CONSTITUTION: {
      id: 'CONSTITUTION',
      label: '体质'
    },
    WISDOM: {
      id: 'WISDOM',
      label: '感知'
    },
    INTELLIGENCE: {
      id: 'INTELLIGENCE',
      label: '智力'
    },
    CHARISMA: {
      id: 'CHARISMA',
      label: '魅力'
    }
  };

  constructor(private fileService: FileService) {
  }

  public createAbilities(data: any = [{
    id: this.abilities.STRENGTH.id
  }, {
    id: this.abilities.DEXTERITY.id
  }, {
    id: this.abilities.INTELLIGENCE.id
  }, {
    id: this.abilities.CHARISMA.id
  }, {
    id: this.abilities.CONSTITUTION.id
  }, {
    id: this.abilities.WISDOM.id
  }]): Ability[] {
    let abilities: Ability[] = [];
    _.forEach(data, (ability) => {
      abilities.push(new Ability(ability.id, ability.value));
    });
    // abilities.push(new Ability('STRENGTH', data.str));
    // abilities.push(new Ability('DEXTERITY', data.dex));
    // abilities.push(new Ability('CONSTITUTION', data.con));
    // abilities.push(new Ability('WISDOM', data.wis));
    // abilities.push(new Ability('INTELLIGENCE', data.int));
    // abilities.push(new Ability('CHARISMA', data.cha));
    return abilities;
  }
}
