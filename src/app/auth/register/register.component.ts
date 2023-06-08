import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse, ResponseStatusEnum } from 'src/app/_models/base-response.model';
import { JwtService } from 'src/app/_services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private jwtService: JwtService) { }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (v) => (v: BaseResponse) => {
        if(v.status === ResponseStatusEnum.success){
          this.jwtService.setToken(v.data);
          this.toastr.success(v['message'], "Success!");
        }
      },
      complete: () => 
      {
        this.router.navigateByUrl('/admin/pages');
        this.toastr.success('Sign up!', "Success")
      }
  });
  }
}
