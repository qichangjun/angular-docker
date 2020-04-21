import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter, ElementRef } from '@angular/core';
import { style, state } from '@angular/animations';
import { MissionManageService } from '../../../mission-manage/mission-manage.service';
import { MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../core/services/formErrorMessage.service';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
import { checkMissionAuditInfoComponent } from './dialog/checkMissionAuditInfo/checkMissionAuditInfo.component';
import { SelfEvaluationUpdateService } from '../../../work-ability-assessment/self-evaluation/self-evaluation-update-service';

@Component({
    selector: 'mission-edit-side-bar',
    templateUrl: './missionEditSideBar.component.html',
    styleUrls: ['./missionEditSideBar.component.scss'],
})
export class missionEditSideBarComponent implements OnInit, OnChanges {
    @Input() disableEdit: boolean = false;
    @Input() id: string = ''
    @Input() taskStreamId: string = ''
    @Input() taskStreamSts: string = ''
    @Input() taskStreamReceiveSts: any = ''
    @Output() closeSideBarAndUpdate: EventEmitter<any> = new EventEmitter();
    myForm: FormGroup;
    loading : boolean = false 
    accessoryIdList : any[] = []
    storageFileList : any[] = []
    deleteAccessoryIdList : any[] = []
    currentValue : any = undefined
    baseInfo : any = {}
    constructor(private el: ElementRef,
        private dialog : MatDialog,
        private fb: FormBuilder,
        public _formErrorMessageService: FormErrorMessageService,
        private _MissionManageService : MissionManageService,
        private _SelfEvaluationUpdateService : SelfEvaluationUpdateService
    ) { }

    ngOnInit() {        
    }

    createForm() {
        this.myForm = this.fb.group({
            chooseGroupInfo : [[],[]],
            taskTitle: ['', [Validators.required]],
            startAt: ['',[]],
            endAt: ['',[]],
            alarmTime : ['',[]],
            taskPrior : [0,[]],
            isScore : [true,[]],
            taskDesc : ['']
        });
    }

    async getMissionInfo(){
        try{
            this.loading = true 
            Promise.all([this.getMissionReceiver(),this.getMissionFileList(),this.getMissionBaseInfo()]).then((res)=>{
                this.loading = false
            })
        }catch(err){
            console.log(err)
            this.loading = false
        }        
    }

    async getMissionBaseInfo():Promise<any>{
        return new Promise(async (resolve,reject)=>{
            this.baseInfo = await this._MissionManageService.getMissionInfo(this.id)
            this.baseInfo.isScore = this.baseInfo.isScore == 1 ? true : false 
            for (let key in this.myForm.controls){    
                if (this.baseInfo[key] != undefined){           
                    if (key == 'startAt' || key == 'endAt' || key == 'alarmTime') {
                        this.baseInfo[key] = _moment(this.baseInfo[key]).format("YYYY-MM-DD")                        
                    }        
                    this.myForm.controls[key].setValue(this.baseInfo[key]) 
                }                        
            }
            resolve(true)
        })
    }
    deletFile(file,i){
        this.deleteAccessoryIdList.push(file.id)
        this.storageFileList.splice(i,1)
    }

    async getMissionFileList():Promise<any>{
        return new Promise(async (resolve,reject)=>{
            this.storageFileList = await this._MissionManageService.getMissionFileList(this.id)
            resolve(true)
        })
        
    }

    async getMissionReceiver():Promise<any>{
        return new Promise(async (resolve,rejevt)=>{
            let res = await this._MissionManageService.getMissionReceiver(this.id)
            let chooseGroupInfo = res.unitList.map(c=>{            
                let key = {id:c.id,name:c.name,type:'unitList'}
                return JSON.stringify(key)
            })        
            // let groupList = res.ownerList.map(c=>{            
            //     let key = {id:c.id,name:c.name,type:'groupList'}
            //     return JSON.stringify(key)
            // })  
            // let publishScopeCodeList = res.publishScopeCode.map(c=>c)      
            // chooseGroupInfo = chooseGroupInfo.concat(publishScopeCodeList)
            this.myForm.controls['chooseGroupInfo'].setValue(chooseGroupInfo)
            resolve(true)
        })
        
    }

    updateMissionStreamFinish(e){
        this.closeSideBarAndUpdate.emit(true)
    }

    async confirmReceive(){
        await this._MissionManageService.confirmReceive(this.taskStreamId)
        this.closeSideBarAndUpdate.emit(true)
    }

    async finishMission(finishSts){
        try{
            this.loading = true
            await this._MissionManageService.updateMissionState([this.id],finishSts)
            this.closeSideBarAndUpdate.emit(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }
        
    }

    async postMission(){
        try{
            this.loading = true
            await this._MissionManageService.postMission(this.taskStreamId)
            this.closeSideBarAndUpdate.emit(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }        
    }

    uploadFinish(e){
        this.accessoryIdList.push({
            id : e.data,
            name : e.name
        })        
    }

    async deleteMission(){
        this.closeSideBarAndUpdate.emit(false)
        let res = await Swal({
            title: '确定删除该任务吗?',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            reverseButtons: true
        })
        if (res && res.value == true) {
            try {
                this.loading = true
                await this._MissionManageService.deleteMission([this.id])
                this.closeSideBarAndUpdate.emit(true)
                this.loading = false
            } catch (err) {
                console.log(err)
                this.loading = false
            }
        }                
    }

    checkBackDetail(){
        const dialogRef = this.dialog.open(checkMissionAuditInfoComponent, {
            width: '',
            disableClose : false,
            data : {id:this.taskStreamId}
          });  
    }

    async postDate(){
        try{
            this.loading = true  
            let info = Object.assign(this.baseInfo,this.myForm.value)                  
            let unitAndOwnerList = info.chooseGroupInfo.map(c=>JSON.parse(c))
            info.unitList = unitAndOwnerList.filter(c=>c.type == 'unitList')            
            delete info.chooseGroupInfo            
            info.isScore = info.isScore == true ? 1 : 0 
            info.startAt = info.startAt ? _moment(info.startAt).format("YYYY-MM-DD") : ''
            info.endAt = info.endAt ? _moment(info.endAt).format("YYYY-MM-DD") : ''
            info.alarmTime = info.alarmTime ? _moment(info.alarmTime).format("YYYY-MM-DD") : ''
            info.accessoryIdList = this.accessoryIdList.map(c=>c.id)   
            info.deleteAccessoryIdList = this.deleteAccessoryIdList         
            await this._MissionManageService.updateMission(info)
            this.closeSideBarAndUpdate.emit(true)
            this.loading = false
        }catch(err){
            this.loading = false
        }    
    }

    async downloadFile(file){        
        await this._SelfEvaluationUpdateService.downloadFile(file.filepath,file.filename)
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.id){            
            this.createForm()  
            this.getMissionInfo()
        }
    }
}
