import { Component, OnInit } from '@angular/core';
import { Page } from '../_models/page.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  page: Page;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.data?.subscribe(({ findPage }) => {
      this.page = findPage.data
      console.table(this.page);
    });
  }
}
