import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { scoreProgressComponent } from './grid/score-progress.component';
import { scoreNameComponent } from './grid/score-name.component';
import { scoreOperationComponent } from './grid/score-operation.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScoreOrderService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {    
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    let params = new HttpParams().set('pageSize',parameter.pageSize)
    .set('currentPage',parameter.currentPage)
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.getScoreOrderList,{
      pageSize : parameter.pageSize,
      currentPage : parameter.currentPage
    }, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getAllUnitMap(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getAllUnitMap, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getUnitNumberInfo(cat): Promise<any> {
    let params = new HttpParams().set('cat',cat);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())      
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnitNumberInfo, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
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
        headerName: "单位名称",
        suppressSorting : true,
        field: "unitName",
        minWidth:240,
        cellRendererFramework : scoreNameComponent,        
      },{
        headerName: "指标得分排名",
        suppressSorting : true,
        field: "index",
        minWidth:200,
        // suppressSizeToFit: true        
      },
      {
        headerName: "指标评估得分",
        suppressSorting : true,
        field: "questScoreSum",
        minWidth:400,
        // suppressSizeToFit: true,
        cellRendererFramework : scoreProgressComponent,
      },

      {
        headerName: '',
        field: '',
        minWidth: 10,
        suppressResize: true,
        suppressSorting: true,
      }
      ,
      {
        headerName: "操作",
        suppressSorting : true,
        field: "",
        minWidth:200,   
        cellRendererFramework : scoreOperationComponent
      }
      // {
      //   headerName: "综合归档计划",
      //   field: "presScoreSum",
      //   minWidth:300,
      //   suppressSizeToFit: true,
      //   suppressSorting : true,
      //   cellRendererFramework : scoreProgressComponent,
      // },
      // {
      //   headerName: "总得分",
      //   field: "finalScoreSum",
      //   minWidth:300,
      //   suppressSizeToFit: true,
      //   suppressSorting : true,
      //   cellRendererFramework : scoreProgressComponent,
      // },
      
    ]}
}
