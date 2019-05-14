import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { GenreAnalyserComponent } from './genre-analyser/genre-analyser.component';
import { WaveformVisualizerComponent } from './waveform-visualizer/waveform-visualizer.component';
import { FrequencyVisualizerComponent } from './frequency-visualizer/frequency-visualizer.component';
import { SegmentsVisualizerComponent } from './segments-visualizer/segments-visualizer.component';
import { PredictionVisualizerComponent } from './prediction-visualizer/prediction-visualizer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";


import {NgxEchartsModule} from 'ngx-echarts';
import { EchartVisualizerComponent } from './echart-visualizer/echart-visualizer.component'

@NgModule({
  declarations: [
    AppComponent,
    GenreAnalyserComponent,
    WaveformVisualizerComponent,
    FrequencyVisualizerComponent,
    SegmentsVisualizerComponent,
    PredictionVisualizerComponent,
    EchartVisualizerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,

    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
