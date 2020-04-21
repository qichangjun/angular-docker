import { GeneralArchiveSettingRowData } from './../general-archive-setting.interface';
import { categoryOperationComponent } from './grid/categorySetting-operation.grid';
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { ApiUrl } from '../../../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategorySettingService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {
    let params = new HttpParams()
      .set('pageSize',parameter.pageSize)
      .set('currentPage',parameter.currentPage)
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getCategorySettingList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  createCategortSetting(parameter : GeneralArchiveSettingRowData): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.createCategortSetting,parameter, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateCategortSetting(parameter : GeneralArchiveSettingRowData): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.updateCategortSetting,parameter, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteCategorySetting(ids : string[]): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.deleteCategorySetting,ids, { params: params, headers: headers,})
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
        cellRendererFramework: categoryOperationComponent,
        width: 100,
        suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: "名称",
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
        headerName: '',
        field: '',
        minWidth: 50,
        suppressResize: true,
        suppressSorting: true,
      }
    ]}
}
