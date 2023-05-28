import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FindComponentRequest, AddComponentRequest, UpdateComponentRequest, DeleteComponentRequest } from "../_requests/component.request";
import { GetComponentsResponse, FindComponentResponse, AddComponentResponse, UpdateComponentResponse, DeleteComponentResponse } from "../_responses/component.response";

@Injectable({
    providedIn: 'root'
  })
  export class ComponentService {
    private baseUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
    getComponents(): Observable<GetComponentsResponse> {
      return this.http.get<GetComponentsResponse>(this.baseUrl + "/Components");
    }
  
    findComponent(request: FindComponentRequest): Observable<FindComponentResponse> {
      return this.http.get<FindComponentResponse>(this.baseUrl + "/Components/" + request.id);
    }
  
    addComponent(request: AddComponentRequest): Observable<AddComponentResponse> {
      return this.http.post<AddComponentResponse>(this.baseUrl + "/Components", request);
    }
  
    updateComponent(request: UpdateComponentRequest): Observable<UpdateComponentResponse> {
      return this.http.put<UpdateComponentResponse>(this.baseUrl + "/Components", request);
    }
  
    deleteComponent(request: DeleteComponentRequest): Observable<DeleteComponentResponse> {
      return this.http.delete<DeleteComponentResponse>(this.baseUrl + "/Components/" + request.id);
    }
  }
  