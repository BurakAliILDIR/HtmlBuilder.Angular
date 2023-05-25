import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseResponse, ResponseStatusEnum } from 'src/app/_models/base-response.model';
import { JwtService } from 'src/app/_services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private jwtService: JwtService) { }

  loginForm = new FormGroup({
    usernameOrEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (v: BaseResponse) => {
        if(v.status === ResponseStatusEnum.success){
          this.jwtService.setToken(v.data);
          this.toastr.success(v['message'], "Success!");
        }
      },
      error: (e) => this.toastr.error(e.error.Data.Message, e.error.Message),
      complete: () => {
        this.router.navigateByUrl('/');
      }
    });
  }
}
