import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { workingModelOperationComponent } from './grid/working-model-operation.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkingModelervice {
  constructor(
    private http : Http,
    private _http : HttpClient,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {    
    let params = new HttpParams()
    .set('pageSize',parameter.pageSize)
    .set('currentPage',parameter.currentPage)    ;
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getWorkingModelList, { params: params, headers: headers })
      .toPromise()
      .then(res =>     
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  editWorkingModel(info): Promise<any> {
    let params = new HttpParams()
    .set('id',info.id)
    .set('score',info.score);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.editWorkingModel,info.score, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getListColumn(){
    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        pinnedRowCellRendererParams: { style: { color: "blue" } },
        width: 50
      },
      {
        headerName: "操作",
        field: "",
        cellRendererFramework: workingModelOperationComponent,
        width: 100,
        suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: "模块",
        suppressSorting : true,
        field: "dictionaryName",
        minWidth:80,
        suppressSizeToFit: true
      },
      {
        headerName: "编码",
        suppressSorting : true,
        field: "dictionaryCode",
        minWidth:100,
        suppressSizeToFit: true
      },
      {
        headerName: "说明",
        field: "dictionaryDescription",
        minWidth:300,
        // suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: "总分",
        field: "score",
        minWidth:300,
        suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: '',
        field: '',
        minWidth: 50,
        suppressResize: true,
        suppressSorting: true,
      }
    ]}
}
