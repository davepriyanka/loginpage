import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsertApiService {

  private baseUrl:string = "https://localhost:7223/api/Insert/";

  constructor(private http: HttpClient) { }

  getTasks(){    
    return this.http.get<any>(this.baseUrl);    
  }
}
