import { Component } from '@angular/core';
import { JwtService } from '../_services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private jwtService: JwtService, private router: Router) { }

  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }
}
