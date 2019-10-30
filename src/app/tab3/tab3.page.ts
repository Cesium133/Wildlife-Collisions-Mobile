import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';

import {ModalMapPage} from '../modal-map/modal-map.page';
import { SettingModalPage } from '../setting-modal/setting-modal.page';
import { HttpClient } from '@angular/common/http'
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [ SettingModalPage, ModalMapPage, AppComponent], // ! import AppComponent
  entryComponents: [SettingModalPage, ModalMapPage]
})

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  form:FormGroup;
  showForm: boolean = true;
  showOtherInput: boolean = false;
  pageMessage: String = "Enter a collision";

  sorts = ["Bear", "Cat", "Coyote", "Deer", "Fox", "Raccoon", "Skunk", "Wolf", "Others"];
  genders = ["Male", "Female", "Unknown"];
  ageClasses = ["Juvenile", "Adult", "Senior", "Unknown"];
  
  constructor(public formBuilder:FormBuilder, public geolocation: Geolocation, public router: Router, public httpClient:HttpClient, public modalController: ModalController) {
    this.form = formBuilder.group({
      "species": ["Deer", Validators.required],
      "txtSpecies": [""],
      "reportDate": ["", Validators.required],
      "address": ["", Validators.required],
      "latitude": [""],
      "longitude": [""],
      "gender": ["Unknown", Validators.required],
      "age":["Unknown", Validators.required]
    });

  }

  initializeFields() {
    this.showForm = true;
    this.showOtherInput = false;
    this.pageMessage = "Enter a collision incident";
    let d = new Date();
    this.form.controls.reportDate.setValue(d.toISOString()); 
    this.findCurrentLocation();
  }

  findCurrentLocation(){
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position);
      this.form.controls.latitude.setValue(position.coords.latitude);
      this.form.controls.longitude.setValue(position.coords.longitude);
    }, (error) => {
        this.form.controls.latitude.setValue(38.98);
        this.form.controls.longitude.setValue(-78.94);
        console.log(error);
    })
  }

  ionViewWillEnter() {
    this.initializeFields();
  }

  async openModalMapPage() { // todo: redo code inside this function
    const mapModal = await this.modalController.create({
      component: ModalMapPage,
      componentProps: {
        latitude: this.form.controls.latitude.value,
        longitude: this.form.controls.longitude.value,
        addressRequest: true
      }
    });
    return await mapModal.present();
  }

  insertCollisions() {
    let insert_url = "http://129.2.24.226:8080/mps%20/cheriyan/GEOG650/lab3/insert_collision.php";
    let params = new FormData();

    params.append('species', this.form.controls.species.value);
    params.append('txtSpecies', this.form.controls.txtSpecies.value);
    params.append('rpDate', this.form.controls.reportDate.value);
    params.append('location', this.form.controls.address.value);
    params.append('lat', this.form.controls.latitude.value);
    params.append('lng', this.form.controls.longitude.value);
    params.append('rbGender', this.form.controls.gender.value);
    params.append('rbAge', this.form.controls.age.value);

    console.log(params);
    this.httpClient.post(insert_url, params).subscribe(data => {
      console.log(data);
      this.showForm = false;
      this.pageMessage = "A collision record was inserted successfully";
    })
  }

  onChangeSpecies() {
    if (this.form.controls.species.value === "Others") {
      this.showOtherInput = true;
    }
  }

}
