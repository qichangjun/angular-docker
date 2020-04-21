import { AuthenticationService } from './../../../../core/services/auth.service';
import { ApiUrl } from './../../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';
@Component({
    selector: 'symbol-info-upload-grid',
    template: `
    <span class="grid--name--column">    
        <input class="mat-menu-item__button" type="file" ng2FileSelect [uploader]="uploader" />

    </span>

    `
})
export class symbolInfoUploadComponent implements ICellRendererAngularComp {
    public params: any;
    uploader
    constructor(
        private _AuthenticationService : AuthenticationService,
        private _ConfigService : ConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private _EventService: EventService,
    ){

    }
    agInit(params: any): void {
        this.params = params;
        this.uploader = new FileUploader({
            autoUpload: true,
            url: this._ConfigService.teamrowkApiUrl() + ApiUrl.upload,            
            headers : [
                {name : 'accessToken',value : this._AuthenticationService.getAccessToken()}
              ]
            ,additionalParameter: {    
                id : this.params.data.id    
            },
        });
        this.uploader.onSuccessItem = (item, res) => {         
            if (res) {
                let data = JSON.parse(res)           
                console.log(data)
                item.remove()
                return                       
            }
            item.isSuccess = false
            item.isError = true
        }
        this.uploader.onErrorItem = (item,res) =>{  
            console.log(res)
            let data = JSON.parse(res)                                  
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

    public delet() {
        this.params.context.componentParent.delete(this.params.data)
    }

    public edit() {
        this.params.context.componentParent.edit(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
