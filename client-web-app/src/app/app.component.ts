import { Component, OnInit } from '@angular/core';
import { MicroServiceService } from './services/micro-service.service';
import { Patient } from './models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'client-web-app';

  constructor(private microService: MicroServiceService) {}

  public patients: Patient[];

  ngOnInit(): void {
    console.log('Retrieving patients...');
    this.microService.getAllPatents().subscribe(data => {
      console.log('Found ' + data.length + ' patients');
      this.patients = data;
    });
  }
}
