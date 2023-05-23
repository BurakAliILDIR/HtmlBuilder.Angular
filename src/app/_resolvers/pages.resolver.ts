import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GetPagesResponse } from "../_responses/pages.response";
import { PageService } from "../_services/page.service";


export const getMeetsResolver: ResolveFn<GetPagesResponse> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PageService).getPages();
    };
