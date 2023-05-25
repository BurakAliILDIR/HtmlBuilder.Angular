import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPageResponse, FindPageResponse, GetPagesResponse, UpdatePageResponse } from '../_responses/page.response';
import { AddPageRequest, UpdatePageRequest } from '../_requests/page.request';

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

  addPage(request: AddPageRequest): Observable<AddPageResponse> {
    return this.http.post<AddPageResponse>(this.baseUrl + "/Pages/Add", request);
  }

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse> {
    return this.http.put<UpdatePageResponse>(this.baseUrl + "/Pages/Update", request);
  }
}
