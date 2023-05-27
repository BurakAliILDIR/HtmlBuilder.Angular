import { Component } from '@angular/core';
import { PageService } from '../_services/page.service';
import { DeletePageResponse, GetPagesResponse } from '../_responses/page.response';
import Swal from 'sweetalert2'
import { Page } from '../_models/page.model';
import { DeletePageRequest } from '../_requests/page.request';
import { ResponseStatusEnum } from '../_models/base-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  pages: any;

  constructor(private pageService: PageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    this.pageService.getPages().subscribe({
      next: (value: GetPagesResponse) => {
        this.pages = value.data
        console.log(this.pages);
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    });
  }

  delete(page: Page) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: `${page.name} sayfasını silmek istediğinize emin misiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E40AF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil'
    }).then((result) => {
      if (result.isConfirmed) {
        const request = new DeletePageRequest;

        request.id = page.id;


        this.pageService.deletePage(request).subscribe({
          next: (v: DeletePageResponse) => {
            if (v.status === ResponseStatusEnum.success) {
              Swal.fire(
                'Başarıyla silindi!',
                `${page.name} sayfasını sildiniz.`,
                'success'
              );
            }
          },
          error: (e) => this.toastr.error(e.error.Data.Message, e.error.Message),
          complete: async () => {
            await this.getPages();
          }
        });
        
      }
    })
  }

}
