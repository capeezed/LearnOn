import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  userName: string | null = null;
  userType: string | null = null; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }
}
