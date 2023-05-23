import { Page } from "../_models/page.model";

export class GetPagesResponse {
  status: number;
  message: string;
  data: Page[]
}
