import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { GenreAnalyserService } from '../genre-analyser.service';
import {CommiunicationService }  from '../commiunication.service'
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-echart-visualizer',
  templateUrl: './echart-visualizer.component.html',
  styleUrls: ['./echart-visualizer.component.css']
})
export class EchartVisualizerComponent implements OnInit {
  data: number[];
  constructor(
    private readonly analyserService: GenreAnalyserService,
    private readonly communicationservice: CommiunicationService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }
  //向后端传送文件
  fileToUpload: File = null;
  //前端向后端传文件的相关函数
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  getProbility(){
    this.httpClient.get('http://127.0.0.1:5000/genres_info').subscribe( data =>{
      this.data = data['probility'];
      console.log(this.data);
    });
  }

  chartOption: EChartOption = {
    title: {
      text: 'Music genre prediction probability',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    xAxis: {
      type: 'category',
      data: ['metal', 'disco', 'classical', 'hiphop', 'jazz', 'country', 'pop', 'blues', 'reggae', 'rock'],
      silent: false,
      splitLine: {
        show: false
      },
      color: '#ccc',
      axisLabel : {
        show:true,
        interval: 'auto',    // {number}
        rotate: 45,
        margin: 8,
        formatter: '{value}',
        textStyle: {
            color: 'blue',
            fontFamily: 'sans-serif',
            fontSize: 17,
            fontStyle: 'italic',
            fontWeight: 'bold'
        }
    },
    },
    tooltip: {},
    yAxis: {
                  axisLabel : {
                show:true,
                interval: 'auto',    // {number}
                rotate: -45,
                margin: 18,
                formatter: '{value}',    // Template formatter!
                textStyle: {
                    color: '#1e90ff',
                    fontFamily: 'verdana',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 'bold'
                }
            },
    },
    series: [{
      // data: [2.3, 1.8, 0.6, 1.1, 22, 0.7, 0.5, 13, 62, 2 ],
      data: this.data,
      // data: this.probility,
      type: 'bar',
      itemStyle: {
        normal: {
          color: 'rgb(84,170,88)',
        },
      },
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: /* istanbul ignore next */ (idx: number) => {
      return idx * 50;
    },
  };
}
