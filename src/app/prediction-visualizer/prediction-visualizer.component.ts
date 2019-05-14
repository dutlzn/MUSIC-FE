import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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
    this.httpClient.get('http://127.0.0.1:5000/genres_info').subscribe(data => {
      console.log(data);
      console.log(data['genres']);
      this.datainfo = data['genres'];
    })
  }

  // geners_info() {
  //   this.httpClient.get('http://127.0.0.1:5000/genres_info').subscribe(data => {
  //     console.log(data);
  //     console.log(data['genres']);
  //     this.datainfo = data['genres'];
  //   })
  // }

}
