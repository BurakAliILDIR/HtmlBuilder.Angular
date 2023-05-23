import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { JwtService } from "../_services/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.jwtService.accessToken;
        request = request.clone({
            setHeaders: {
                Accept: "application/json",
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(request);
    }
}