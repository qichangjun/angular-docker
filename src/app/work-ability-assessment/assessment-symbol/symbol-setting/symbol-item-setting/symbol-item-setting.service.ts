import { symbolItemOperationComponent } from './grid/symobl-item-operation.grid';
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { ConfigService } from '../../../../core/services/config.service';
import { ResponseHandleService } from '../../../../core/services/responseHandle.service';
import { ApiUrl } from '../../../../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SymbolItemService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getSymbolItemList(parameter): Promise<any> {
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let parentId = parameter.ids.split('*')
    parentId = parentId[parentId.length - 1]
    let params = new HttpParams().set('groupId',parentId)
    .set('currentPage',parameter.currentPage)
    .set('pageSize',parameter.pageSize)
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.getSymbolItemLists,{},
    { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getKindList(parameter): Promise<any> {
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let parentId = parameter.ids.split('*')
    parentId = parentId[parentId.length - 1]
    let params = new HttpParams().set('currentPage',parameter.currentPage)
    .set('pageSize',parameter.pageSize)
    .set('parentId',parentId)
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getKindList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  createQuestItem(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.createQuestItem,info,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateQuestItem(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.updateQuestItem,info,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  createQuestItemScore(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.createQuestItemScore,info,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteKind(idList): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.deleteKind,idList,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteSymbolItem(idList): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.deleteSymbolItem,idList,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  publishQuest(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.publishQuest,{},{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  createKind(parameter): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.createKind,parameter,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  editKind(parameter): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.editKind,parameter,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getQuestItemByQuestId(id): Promise<any> {    
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let params = new HttpParams().set('questId',id)
    .set('currentPage','1')
    .set('pageSize','999') 
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.getQuestItemByQuestId,{},{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getKindColumn(){
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
        cellRendererFramework: symbolItemOperationComponent,
        width: 100,
        suppressSizeToFit: true,
        suppressSorting : true,
      },{
        headerName: "名称",
        suppressSorting : true,
        field: "grpname",
        minWidth:80,
        suppressSizeToFit: true
      },{
        headerName: "描述",
        suppressSorting : true,
        field: "grpdesc",
        minWidth:80,
        suppressSizeToFit: true
      },
      {
        headerName: '',
        field: '',
        minWidth: 50,
        suppressResize: true,
        suppressSorting: true,
      }
    ]
  }

  getListColumn(){
    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        pinnedRowCellRendererParams: { style: { color: "blue" } },
        width: 50,
      },
      {
        headerName: "操作",
        field: "",
        cellRendererFramework: symbolItemOperationComponent,
        width: 100,
        suppressSizeToFit: true,
        suppressSorting : true,
      },{
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",  
        width:120,
        suppressSizeToFit: true,
      },{
        headerName: "评估说明",
        suppressSorting : true,
        field: "questDescription",
        width:180,
        suppressSizeToFit: true,
      },
      {
        headerName: "评分项",
        suppressSorting : true,
        field: "questCategory",
        cellRenderer: (data) => {
          if (!data.data.questItemList){
            return 
          }  
          let el = ''
          data.data.questItemList.forEach(c=>{
            el = el + `<div class="circle--single--data"><i class="fa fa-circle-o" aria-hidden="true"></i><span class="circle--content">${c.itemName}</span></div>`
          })
          el = `<div class="questCategory--data--box">${el}</div>`
          return el
        },
        width:600,  
        autoHeight : true,  
        suppressSizeToFit: true
      },
      {
        headerName: "是否需要证明材料",
        suppressSorting : true,
        field: "questNeedVerify",
        cellRenderer: (data) => {
          let displayName = data.value == 0 ? '否' : '是'
          return `<span >${displayName}  </span>`
        },
        // maxWidth:180,
        // suppressSizeToFit: true,
      },
      // {
      //   headerName: '',
      //   field: '',
      //   width: 10,
      //   suppressResize: true,
      //   suppressSorting: true,
      // }
    ]}
}
