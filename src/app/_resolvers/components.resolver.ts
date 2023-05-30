import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { FindComponentRequest } from "../_requests/component.request";
import { ComponentService } from "../_services/component.service";
import { FindComponentResponse } from "../_responses/component.response";

export const FindComponentResolver: ResolveFn<FindComponentResponse> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const request = new FindComponentRequest;

        request.id = route.paramMap.get('id');

        return inject(ComponentService).findComponent(request);
    };
