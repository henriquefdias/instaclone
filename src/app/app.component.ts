import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instaclone';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyDPhEnCKweNeQoH8rinRRsBPLyHduz6ukM",
      authDomain: "jta-instaclone-6f433.firebaseapp.com",
      projectId: "jta-instaclone-6f433",
      storageBucket: "jta-instaclone-6f433.appspot.com",
      messagingSenderId: "109352664265",
      appId: "1:109352664265:web:99c01ac9cbcbad4f0be118"
    };
    firebase.default.initializeApp(firebaseConfig)
  }
}
