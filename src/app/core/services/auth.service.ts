import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { ConfigService } from './config.service';
import { ResponseHandleService } from './responseHandle.service';

declare var layui:any;
declare var Cookies: any;
@Injectable()

export class AuthenticationService {
    constructor(
        private http: Http,
        private router: Router,
        private _configService: ConfigService,
        private _responseHandleService: ResponseHandleService
    ) { }

    /**
     * 
     */
    getCurrentUser() {
        return Cookies.getJSON(environment.cookieName + '_current_user') || {}
    }

    setCurrentUser(user) {
        let cookiePara = { expires: 999 }
        Cookies.set(environment.cookieName + '_current_user', user, cookiePara);
    }

    /**
     * 
     * @param user 
     */
    setUserInfo(user) {
        let cookiePara = { expires: 999 }
        Cookies.set(environment.cookieName + 'user_info', user, cookiePara);
    }

    saveLoginInfo(userInfo,unitInfo,permissionList) {
        let cookiePara = { expires: 999 }
        // Cookies.set('accessToken', info.accessToken, cookiePara);
        window.localStorage.setItem(environment.cookieName + 'user', JSON.stringify(userInfo))
        window.localStorage.setItem(environment.cookieName + 'unit', JSON.stringify(unitInfo))
        window.localStorage.setItem(environment.cookieName + 'teamwork_permissionList',JSON.stringify(permissionList))
        this.router.navigate([''])
    }

    saveLoginToken(info){
        let cookiePara={ expires: 999 }
        Cookies.set('accessToken', info.accessToken, cookiePara);                  
        window.location.href = environment.teamworkUrl
    }

    removeAllStorage() {
        if (layui && layui.layer){
            layui.layer.closeAll()
        }  
        let url = window.location.href
        window.localStorage.clear()
        this.router.navigate(['/login'])              
    }

    getAccessUser() {
        return null
    }

    getAccessToken() {
        return Cookies.getJSON('accessToken')
    }

    getLibraryArchivalFolder() {
        let info = window.localStorage.getItem(environment.cookieName + 'libraryArchivalFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getlibraryFileFolderr() {
        let info = window.localStorage.getItem(environment.cookieName + 'libraryFileFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getfileRetrieval() {
        let info = window.localStorage.getItem(environment.cookieName + 'fileRetrieval')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getappraisalTaskFolder() {
        let info = window.localStorage.getItem(environment.cookieName + 'appraisalTaskFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getreceiveManagementLibraryFolder(){
        let info = window.localStorage.getItem(environment.cookieName + 'receiveManagementLibraryFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getsubjectFolder() {
        let info = window.localStorage.getItem(environment.cookieName + 'subjectFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getwarehouseFolder(){
        let info = window.localStorage.getItem(environment.cookieName + 'warehouseFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getUsingFolder(){
        let info = window.localStorage.getItem(environment.cookieName + 'usingFolder')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }
    getPermissionList() {
        let info = window.localStorage.getItem(environment.cookieName + 'teamwork_permissionList')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }

    getUnitInfo() {
        let info = window.localStorage.getItem(environment.cookieName + 'unit')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }

    getUserInfo() {
        let info = window.localStorage.getItem(environment.cookieName + 'user')
        if (info && info != 'undefined') {
            return JSON.parse(info)
        }
        return {}
    }

    getUserRoleName() {
        let info = window.localStorage.getItem(environment.cookieName + 'user')
        if (info && info != 'undefined') {
            let user_info = JSON.parse(info)
            let roleName = user_info.roleName
            if (roleName == 'da_superuser_role') {
                return 'da_superuser_role'
            } else {
                let roleName_Split = roleName.split('_')
                if (roleName_Split[roleName_Split.length - 1] == 'admin') {
                    return 'admin'
                } else if (roleName.indexOf('data_management') >= 0) {
                    return 'data_management'
                } else if (roleName_Split[roleName_Split.length - 1] == 'user') {
                    return 'user'
                } else if (roleName_Split[roleName_Split.length - 1] == 'auditor') {
                    return 'auditor'
                } else {
                    return ''
                }
            }
        } else {
            return ''
        }
    }
}
