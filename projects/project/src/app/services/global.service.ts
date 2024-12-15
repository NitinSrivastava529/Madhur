import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from '../Model/constant';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:7284/' : 'http://api.madhuraastha.com/';
  rootUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:4200/' : 'http://madhuraastha.com/';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Accept-Control-Allow-Origin', '*')
  constructor(private http: HttpClient) { }
  post(data: any): Observable<any> {
    return this.http.post(this.baseUrl + data.url, data, { headers: this.headers });
  }
  UploadFile(url: string, data: any): Observable<any> {
    return this.http.post(CONSTANT.API_URL + url, data, { responseType: 'text' });
  }
  get(data: any): Observable<any> {
    return this.http.get(this.baseUrl + data.url, data);
  }
  calAge(dob_year: string, dob_month: string, dob_day: string) {
    debugger
    var month = (new Date().getMonth() + 1); const day = (new Date().getDate());
    const date = (new Date().getFullYear()) + '' + (month < 10) ? '0' + month : month + '' + (day < 10) ? '0' + day : day;
    const dob = (dob_year) + (dob_month) + (dob_day);
    // const age = String(parseFloat(date) - parseFloat(dob));
    // return parseInt(age.substring(2, 0));
    return 13
  }
  public loadScript() {
    const jsArray = [
      '/js/jquery.min.js',
      '/js/materialize.min.js',
      '/lib/owlcarousel/owl.carousel.min.js',
      '/lib/Magnific-Popup-master/dist/jquery.magnific-popup.js',
      '/lib/slick/slick/slick.min.js',
      '/js/custom.js'
    ];
    for (let i = 0; i < jsArray.length; i++) {
      let node = document.createElement('script');
      node.src = jsArray[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}

