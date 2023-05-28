import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatusEnum } from 'src/app/_models/base-response.model';
import { AddComponentRequest } from 'src/app/_requests/component.request';
import { AddComponentResponse } from 'src/app/_responses/component.response';
import { ComponentService } from 'src/app/_services/component.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent {

  constructor(private componentService: ComponentService, private router: Router, private toastr: ToastrService) { }


  addComponentForm = new FormGroup({
    label: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onSubmit() {
    const request = new AddComponentRequest;
    request.label = this.addComponentForm.value.label;
    request.category = this.addComponentForm.value.category;
    request.content = this.addComponentForm.value.content;

    this.componentService.addComponent(request).subscribe({
      next: (v: AddComponentResponse) => {
        if (v.status === ResponseStatusEnum.success) {

          this.toastr.success(v['message'], "Success!");
        }
      },
      error: (e) => this.toastr.error(e.error.Data?.Message, e.error?.Message),
      complete: () => {
        this.router.navigateByUrl('/components');
      }
    });
  }
}
