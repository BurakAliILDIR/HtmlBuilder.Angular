import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  forgotPasswordForm = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (v) => console.log(v),
      complete: () => this.toastr.success('Send reset password mail.', "Success")
    });
  }
}
