import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable, of } from 'rxjs';
import { pipe, range, timer, zip } from 'rxjs';
import { retryWhen, map, catchError,mergeMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

declare var layui:any;
@Injectable()
export class ResponseHandleService {
  constructor(
    private notification: NzNotificationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * 
   * @param operation 失败的操作名称
   * @param result 返回的失败信息
   */
  public handleObservablError<T>(operation = 'operation', result?: T) {    
    return (error: any): Observable<T> => {            
      let errorData = error.error ? error.error : error  
      this.notification.blank(
        '操作:' + operation,
        errorData.message
      );
      if (errorData.status == 401) {
        if (layui && layui.layer){
          layui.layer.closeAll()
        }  
        this.router.navigate(['/login'], { queryParams: { returnUrl: window.location.href } });
      }
      return of(result as T)
    };
  }

  /**
   * 请求失败后重试
   * @param maxTries 重试次数
   * @param ms 超时多久后重试
   */
  public backoff(maxTries : number, ms : number) {
    return pipe(      
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(          
          map(([i]) => i * i),
          mergeMap(i => timer(i * ms)),          
        )
      )
    );
  }


  public handleError(error: any, panelClass?): Promise<any> {        
    // console.error('An error occurred', error.json()); // for demo purposes only
    let errorData = error.error ? error.error : error    
    this.notification.blank(
      '操作失败',
      errorData.message
    );
    if (errorData.status == 401) {
      setTimeout(()=>{
        if (layui && layui.layer){
          layui.layer.closeAll()
        }  
        let url = window.location.href
        window.localStorage.clear()
        this.router.navigate(['/login'], { queryParams: { returnUrl: window.location.href } });
        // window.location.href = environment.adminUrl + url
      },1000)    
      return Promise.reject(errorData.message || error);
    }
    return Promise.reject(errorData.message || error);
  }

  public extractData(res: any) {        
    let body = res && res.json ? res.json() : res    
    return body
  }

  public extractDataSuccess(res: any) {
    let body = res && res.json ? res.json() : res   
    this.notification.blank(
      '操作成功',
      ''      
    );
    return body
  }

  showMessage(msg,type?) {
    this.notification.blank(
      '',
      msg
    );
  }
}
