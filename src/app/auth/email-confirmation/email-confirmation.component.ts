import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        this.authService.emailConfirmation({
          userId: params['userId'],
          token: params['token'],
        }).subscribe({
          next: (v) => console.log(v),
          error: (e) => this.toastr.error(e.error.Data.Message, e.error.Message),
          complete: () => this.toastr.success('Email confirmed!', "Success")
        });
      });
  }
}
