import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class PatientGuard implements CanActivate {

    constructor(private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(localStorage.getItem('jwt') === null || !state.url.includes(JSON.parse(localStorage.getItem('currentUser') || '{}')?.role)) {
            localStorage.removeItem('jwt')
            localStorage.removeItem('currentUser')
            alert('You are not authorized to access this page')
            this.router.navigate(['landing']);
            return false;
        }
        return true;
    }
    // || !localStorage.getItem('currentUser') || 
    //     JSON.parse(localStorage.getItem('currentUser') || '{}')?.loginType !== 0
}