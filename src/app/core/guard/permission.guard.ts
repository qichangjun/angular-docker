
import { Injectable, Inject } from '@angular/core';
import { Router, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { ROUTER_CODE_LIST } from '../../share/enum/RouterCode.enum';

declare var Cookies: any;
@Injectable()

export class PermissionGuard implements CanActivate {
    constructor(
        // @Inject('UserPermission') private userPermission,
        private _authenticationService: AuthenticationService,
        private router: Router,
    ) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        if (route.data && route.data.code) {            
            if (this._authenticationService.getPermissionList().permissionSet.find(c => c.code == route.data.code)) {
                return true
            } else {
                let code = route.data.code.split(':')
                for (let i = code.length - 1; i >= 0; i--) {
                    let current_code = code.slice(0, i).join(':')
                    let codes = this._authenticationService.getPermissionList().permissionSet.filter((c) => {
                        let permission_code = c.code.split(':').slice(0, i).join(':')
                        return current_code == permission_code
                    }).map(c => c.code)
                    for (let key in ROUTER_CODE_LIST) {
                        let row = codes.find(c => {
                            console.log(c,key)
                            return c == key
                        })                        
                        if (row) {
                            let codes_arr = key.split(':')
                            codes_arr.pop()
                            let parent_code = codes_arr.join(':')
                            let parent = this._authenticationService.getPermissionList().permissionSet.find(c => {
                                return c.code == parent_code
                            })
                            if (!parent && parent_code) {
                                continue
                            }
                            
                            this.router.navigate([ROUTER_CODE_LIST[key]])
                            return false
                        }
                    }
                }
                alert('权限出现错误，请检查配置的权限')
                this._authenticationService.removeAllStorage()
                return false
            }
        }else if (route.data && !route.data.code){
            return true 
        }
        return false
    }

}
