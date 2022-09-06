import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
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

  isAuthenticated: boolean = false;

  constructor(
	  private securityService: SecurityService,
	  private vehicleDetailsLTIService: VehicleDetailsLTIService,
	  private authService: OktaAuthService,
	  private oktaAuthService: OktaAuthService
	  ) { }

   async ngOnInit() {
	this.isAuthenticated = await this.authService.isAuthenticated();
	if(this.isAuthenticated){
		const userClaims = await this.authService.getUser();
		this.username = userClaims.name || "";
	  }
  }

  logout(): void {
    this.securityService.logout();
	// this.oktaAuthService.tokenManager.clear();
	this.oktaAuthService.signOut();
    //window.location.reload();
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
