import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FindPageResponse, GetPagesResponse } from '../_responses/pages.response';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPages(): Observable<GetPagesResponse> {
    return this.http.get<GetPagesResponse>(this.baseUrl + "/Pages/Get");
  }

  findPage(id: string): Observable<FindPageResponse> {
    return this.http.get<FindPageResponse>(this.baseUrl + "/Pages/Find/" + id);
  }
}
