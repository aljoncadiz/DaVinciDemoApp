import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIGATEWAY_URL, DAVINCIAPI_URL, TOTALVIEW_API_URL } from '../../_contants/api.constants';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsLTIService {
  constructor(
	  	private http: HttpClient
	  ) { }

	  reqBody = {"MerchantsInventoryVehicleId":"809003","CustomerId":122428,"FleetName":"City Electric","Vin":"1FTEW1EB5MKF05675","InsuranceProvider":"","State":"MA"}

	  callByAPIGateway(): Observable<any> {
		return this.http.post(APIGATEWAY_URL + 'DaVinci/vehicledetails/lti/summary', this.reqBody, httpOptions);
	  }

	  callByTotalView(): Observable<any> {
		return this.http.post(TOTALVIEW_API_URL + 'vehicledetails/lti/summary', this.reqBody, httpOptions);
	  }
}