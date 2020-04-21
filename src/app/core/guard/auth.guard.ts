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

export class AuthGuard implements CanActivate {
  constructor(
    private _AuthenticationService : AuthenticationService,
    private router: Router,
    private _LoginService : LoginService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (this._AuthenticationService.getAccessToken()) { 
      if (!this._AuthenticationService.getUserInfo().id || !this._AuthenticationService.getPermissionList().userCode){
        try{
          await this.getAuthInfo()
          return true;
        }catch(err){
          console.log(err)
          this._AuthenticationService.removeAllStorage()   
          return false 
        }  
      }else{                
        this.getChatJs() 
        return true 
      }               
    } else{           
      this._AuthenticationService.removeAllStorage()  
      return false;
    }
  }

  async getAuthInfo(){
    return new Promise((resolve)=>{
      Promise.all([this._LoginService.getUserInfoBySSO(),
        this._LoginService.getUnitInfo(),
        this._LoginService.getPermissionList()    
      ]).then(async (res)=>{        
        let info = Object.assign({},res[0])
        this._AuthenticationService.saveLoginInfo(info,res[1],res[2])               
        this.getChatJs()  
        resolve(true)
      })
    })
    
  }


  getChatJs(){   
    $.getScript('../im/layim/im.js',function(){      
      setTimeout(()=>{    
        let isClose : boolean = false 
        let layim_cache = window.localStorage.getItem('layim')           
        if (layim_cache){          
          layim_cache = JSON.parse(layim_cache)          
          for (let key in layim_cache){
            if (layim_cache[key] && layim_cache[key].close){
              isClose = true  
            }
          }
          if (!isClose){
            $('.layui-layer-close1')[0].click()
          }
        }       
      },1000)  
    });
  }
}
