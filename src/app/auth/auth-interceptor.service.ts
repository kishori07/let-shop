import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("Interception In Progress"); // Interception Stage
    const token= JSON.parse(sessionStorage.getItem('token'));
    const adminToken =  JSON.parse(sessionStorage.getItem('adminToken'));
    // This retrieves a token from local storage
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      req = req.clone({ headers: req.headers.set("Cache-Control" , "no-cache, must-revalidate") });
    }
    // This clones HttpRequest and Authorization header with Bearer token added
    else if (adminToken)  {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + adminToken) });
      req = req.clone({ headers: req.headers.set("Cache-Control" , "no-cache, must-revalidate") });
      // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data') });

    }
  
    
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                // Catching Error Stage
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
                }
                // const err = error.error.message || error.statusText;
                return throwError(error); // any further errors are returned to frontend                    
           })
        );
    // throw new Error('Method not implemented.');
  }
 
}
