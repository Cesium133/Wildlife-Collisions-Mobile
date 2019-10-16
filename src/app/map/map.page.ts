import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  // ! Ignore error below
  @ViewChild('mapElement', {static: true}) mapElement: ElementRef;
  latitude: number;
  longitude: number;
  address: string;
  map: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      console.log(params.latitude);

      if (params && params.latitude && params.longitude) {
        this.latitude = params.latitude;
        this.longitude = params.longitude;
      } else {
        this.latitude = 38.985978;
        this.longitude = -76.942564;
      }
    });
    this.loadMap();
  };

  loadMap() {
    let currentLocation = new google.maps.LatLng(this.latitude, this.longitude);

    let mapOptions = {
      zoom: 12,
      center: currentLocation,
      mapTypeId: google.maps.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      position: currentLocation,
      map: this.map,
      title: "Animal Collisions"
    });

    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      location: currentLocation
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.address = results[0].formatted_address;

          let infoWindow = new google.maps.InfoWindow({
            content: this.address
          });
          console.log(infoWindow);
          google.maps.event.addListener(marker, 'click', ()=> {
            infoWindow.open(this.map, marker);
          })
        }
      }
    })


  }


}
