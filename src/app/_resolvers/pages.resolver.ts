import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { FindPageResponse, GetPagesResponse } from "../_responses/page.response";
import { PageService } from "../_services/page.service";
import { FindPageRequest } from "../_requests/page.request";


export const FindPageResolver: ResolveFn<FindPageResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const request = new FindPageRequest;

    request.id = route.paramMap.get('id');

    return inject(PageService).findPage(request);
};
