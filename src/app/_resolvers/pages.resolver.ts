import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { FindPageResponse, GetPagesResponse } from "../_responses/page.response";
import { PageService } from "../_services/page.service";


export const FindPageResolver: ResolveFn<FindPageResponse> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PageService).findPage(route.paramMap.get('id'));
    };
