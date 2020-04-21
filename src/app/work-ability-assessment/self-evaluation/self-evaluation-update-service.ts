import { selfEvaluationInfoRemarksComponent } from './grid/self-evaluation-info-remark.component';
import { QuestItem } from './../../share/component/questItem/questItem.component';
import { selfEvaluationInfoUploadComponent } from './grid/self-evaluation-info-upload.component';
import { selfEvaluationInfoQuestComponent } from './grid/self-evaluation-info-quest.component'
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SelfEvaluationUpdateService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService,
    private message: NzMessageService
  ) { }

  

  updateEvalEventQuest(evalEventQuestLits): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.updateEvalEventQuest,evalEventQuestLits, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  downloadFile(filePath,filename): Promise<any> {
    let params = new HttpParams().set('filePath',filePath);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let message = this.message
      .loading('正在下载文件，请稍等...', { nzDuration: 0 })
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.downloadFile, { params: params, headers: headers, responseType: 'blob' })
      .toPromise()
      .then(res => {        
        let result = {
          blob: res,
          fileName: filename
        }
        var elink = document.createElement('a');
        var blob = new Blob([result.blob]);
        elink.download = result.fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        elink.click();
        this.message.remove(message.messageId)
        return true
      }
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }


}

export interface SelfEvaluationLIstData {
  questList : Array<any>;
  evalEventQuestList : Array<any>;
  group : {
    id : string;
    grpname : string;
  }
}