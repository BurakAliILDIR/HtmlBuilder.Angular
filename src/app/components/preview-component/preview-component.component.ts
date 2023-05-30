import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentModel } from 'src/app/_models/component.model';

@Component({
  selector: 'app-preview-component',
  templateUrl: './preview-component.component.html',
  styleUrls: ['./preview-component.component.css']
})
export class PreviewComponentComponent {
  
  component: ComponentModel;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.data?.subscribe(({ findComponent }) => {
      this.component = findComponent.data
      console.table(this.component);
    });
  }
}
