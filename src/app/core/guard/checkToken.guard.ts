import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { LoginService } from '../services/login.service';
declare var $:any;
declare var layui:any;
declare var Cookies:any;
declare var window : any;
@Injectable()

export class CheckTokenGuard implements CanActivate {
  constructor(
    private _AuthenticationService : AuthenticationService,
    private router: Router,
    private _LoginService : LoginService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (this._AuthenticationService.getAccessToken()) {
        await this._LoginService.getUserInfoBySSO()
        return true
    }
    this._AuthenticationService.removeAllStorage()      
  }



}
