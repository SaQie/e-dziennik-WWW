import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthorizationService } from "../services/authorization.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private authService: AuthorizationService, private router: Router) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === "True") {
            return next.handle(req.clone());
        }

        const token = this.authService.getToken();
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
                    return throwError(() => "something went wrong");
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