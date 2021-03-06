// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ElementRef, state,style,animate,transition, trigger, keyframes } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { SessionService } from '../services/session.service';
import { TravelplansService } from '../services/travelplans.service';
import 'rxjs/add/operator/toPromise';


declare var require: any

declare var $:any;

@Component({
  selector: 'app-new-travelplan',
  templateUrl: './new-travelplan.component.html',
  styleUrls: ['./new-travelplan.component.css'],
  providers:[ SessionService, TravelplansService ]
})
export class NewTravelplanComponent implements OnInit {

  public newTravelPlan: Object;
  public name: String;
  public country: String;
  public city: String;
  public startDate = new Date();
  public endDate = new Date();
  public transportation: String;
  public accomodation = {
    acAddress: '',
    expense: ''
  };
  constructor(
    private myRoute: ActivatedRoute,
    private myTravelplansService: TravelplansService,
    private myRouter: Router
  ) { }

  ngOnInit() {
    this.myRoute.params
        .subscribe((params) => this.newTravelPlan = {} );

  }

  createNewTravelPlan(formData){
    console.log(formData);
    this.name = formData.form.controls.formTpName._value;
    this.country = formData.form.controls.formCountry._value;
    this.city = formData.form.controls.formCity._value;
    this.startDate = formData.form.controls.formStart._value;
    this.endDate = formData.form.controls.formEnd._value;
    this.transportation = formData.form.controls.formTransportation._value;
    this.accomodation.acAddress = formData.form.controls.formAccAddr._value;
    this.accomodation.expense = formData.form.controls.formAccExpense._value;
    this.sendNewTravelPlanToApi();
  }
  sendNewTravelPlanToApi(){
    this.newTravelPlan = {
      name: this.name,
      country:this.country,
      city: this.city,
      startDate: this.startDate,
      endDate: this.endDate,
      transportation: this.transportation,
      // this.accomodation["address"] is the same as this under
      acAddress: this.accomodation.acAddress,
      expense: this.accomodation.expense
    }
    this.myTravelplansService.createNew(this.newTravelPlan).then(()=>{
      this.name = "";
      this.country = "";
      this.city = "";
      this.startDate = new Date();
      this.endDate = new Date();
      this.transportation = "";
      this.accomodation["acAddress"] = "";
      this.accomodation["expense"] = "";
      this.newTravelPlan = {};
      this.myRouter.navigate(['/travelplans'])
    })
      .catch(()=>{})
  }

}
