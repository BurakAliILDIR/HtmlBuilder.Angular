import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse, ResponseStatusEnum } from 'src/app/_models/base-response.model';
import { AddPageRequest } from 'src/app/_requests/page.request';
import { AddPageResponse } from 'src/app/_responses/page.response';
import { JwtService } from 'src/app/_services/jwt.service';
import { PageService } from 'src/app/_services/page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {

  constructor(private pageService: PageService, private router: Router, private toastr: ToastrService) { }

  addPageForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {

    if (!this.addPageForm.valid)
      return;

    const request = new AddPageRequest;
    request.id = this.addPageForm.value.id;
    request.name = this.addPageForm.value.name;

    this.pageService.addPage(request).subscribe((v: AddPageResponse) => {

      if (v.status === ResponseStatusEnum.success) {
        this.toastr.success(v['message'], "Başarılı!");
        this.router.navigateByUrl('/admin/pages');
      }
    });
  }
}
