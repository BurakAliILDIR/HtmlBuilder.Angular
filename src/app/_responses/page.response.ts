import { Page } from "../_models/page.model";

export class GetPagesResponse {
  status: number;
  message: string;
  data: Page[]
}

export class FindPageResponse {
  status: number;
  message: string;
  data: Page
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
