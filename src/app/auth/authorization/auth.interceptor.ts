import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private authService: AuthorizationService, private router: Router, private jwtDecoder: JwtHelperService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === "True") {
            return next.handle(req.clone());
        }

        const token = this.authService.getToken();
        const isTokenExpired = this.jwtDecoder.isTokenExpired(token);
        req = this.addToken(req, token!);

        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    console.log(error);
                    if (error.status == 401) {
                        this.router.navigate(['']);
                    }
                    if (error.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError(() => error.error);
                }
            )
        )

    }


    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

}