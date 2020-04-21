import { ResponseHandleService } from './../../../core/services/responseHandle.service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../../core/services/event.service';
import { SelfEvaluationUpdateService } from '../self-evaluation-update-service';

@Component({
    selector: 'symbol-info-upload-grid',
    template: `
    <div class="grid--name--column upload--box">     
        <a  [hidden]="params.data.sts != 0 && !uploader.isUploading && params.data.sts != 3" mat-flat-button color="primary" class="mat-menu-item__button fileinput-button">
            <input multiple type="file" ng2FileSelect [uploader]="uploader" />
            上传  
        </a>   
        <div>
        <ul >
            <li *ngFor="let file of params.data.evalEventFileList;let i = index" class="file--name--box"
            [ngClass]="{'no-upload-button':params.data.sts != 0 && !uploader.isUploading && params.data.sts != 3}" 
            >
                <img class="file--type--icon" onerror="this.src='assets/images/icon/unknown.svg'" src="./assets/images/icon/{{file['filename'] | fileNameToIcon}}.svg"
                alt=""> 
                <a (click)="downloadFile(file)" class="file--name">{{file.filename}}</a>
                <span class="option--box" 
                *ngIf="(params.data.sts == '0' || params.data.sts == '3') && file.id"  
                nz-popconfirm
                nzOkText="确定"
                nzCancelText="取消"
                nzTitle="确定要删除该文件吗?"
                nzPopconfirmPlacement="bottom"
                (nzOnConfirm)="deleteEvaluationFile(file,i)"
                 title="删除">
                    <i class="ti-close" aria-hidden="true"></i>  
                </span>              
            </li>
        </ul></div> 
        
    </div>
    `
})
export class selfEvaluationInfoUploadComponent implements ICellRendererAngularComp {
    public params: any;
    public uploader
    constructor(
        private _ResponseHandleService : ResponseHandleService,
        private _AuthenticationService : AuthenticationService,
        private _ConfigService : ConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private _EventService: EventService,
        private _SelfEvaluationUpdateService : SelfEvaluationUpdateService
    ){

    }
    agInit(params: any): void {
        this.params = params;
        this.uploader = new FileUploader({
            autoUpload: true,
            url: this._ConfigService.teamrowkApiUrl() + ApiUrl.uploadAccessory ,            
            headers : [
                {name : 'accessToken',value : this._AuthenticationService.getAccessToken()}
              ]
            ,additionalParameter: {    
                id : this.params.data.evalEventQuest.id    
            },
        });
        this.uploader.onSuccessItem = (item, res) => {         
            if (res) {
                let data = JSON.parse(res)                    
                this.params.data.evalEventFileList.push({
                    filename : item._file.name ,
                    id : data
                })                
                item.remove()
                this._ResponseHandleService.showMessage(`文件${item._file.name}上传成功`)
                return                       
            }
            item.isSuccess = false
            item.isError = true
        }
        this.uploader.onErrorItem = (item,res) =>{  
            let data = JSON.parse(res)   
            item.isError = true        
            item.isSuccess = false                        
        }
        this.uploader.onCompleteAll = ()=>{
            // this.params.context.componentParent.getList()
        }
        this.uploader.onAfterAddingAll = (files) => {
            this.openUploadWindow.call(this)
           
            this._EventService.toggleEvent({ type: 'select', value: this.uploader })
        }
    }

    openUploadWindow() {
        let navigationExtras: any = { outlets: { uploadFile: 'uploadFile' } };
        this.router.navigate([navigationExtras], { preserveQueryParams: true });
    }

    public deleteEvaluationFile(file,i) {
        this.params.context.componentParent.deleteEvaluationFile(file,i,this.params.data.evalEventFileList)
    }

    public edit() {
        this.params.context.componentParent.edit(this.params.data)
    }

    async downloadFile(file){        
        if(!file.filepath){
            return 
        }
        await this._SelfEvaluationUpdateService.downloadFile(file.filepath,file.filename)
    }

    refresh(): boolean {
        return false;
    }

}
