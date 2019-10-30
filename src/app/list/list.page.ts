import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private baseURL = "http://129.2.24.226:8080/mps%20/cheriyan/GEOG650/lab3/"
  private retrieveURL = this.baseURL + "retrieve_collision.php";
  private records : any = []

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }

  listCollisions() {
    this.httpClient.get(this.retrieveURL).subscribe(data => {
      console.log(data);
      this.records = data;
    })
  }

  ionViewWillEnter() {
    this.listCollisions();
  }

}
