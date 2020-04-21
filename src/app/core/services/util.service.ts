import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';
import * as _ from 'lodash';
@Injectable()
export class UtilService {
    constructor(
        public snackBar: MatSnackBar
    ) { }
    isArrRepeat(arr) {
        let len = arr.length
        let out = []
        let counts = {}
        let i = 0
        while (i < len) {
            var item = arr[i]
            counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1
            if (counts[item] == 2) {
                out.push(item)
            }
            i++
        }
        return out.length == 0
    }

    hasEmpty(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                console.log(true)
                return true
            }
        }
        return false
    }


    sortArrBy(name) {
        return function (o, p) {
            var a, b;
            a = void 0;
            b = void 0;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    if (a < b) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (typeof a < typeof b) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                throw 'error';
            }
        };
    };

    formatModuleArray(value) {
        value = value || []
        value = _.castArray(value);
        return value
    }

    dateFtt(fmt, date) { //author: meizz   
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    showMessage(message,duration){
        this.snackBar.open(message,'关闭', {
            duration: duration,
            verticalPosition : 'top'
          })
    }

    formatDate(date : Date){
        if (!(date instanceof Date) || date.toString() == 'Invalid Date'){
            return null 
        }
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${year}-${month}-${day}`
    }
}
