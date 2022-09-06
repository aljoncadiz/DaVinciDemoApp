import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SecurityService } from '../_services/security.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { VehicleDetailsLTIService } from '../_services/vehicle-details/vehicle-details-lti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  username?: string;

  constructor(
	  private securityService: SecurityService,
	  private vehicleDetailsLTIService: VehicleDetailsLTIService,
	  ) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.securityService.logout();
    // window.location.reload();
  }

  callByAPIGateway() {
	this.vehicleDetailsLTIService.callByAPIGateway().subscribe({
		next: data => {
		},
		error: err => {
		}
	  });
  }

  callByTotalView() {
	this.vehicleDetailsLTIService.callByTotalView().subscribe({
		next: data => {
		},
		error: err => {
		}
	  });
  }
}
