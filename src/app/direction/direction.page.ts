import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


declare var google;

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit {
  @ViewChild('directionMap', {static: true}) mapElement: ElementRef;
  origin: any;
  destination: any;
  map: any;
  originCoords: number;

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=> {
      if (params) {
        this.origin = JSON.parse(params.origin);
        this.destination = JSON.parse(params.destination);
      }

    });
    this.calculateRoute();

  }

  calculateRoute() {

    let mapOptions = {
      zoom:12,
      center: new google.maps.LatLng(this.origin.lat, this.origin.lng),
      mapTypeId: google.maps.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById("directionMap"), mapOptions);
    let request = {
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }

    let directionService = new google.maps.DirectionsService();
    let directionRenderer = new google.maps.DirectionsRenderer();
    directionRenderer.setMap(this.map);

    directionService.route(request, (response, status)=> {
      if (status == google.maps.DirectionsStatus.OK) {
        directionRenderer.setDirections(response);
        directionRenderer.setPanel(document.getElementById("directionPanel"))
      }

      let bounds = new google.maps.LatLngBounds();
      bounds.extend(this.origin);
      bounds.extend(this.destination);
      this.map.fitBounds(bounds);
      

    })
  }

  goToPlacesPage() {
    this.router.navigate(['places']);
  }

}
