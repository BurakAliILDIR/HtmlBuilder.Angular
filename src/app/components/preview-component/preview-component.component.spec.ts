import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewComponentComponent } from './preview-component.component';

describe('PreviewComponentComponent', () => {
  let component: PreviewComponentComponent;
  let fixture: ComponentFixture<PreviewComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewComponentComponent]
    });
    fixture = TestBed.createComponent(PreviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
