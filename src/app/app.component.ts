import { Component, OnInit, ViewChild } from '@angular/core';
import { APOCALYPSE, BUILD, CONCERN, FUR, ISREALLY, MAIN_PRONOUN, NAMES, PALE_NAMES_1, PALE_NAMES_2, PALE_NAMES_3, SCALES, SECONDARY_PRONOUN, SKIN_TONE, SPECIALITY, SPECIES, TRADE, TRAIT, WANTS, WHATTHEYVALUE } from '../assets/descrips.constants';
import { RandomNumberService } from './_services/randomNumber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private randomNumber: RandomNumberService
  ) {}

  nameObj = {
    descrip: '',
    prevRoll: -1,
    paleNamesPrev: {
      first: -1,
      second: -1,
      third: -1,
    }
  };

  traitObj = {
    descrip: '',
    prevRoll: -1,
  };

  tradeObj = {
    descrip: '',
    prevRoll: -1,
  };

  concernObj = {
    descrip: '',
    prevRoll: -1,
  };

  wantsObj = {
    descrip: '',
    prevRoll: -1,
  };

  apocObj = {
    descrip: '',
    prevRoll: -1,
  };

  isReallyObj = {
    descrip: '',
    prevRoll: -1,
  };

  speciesObj = {
    descrip: '',
    prevRoll: -1,
  };

  buildObj = {
    descrip: '',
    prevRoll: -1,
  };

  skinObj = {
    descrip: '',
    prevRoll: -1,
  };

  whatTheyWantObj = {
    descrip: '',
    prevRoll: -1,
  };

  specialityObj = {
    descrip: '',
    prevRoll: -1,
  };

  pronounsObj = {
    pronouns_main: '',
    pronouns_secondary: '',
    prevMain: -1,
    prevSecondary: -1,
  };

  morale = 0;

  reaction = '';

  clipBoard = '';
  copied = false;
  @ViewChild('introduction') introduction: any;
  @ViewChild('mainDescription') mainDescription: any;
  @ViewChild('hirelingMechanics') hirelingMechanics: any;

  ngOnInit(): void {
    this.rollAll();
  }

  copyToClipboard() {
    this.clipBoard =
      this.introduction.nativeElement.innerText +
      this.mainDescription.nativeElement.innerText +
      this.hirelingMechanics.nativeElement.innerText;

      navigator.clipboard.writeText(this.clipBoard);
      this.copied = true;
}

  rollAll() {
    this.reRollName();
    this.reRollPronouns();
    this.reRollSpecies();
    this.reRollBuild();
    this.reRollTrait();
    this.reRollTrade();
    this.reRollConcern();
    this.reRollWants();
    this.reRollApocalypse();
    this.reRollIsReally();
    this.reRollSpeciality();
    this.reRollWhatTheyValue();
    this.checkReaction();
    this.reRollMorale();
  }

  rollTwodSix(): number {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      sum += this.randomNumber.getRandomNumber(1, 6);
    }

    return sum;
  }

  reRollMorale() {
    this.morale = this.rollTwodSix();
  }

  checkReaction() {
    const reactionValue = this.rollTwodSix();

    if (reactionValue <= 3) {
      this.reaction = ' want to KILL you!'
    } else if (reactionValue > 3 && reactionValue <= 6) {
      this.reaction = ' feel angry just looking at you.';
    } else if (reactionValue > 6 && reactionValue <= 8) {
      this.reaction = ' feel indifferent about you.';
    } else if (reactionValue > 8 && reactionValue <= 10) {
      this.reaction = ' look to be almost friendly.';
    } else {
      this.reaction = ' want to help you.';
    }
  }

  reRollSpeciality() {
    this.specialityObj.descrip = this.getDescripFromArray(SPECIALITY, this.specialityObj);
  }

  reRollWhatTheyValue() {
    this.whatTheyWantObj.descrip = this.getDescripFromArray(WHATTHEYVALUE, this.whatTheyWantObj);
  }

  reRollName() {
    if (this.speciesObj.descrip === 'Pale One') {
      const arrayLengths = {
        first: PALE_NAMES_1.length - 1,
        second: PALE_NAMES_2.length - 1,
        third: PALE_NAMES_3.length - 1
      };

      const rolledValues = {
        first: this.randomNumber.getRandomNumber(0, arrayLengths.first, this.nameObj.paleNamesPrev.first),
        second: this.randomNumber.getRandomNumber(0, arrayLengths.second, this.nameObj.paleNamesPrev.second),
        third: this.randomNumber.getRandomNumber(0, arrayLengths.third, this.nameObj.paleNamesPrev.third),
      };

      this.nameObj.paleNamesPrev.first = rolledValues.first;
      this.nameObj.paleNamesPrev.second = rolledValues.second;
      this.nameObj.paleNamesPrev.third = rolledValues.third;

      this.nameObj.descrip = `${PALE_NAMES_1[rolledValues.first]} ${PALE_NAMES_2[rolledValues.second]} ${PALE_NAMES_3[rolledValues.third]}`;

    } else {
      this.nameObj.descrip = this.getDescripFromArray(NAMES, this.nameObj);
    }

  }

  reRollPronouns() {
    const pronouns = this.getPronouns();
    this.pronounsObj.pronouns_main = pronouns.main;
    this.pronounsObj.pronouns_secondary = pronouns.secondary;
  }

  reRollMainPronoun() {
    const mainLength = MAIN_PRONOUN.length - 1;
    const rolledMain = this.randomNumber.getRandomNumber(0, mainLength, this.pronounsObj.prevMain);
    this.pronounsObj.prevMain = rolledMain;
    this.pronounsObj.pronouns_main = MAIN_PRONOUN[rolledMain];

    // this.fixPronouns();
  }

  reRollSecondaryPronoun() {
    const secondaryLength = SECONDARY_PRONOUN.length - 1;
    const rolledSecondary = this.randomNumber.getRandomNumber(0, secondaryLength, this.pronounsObj.prevSecondary);
    this.pronounsObj.prevSecondary = rolledSecondary;
    this.pronounsObj.pronouns_secondary = SECONDARY_PRONOUN[rolledSecondary];
  }

  getPronouns() { // cant use generic
    const mainLength = MAIN_PRONOUN.length - 1;
    const secondaryLength = SECONDARY_PRONOUN.length - 1;
    const rolledMain = this.randomNumber.getRandomNumber(0, mainLength, this.pronounsObj.prevMain);
    const rolledSecondary = this.randomNumber.getRandomNumber(0, secondaryLength, this.pronounsObj.prevSecondary);

    this.pronounsObj.prevMain = rolledMain;
    this.pronounsObj.prevSecondary = rolledSecondary;

    return {
      main: MAIN_PRONOUN[rolledMain],
      secondary: SECONDARY_PRONOUN[rolledSecondary]
    };
  }

  reRollSpecies() {
    const previousSpecies = this.speciesObj.descrip;
    this.speciesObj.descrip = this.getDescripFromArray(SPECIES, this.speciesObj);
    if (this.speciesObj.descrip === 'Pale One' || previousSpecies === 'Pale One') {
      this.reRollName();
    }
    this.reRollSkin();
  }

  reRollBuild() {
    this.buildObj.descrip = this.getDescripFromArray(BUILD, this.buildObj);
  }

  reRollSkin() {
    if (this.speciesObj.descrip === 'Basalisk-born') {
      this.skinObj.descrip = this.getDescripFromArray(SCALES, this.skinObj);
    } else if (this.speciesObj.descrip === 'Gnoll' || this.speciesObj.descrip === 'Bisontaur') {
      this.skinObj.descrip = this.getDescripFromArray(FUR, this.skinObj);
    } else {
      this.skinObj.descrip = this.getDescripFromArray(SKIN_TONE, this.skinObj);
    }
  }

  reRollTrait() {
    this.traitObj.descrip = this.getDescripFromArray(TRAIT, this.traitObj);
  }

  reRollTrade() {
    this.tradeObj.descrip = this.getDescripFromArray(TRADE, this.tradeObj);
  }

  reRollConcern() {
    this.concernObj.descrip = this.getDescripFromArray(CONCERN, this.concernObj);
  }

  reRollWants() {
    this.wantsObj.descrip = this.getDescripFromArray(WANTS, this.wantsObj);
  }

  reRollApocalypse() {
    this.apocObj.descrip = this.getDescripFromArray(APOCALYPSE, this.apocObj);
  }

  reRollIsReally() {
    this.isReallyObj.descrip = this.getDescripFromArray(ISREALLY, this.isReallyObj);
  }

  getDescripFromArray(specialDescrips: Array<any>, obj: {descrip: string, prevRoll: number}): string {
    const arrayLength = specialDescrips.length - 1;
    const rolledValue = this.randomNumber.getRandomNumber(0, arrayLength, obj.prevRoll);
    obj.prevRoll = rolledValue;

    return specialDescrips[rolledValue];
  }
}
