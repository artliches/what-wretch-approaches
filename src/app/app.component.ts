import { Component, OnInit, ViewChild } from '@angular/core';
import { APOCALYPSE, BUILD, CONCERN, ISREALLY, MAIN_PRONOUN, NAMES, SECONDARY_PRONOUN, SKIN_TONE, SPECIES, TRADE, TRAIT, WANTS } from '../assets/descrips.constants';
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

  pronounsObj = {
    pronouns_main: '',
    pronouns_secondary: '',
    prevMain: -1,
    prevSecondary: -1,
  };

  clipBoard = '';
  @ViewChild('introduction') introduction: any;
  @ViewChild('mainDescription') mainDescription: any;
  @ViewChild('extraDescription') extraDescription: any;

  ngOnInit(): void {
    this.rollAll();
  }

  copyToClipboard() {
    this.clipBoard =
      this.introduction.nativeElement.innerText +
      this.mainDescription.nativeElement.innerText +
      this.extraDescription.nativeElement.innerText;

      navigator.clipboard.writeText(this.clipBoard);
}

  rollAll() {
    this.reRollName();
    this.reRollPronouns();
    this.reRollSpecies();
    this.reRollSkin();
    this.reRollBuild();
    this.reRollTrait();
    this.reRollTrade();
    this.reRollConcern();
    this.reRollWants();
    this.reRollApocalypse();
    this.reRollIsReally();
  }

  reRollName() {
    this.nameObj.descrip = this.getDescripFromArray(NAMES, this.nameObj);
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
    this.speciesObj.descrip = this.getDescripFromArray(SPECIES, this.nameObj);
  }

  reRollBuild() {
    this.buildObj.descrip = this.getDescripFromArray(BUILD, this.nameObj);
  }

  reRollSkin() {
    this.skinObj.descrip = this.getDescripFromArray(SKIN_TONE, this.nameObj);
  }

  reRollTrait() {
    this.traitObj.descrip = this.getDescripFromArray(TRAIT, this.nameObj);
  }

  reRollTrade() {
    this.tradeObj.descrip = this.getDescripFromArray(TRADE, this.nameObj);
  }

  reRollConcern() {
    this.concernObj.descrip = this.getDescripFromArray(CONCERN, this.nameObj);
  }

  reRollWants() {
    this.wantsObj.descrip = this.getDescripFromArray(WANTS, this.nameObj);
  }

  reRollApocalypse() {
    this.apocObj.descrip = this.getDescripFromArray(APOCALYPSE, this.nameObj);
  }

  reRollIsReally() {
    this.isReallyObj.descrip = this.getDescripFromArray(ISREALLY, this.nameObj);
  }

  getDescripFromArray(specialDescrips: Array<any>, obj: {descrip: string, prevRoll: number}): string {
    const arrayLength = specialDescrips.length - 1;
    const rolledValue = this.randomNumber.getRandomNumber(0, arrayLength, obj.prevRoll);
    obj.prevRoll = rolledValue;

    return specialDescrips[rolledValue];
  }
}
