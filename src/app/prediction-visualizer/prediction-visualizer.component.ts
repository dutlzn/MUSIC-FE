import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-prediction-visualizer',
  templateUrl: './prediction-visualizer.component.html',
  styleUrls: ['./prediction-visualizer.component.css']
})
export class PredictionVisualizerComponent implements OnInit {
  datainfo: string;
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.httpClient.get(environment.GENERS_INFO).subscribe(data => {
      console.log(data);
      console.log(data['genres']);
      this.datainfo = data['genres'];
    })
  }


}
