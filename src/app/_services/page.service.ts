import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPageResponse, DeletePageResponse, FindPageResponse, GetPagesResponse, UpdatePageResponse } from '../_responses/page.response';
import { AddPageRequest, DeletePageRequest, FindPageRequest, UpdatePageRequest } from '../_requests/page.request';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPages(): Observable<GetPagesResponse> {
    return this.http.get<GetPagesResponse>(this.baseUrl + "/Pages");
  }

  findPage(request: FindPageRequest): Observable<FindPageResponse> {
    return this.http.get<FindPageResponse>(this.baseUrl + "/Pages/" + request.id);
  }

  addPage(request: AddPageRequest): Observable<AddPageResponse> {
    return this.http.post<AddPageResponse>(this.baseUrl + "/Pages", request);
  }

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse> {
    return this.http.put<UpdatePageResponse>(this.baseUrl + "/Pages", request);
  }

  deletePage(request: DeletePageRequest): Observable<DeletePageResponse> {
    return this.http.delete<DeletePageResponse>(this.baseUrl + "/Pages/" + request.id);
  }
}
