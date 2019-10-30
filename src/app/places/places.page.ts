import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';


declare var google;


@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  @ViewChild('map', {static:true}) mapElement: ElementRef
  latitude: number;
  longitude: number;
  keyword: string;
  searchType: string;
  distance: number;
  currentLocation: any;
  map: any;
  service: any;
  request: any;
  places: Array <any>;
  cnt: number;

  constructor(private route: ActivatedRoute, public geolocation: Geolocation, public router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.latitude = parseFloat(params.latitude);
        this.longitude = parseFloat(params.longitude);
        this.distance = parseInt(params.dist);
        this.searchType = params.searchType;
        this.keyword = params.keyword;
      }
      this.cnt = 0;
    });

    this.queryPlaces().then((results: Array<any>)=> {
      this.cnt = results.length;
      for(let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      };
      this.places = results;
      this.cnt = results.length;
    }, status => console.log(status))
    
  }

  createMarker(place) {
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: place.name + " " + place.vicinity + " " + place.rating
    });

    google.maps.event.addListener(marker, ()=> {
      let infoWindow = new google.maps.InfoWindow({
        content: marker.title
      });
      infoWindow.open(this.map, this)
    })
  };



  queryPlaces() {
    this.currentLocation = new google.maps.LatLng(this.latitude, this.longitude);
    let mapOptions = {
      zoom: 12,
      center: this.currentLocation,
      mapTypeId: google.maps.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    let requestObj = {
      location: this.currentLocation,
      radius: this.distance,
      type: this.searchType,
      rankBy: google.maps.places.DISTANCE
    };
    return new Promise((resolve,reject) => {
      this.service.nearbySearch(requestObj, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      })
    });
    

    
  };

  goToDirectionPage(index) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        
        origin: JSON.stringify(this.currentLocation),
        destination: JSON.stringify(this.places[index].geometry.location)
      }
    }
    this.router.navigate(['direction'], navigationExtras)

  }

}
