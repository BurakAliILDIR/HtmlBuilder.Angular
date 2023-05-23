import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userId: string = "";
  token: string = "";

  constructor(private authService: AuthService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.userId = params['userId'];
        this.token = params['token'];
      });
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  onSubmit() {

    const data = {
      userId: this.userId,
      token: this.token,
      ...this.resetPasswordForm.value
    }

    this.authService.resetPassword(data).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.toastr.error(e.error.Data.Message, e.error.Message),
      complete: () => this.toastr.success('Reseted password.', "Success")
    });
  }
}
