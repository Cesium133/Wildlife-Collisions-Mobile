import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingModalPage } from '../setting-modal/setting-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  onGeoLocation: string;
  latitude: number;
  longitude: number;
  speed: string;
  accuracy: string;
  searchDistance: number = 3000;
  keyword: string; // ! remove later?

  constructor(public router: Router, public modalController: ModalController, public geolocation: Geolocation) {
    this.findCurrentLocation();
  };

  facilities = [
    {name: 'Police Stations', searchType: 'police', icon: 'body'},
    {name: 'Fire Departments', searchType: 'fire_station', icon: 'flame'},
    {name: 'Hospitals', searchType: 'hospital', icon: 'medkit'},
    {name: 'Animal Hospitals', searchType: "veterinary_care", icon: "paw"},
    {name: 'Dept. of Transportation', searchType: "travel_agency", icon: 'car'}
  ]

  findCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.onGeoLocation = "On";
      this.latitude = parseFloat(position.coords.latitude.toFixed(4));
      this.longitude = parseFloat(position.coords.longitude.toFixed(4));
      this.speed = position.coords.speed ? position.coords.speed + " meters/second" : "N/A";
      this.accuracy = position.coords.accuracy ? position.coords.accuracy + " meters" : "N/A";
    }, (error) => {
      this.onGeoLocation = "Off";
      this.latitude = 38.9859;
      this.longitude = -76.9426;
      this.speed = "N/A";
      this.accuracy = "N/A";
    });
  };

  goToMapPage() {
    this.findCurrentLocation();

    let navExtras: NavigationExtras = {
      queryParams: {
        latitude: this.latitude,
        longitude: this.longitude
      }
    };

    this.router.navigate(['map'], navExtras)
  };

  async openSettings() {
    const settingModal = await this.modalController.create({
      component: SettingModalPage,
      componentProps: {distance: this.searchDistance}
    });
    settingModal.onDidDismiss().then((searchDistance) => {
      this.searchDistance = searchDistance.data;
    })
    return await settingModal.present();
  }

  goToPlacesPage(queryName:String, queryType: String) {
    // * Part III

    let navExtras: NavigationExtras = {
      queryParams: {
        latitude: this.latitude,
        longitude: this.longitude,
        searchDistance: this.searchDistance,
        searchType: this.facilities[0].searchType,
        keyword: this.keyword
        
      }
    };

    this.router.navigate(['places'], navExtras);
  }



  

}
