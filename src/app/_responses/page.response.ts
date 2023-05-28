import { PageModel } from "../_models/page.model";

export class GetPagesResponse {
  status: number;
  message: string;
  data: PageModel[]
}

export class FindPageResponse {
  status: number;
  message: string;
  data: PageModel
}

export class AddPageResponse {
  status: number;
  message: string;
  data: null
}

export class UpdatePageResponse {
  status: number;
  message: string;
  data: null
}

export class DeletePageResponse {
  status: number;
  message: string;
  data: null
}

