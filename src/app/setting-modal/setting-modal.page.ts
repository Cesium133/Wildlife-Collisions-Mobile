import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.page.html',
  styleUrls: ['./setting-modal.page.scss'],
})
export class SettingModalPage implements OnInit {

  distance: number;
  distanceOptions = [500, 1000, 1500, 2000, 3000, 4000, 5000, 10000]; 

  async closeModal() {
    await this.modalController.dismiss(this.distance);
  }

  constructor(public modalController: ModalController, public navParams: NavParams) {


   }

  ngOnInit() {
    this.distance = this.navParams.get('distance');
    console.log(this.distance);
  }

}
