import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AuthenticationService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { ApiUrl } from '../../enum/ApiUrl.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
@Component({
    selector: 'form-upload',
    templateUrl: './formUpload.component.html',
    styleUrls: ['./formUpload.component.scss'],
})
export class FormUploadComponent implements OnInit {
    public uploader: FileUploader;
    @Input() displayName : string =  '上传'
    @Input() disabledUpload : any = false 
    @Input() attrName: any;
    @Input() uploadUrl : string;
    @Input() additionalParams : any = {};
    @Output() uploadFinish: EventEmitter<any> = new EventEmitter();
    constructor(
        private _ResponseHandleService:ResponseHandleService,
        private _configService: ConfigService,
        private _authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private _EventService: EventService,
    ) {
        
    }

    ngOnInit() {  
        this.uploader = new FileUploader({
            autoUpload: true,
            url: this._configService.teamrowkApiUrl() + ApiUrl[this.uploadUrl],            
            headers : [
                {name : 'accessToken',value : this._authenticationService.getAccessToken()}
              ]
            ,additionalParameter: {        
            },
        });

        this.uploader.onBeforeUploadItem = (item) =>{   
            for(let key in this.additionalParams) {
                this.uploader.options.additionalParameter[key] = this.additionalParams[key]
            }
            this.uploader.options.additionalParameter['relativePath'] = '/' + this.attrName + '/' + item._file.name
          }
        this.uploader.onSuccessItem = (item, res) => {         
            if (res) {
                let data = JSON.parse(res)           
                this.uploadFinish.emit({ 
                    data : data,                    
                    attrName:this.attrName,
                    name:item._file.name,
                    size:item._file.size,                                       
                })     
                item.remove()
                return                       
            }
            item.isSuccess = false
            item.isError = true
        }
        this.uploader.onErrorItem = (item,res) =>{  
            let data = JSON.parse(res)               
            this._ResponseHandleService.showMessage(data.message)                        
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

}
