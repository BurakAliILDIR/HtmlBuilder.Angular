import { Component } from '@angular/core';
import { ComponentModel } from '../_models/component.model';
import { ToastrService } from 'ngx-toastr';
import { ComponentService } from '../_services/component.service';
import { DeleteComponentResponse, GetComponentsResponse } from '../_responses/component.response';
import { ResponseStatusEnum } from '../_models/base-response.model';
import { DeleteComponentRequest } from '../_requests/component.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {

  components: ComponentModel[];

  constructor(private componentService: ComponentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getComponents();
  }

  getComponents() {
    this.componentService.getComponents().subscribe((value: GetComponentsResponse) => {
      this.components = value.data
    });
  }


  delete(component: ComponentModel) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: `${component.label} komponentini silmek istediğinize emin misiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E40AF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil'
    }).then((result) => {
      if (result.isConfirmed) {
        const request = new DeleteComponentRequest;

        request.id = component.id;

        this.componentService.deleteComponent(request).subscribe(async (v: DeleteComponentResponse) => {
          if (v.status === ResponseStatusEnum.success) {
            await this.getComponents();
            Swal.fire(
              'Başarıyla silindi!',
              `${component.label} komponentini sildiniz.`,
              'success'
            );
          }
        });

      }
    })
  }


}
