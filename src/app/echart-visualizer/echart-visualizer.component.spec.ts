import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartVisualizerComponent } from './echart-visualizer.component';

describe('EchartVisualizerComponent', () => {
  let component: EchartVisualizerComponent;
  let fixture: ComponentFixture<EchartVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
