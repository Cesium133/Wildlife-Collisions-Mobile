import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NavParams} from '@ionic/angular';

declare var google; 

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.page.html',
  styleUrls: ['./modal-map.page.scss'],
})
export class ModalMapPage implements OnInit {

  @ViewChild('mapElement', {static: true}) mapElement: ElementRef;
  latitude: number;
  longitude: number;
  address: string;
  map: any;
  currentLocation: any;

  flagPublishAddress : boolean = false;

  constructor(public navParams: NavParams, public modalController: ModalController) {

   }

  ngOnInit() {
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');
    this.flagPublishAddress = this.navParams.get('address');
    this.loadMap();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  reverseGeocoding():any {
    var geocoder = new google.maps.Geocoder();
    return new Promise((resolve,reject) => {
      geocoder.geocode({'location': this.currentLocation}, (results,status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(status);
        } else {
          reject(status);
        }
      });
    })
  }

  loadMap() {
    this.currentLocation = new google.maps.LatLng(this.latitude, this.longitude);

    let mapOptions = {
      zoom: 12,
      center: this.currentLocation,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: this.currentLocation,
      map: this.map
    });

    this.reverseGeocoding().then((results:Array<any>)=> {
      console.log(results);
      if(results[0]) {
        this.address = results[0].formatted_address;
        let infoWindow = new google.maps.InfoWindow({
          content: this.address
        });
        google.maps.event.addListener(marker, 'click', ()=> {
          infoWindow.open(this.map, marker);
        });
      }
    }, (status) => console.log(status));
  }

}
