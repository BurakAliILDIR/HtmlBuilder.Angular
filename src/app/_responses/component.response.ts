import { ComponentModel } from "../_models/component.model";

export class GetComponentsResponse {
    status: number;
    message: string;
    data: ComponentModel[]
  }
  
  export class FindComponentResponse {
    status: number;
    message: string;
    data: ComponentModel
  }
  
  export class AddComponentResponse {
    status: number;
    message: string;
    data: null
  }
  
  export class UpdateComponentResponse {
    status: number;
    message: string;
    data: null
  }
  
  export class DeleteComponentResponse {
    status: number;
    message: string;
    data: null
  }
  