import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // baseUrl:string='http://api.madhuraastha.com/';
  baseUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:7284/' : 'http://api.madhuraastha.com/';
  rootUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:4200/' : 'http://madhuraastha.com/';
  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
     header = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    });
  constructor(private http: HttpClient) { }
  post(data: any): Observable<any> {
    return this.http.post(this.baseUrl + data.url, data, { headers: this.headers });
  }
  UploadFile(url:string,data: any): Observable<any> {             
    return this.http.post(this.baseUrl + url, data);
  }
  put(url: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + url, data, { headers: this.headers });
  }
  get(data: any): Observable<any> {
    return this.http.get(this.baseUrl + data.url, data);
  }

  public loadScript() {
    const jsArray = [
      '/code.jquery.com/jquery-3.4.1.min.js',
      '/cdn.jsdelivr.net/npm/bootstrap%405.0.0/dist/js/bootstrap.bundle.min.js',
      '/lib/chart/chart.min.js',
      '/lib/easing/easing.min.js',
      '/lib/waypoints/waypoints.min.js',
      '/lib/owlcarousel/owl.carousel.min.js',
      '/lib/tempusdominus/js/moment.min.js',
      '/lib/tempusdominus/js/moment-timezone.min.js',
      '/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js',
      '/js/main.js'
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
