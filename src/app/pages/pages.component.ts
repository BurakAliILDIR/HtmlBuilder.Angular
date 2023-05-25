import { Component } from '@angular/core';
import { PageService } from '../_services/page.service';
import { GetPagesResponse } from '../_responses/pages.response';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  pages: any;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.getPages().subscribe({
      next: (value: GetPagesResponse) => {
        this.pages = value.data
        console.log(this.pages);
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    });
  }

}
