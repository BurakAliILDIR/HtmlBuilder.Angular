import { Component, OnInit } from '@angular/core';
import { PageModel } from '../../_models/page.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: []
})
export class PreviewComponent implements OnInit {
  page: PageModel;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.data?.subscribe(({ findPage }) => {
      this.page = findPage.data

      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(this.page.css));
      head.appendChild(style);
    });
  }
}
