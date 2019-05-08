import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { GenreAnalyserService } from '../genre-analyser.service';
import {CommiunicationService }  from '../commiunication.service'
import { HttpClient } from '@angular/common/http';

/* Root app for genre analyser. */
@Component({
  selector: 'app-genre-analyser',
  templateUrl: './genre-analyser.component.html',
  styleUrls: ['./genre-analyser.component.css']
})
export class GenreAnalyserComponent implements OnInit, AfterViewInit {

  @ViewChild('audioFile') audioFile?: ElementRef;
  @ViewChild('audioPlayer') audioPlayer?: ElementRef;

  // @ViewChild('fileInput') fileInput;

  constructor(private readonly analyserService: GenreAnalyserService,
    private readonly communicationservice: CommiunicationService,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }
  
//向后端传送文件
  fileToUpload: File = null;
  //前端向后端传文件的相关函数
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFile() {
    const files: FileList = this.audioFile.nativeElement.files;
    if (files.length === 0) {
      return;
    };

    this.communicationservice.parseTable(files).subscribe((data: any) => {
      console.log("发送成功");
    });
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
    this.analyserService.audioChange.next();
  }

  //click
  clickEvent(){
    alert("23");
  }
}
