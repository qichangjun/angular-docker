import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { generalOrderProgressComponent } from './grid/general-order-progress.component';
import { generalOrderNameComponent } from './grid/general-order-name.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class generalArchiveOrderService {
  constructor(
    private http : Http,
    private _http : HttpClient,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

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
        minWidth:150,
        // suppressSizeToFit: true,
        cellRendererFramework : generalOrderNameComponent
      },{
        headerName: "保管期限评分排名",
        suppressSorting : true,
        field: "index",
        minWidth:200,
        // suppressSizeToFit: true        
      },
      {
        headerName: "保管期限评分",
        suppressSorting : true,
        field: "presScoreSum",
        minWidth:300,
        // suppressSizeToFit: true,
        cellRendererFramework : generalOrderProgressComponent,
      },
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
      {
        headerName: '',
        field: '',
        minWidth: 50,
        suppressResize: true,
        suppressSorting: true,
      }
    ]}
}
