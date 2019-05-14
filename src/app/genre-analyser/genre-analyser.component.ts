import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { GenreAnalyserService } from '../genre-analyser.service';
import {CommiunicationService }  from '../commiunication.service'
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';


/* Root app for genre analyser. */
@Component({
  selector: 'app-genre-analyser',
  templateUrl: './genre-analyser.component.html',
  styleUrls: ['./genre-analyser.component.css']
})
export class GenreAnalyserComponent implements OnInit, AfterViewInit {
  datainfo: string; //record the genres of the song
  // probility: number[] = [];
  probility = [2.3, 1.8, 0.6, 1.1, 22, 0.7, 0.5, 13, 62, 2 ];
  flag = false;
  chartOption: EChartOption = {};
  /*
    set a value to boolean the song name,to boolean the dataion
    if the right name is not equal the last name,
    then set the value of statusname is ture,
    then in the html wo can judge the value of statusname
    ngIf="statusname"
  */
  statusName: Boolean = false;
  LastName = '';
  rightName = '';


  @ViewChild('audioFile') audioFile?: ElementRef;
  @ViewChild('audioPlayer') audioPlayer?: ElementRef;

  // @ViewChild('fileInput') fileInput;

  constructor(
    private readonly analyserService: GenreAnalyserService,
    private readonly communicationservice: CommiunicationService,
    private httpClient: HttpClient,
    private ref: ChangeDetectorRef
    ) {
      setInterval(() => {
        this.ref.markForCheck();
      },1000)
     }

  ngOnInit() {
  }
  
//向后端传送文件
  fileToUpload: File = null;
  //前端向后端传文件的相关函数
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  changeStatus() {
    this.datainfo = '';
    console.log("改变状态");
  }
  uploadFile() {
    const files: FileList = this.audioFile.nativeElement.files;
    if (files.length === 0) {
      return;
    };

    this.communicationservice.parseTable(files).pipe(
      switchMap((data:any) =>{
        console.log("发送成功");
        return this.httpClient.get('http://127.0.0.1:5000/genres_info');
      }),
      map(data => {
        this.datainfo = data['genres'];
        // let probility
        this.probility = data['probility'];
        console.log(this.probility);
        console.log(this.datainfo);
        this.chartOption = {
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
            data: this.probility ,
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
        // return probility;
        alert("upload file success");
        this.flag = true;
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    // Connect audio player to analyser.
    this.analyserService.connectPlayer(this.audioPlayer);
  }

  /* Change the source of the audio player. */
  audioChange() {
    const audioURL = URL.createObjectURL(this.audioFile.nativeElement.files[0]);
    const player = this.audioPlayer.nativeElement;
    player.src = audioURL;
    player.load();
    // console.log(player);
    //获取音频文件的名字
    this.analyserService.audioName = this.audioFile.nativeElement.files[0].name;
    this.rightName = this.analyserService.audioName;// set the right name
    this.analyserService.audioChange.next();
    this.flag = false;
  }

  //click
  clickEvent(){
    alert("23");
  }



}
