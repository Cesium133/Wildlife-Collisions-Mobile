import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


declare var google;


@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

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

  constructor(private route: ActivatedRoute, public geolocation: Geolocation) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        this.distance = parseInt(params.searchDistance);
        this.searchType = params.searchType;
        this.keyword = params.keyword;
      }
    });

    this.queryPlaces().then((results: Array<any>)=> {
      for(let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      };
      this.places = results;
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
    let currentLocation = new google.maps.LatLng(this.latitude, this.longitude);
    let mapOptions = {
      zoom: 12,
      center: currentLocation,
      mapTypeId: google.maps.ROADMAP
    };
    this.map = google.maps.Map(document.getElementById('map'), mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    let requestObj = {
      location: this.currentLocation,
      radius: this.distance,
      type: this.searchType,
      rankBy: google.maps.places.DISTANCE
    };
    return new Promise((resolve,reject) => {
      this.service.nearbySearch(requestObj, (results, status) => {
        if (status === google.maps.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      })
    });
    

    
  };

}
