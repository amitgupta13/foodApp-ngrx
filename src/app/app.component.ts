import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyB_l_OMzTAEbWF9_sShrSiqsz6FEAiSyYA",
      authDomain: "http-8a947.firebaseapp.com",
      // databaseURL: "https://http-8a947.firebaseio.com",
      // projectId: "http-8a947",
      // storageBucket: "http-8a947.appspot.com",
      // messagingSenderId: "535215513105",
    })
  }

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
