import { StorageOpinionService } from './../../../general-archive-setting/storage-opinion/storage-opinion.service';
import { OpinionColumnService } from './../../../general-archive-setting/opinion-column/opinion-column.service';
import { generalArchiveAuditService } from './../../general-archive-audit.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { selectAuditLevelComponent } from '../selectAuditLevel/selectAuditLevel.dialog';
@Component({
    selector: 'post-review-opinion-dialog',
    templateUrl: './postReviewOpinion.dialog.html',
    styleUrls: ['./postReviewOpinion.dialog.scss'],
})
export class postReviewOpinionComponent {
    loading: boolean = false;
    opinionClassLists : Array<any> = []
    opinionColumnLists : Array<any> = []
    opinionClass : string = '' //当前所选意见分类id
    opinionColumn : string = '' //当前所选意见栏id
    auditCommentDesc : string = '' //用户自定义意见
    auditCommentDescValues : Array<string> = []
    auditComment : Array<AuditComment> = [] //保存的意见栏id集合
    // auditSts : AuditSts.agree | AuditSts.disagree = AuditSts.agree
    hasOpinion : boolean = false
    constructor(
        private dialog : MatDialog,
        private _OpinionColumnService: OpinionColumnService,
        private _StorageOpinionService: StorageOpinionService,
        private _generalArchiveAuditService: generalArchiveAuditService,
        public dialogRef: MatDialogRef<postReviewOpinionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { submitTag: string }
    ) {
        this.getStorageOpinionList()
    }

    /**
     * 根据意见分类id获取意见栏列表
     * @param parentId 意见分类id
     */
    async getOpinionColumnByClassId(parentId){
        let res = await this._OpinionColumnService.getOpinionColumnByParentId(parentId)
        this.opinionColumnLists = res.data
    }
    /**
     * 获取意见分类列表
     */
    async getStorageOpinionList() {
        let res = await this._StorageOpinionService.getList({ currentPage: 1, pageSize: '9999' })
        this.opinionClassLists = res.data
    }
    /**
     * 更改所选意见分类
     * @param e 
     */
    changeOpinionClass(e) {
        this.opinionColumn = ''
        if(!this.opinionClass){
            return 
        }
        this.getOpinionColumnByClassId(this.opinionClass)
    }
    /**
     * 添加意见按钮
     */
    addOpinion(){
        let opinionColumn = this.opinionColumnLists.find(c=>c.id == this.opinionColumn)
        let opinionClass = this.opinionClassLists.find(c=>c.id == this.opinionClass)
        this.auditComment.push({
            opinionColumnId : this.opinionColumn,
            opinionColumnName : opinionColumn.dictionaryName,
            opinionColumnCode : opinionColumn.dictionaryCode,
            opinionClassId : this.opinionClass,
            opinionClassName : opinionClass.dictionaryName,
            opinionClassCode : opinionClass.dictionaryCode
        })
    }
    /**
     * 添加意见按钮是否可用
     */
    disableAddOpinion():boolean{
        if (!this.opinionColumn){
            return true 
        }
        let row = this.auditComment.find(c=>c.opinionColumnId == this.opinionColumn)
        if (row){
            return  true 
        }else{
            return false
        }
    }

    disableChangeOpinionClass():boolean{
        if (!this.opinionClass){
            return false 
        }
        if (this.auditComment.length > 0){
            return true 
        }
    }

    async postData(auditSts){
        try{
            this.loading = true 
            // if (!this.hasOpinion){
            //     await this._generalArchiveAuditService.passAudit(this.data.submitTag)
            //     this.dialogRef.close(true)
            //     return 
            // }
            let info : PostReviewOpinionInfo[] = []
            this.auditCommentDescValues.forEach(auditCommentDesc=>{
                info.push({
                    auditCommentDesc : auditCommentDesc,
                    auditSts : auditSts,
                    auditCommentClassId : this.opinionClass,
                    auditCommentClassCode : this.auditComment.map(c=>c.opinionColumnId).join(','),
                    submitTag:this.data.submitTag
                })
            })  
            this.auditComment.forEach(auditComment=>{
                info.push({
                    auditCommentDesc : `${auditComment.opinionClassName}:${auditComment.opinionColumnName}`,
                    auditSts : auditSts,
                    auditCommentClassId : this.opinionClass,
                    auditCommentClassCode : this.auditComment.map(c=>c.opinionColumnId).join(','),
                    submitTag:this.data.submitTag
                })
            })    
            if (auditSts == 1){   
                this.loading = false              
                await this._generalArchiveAuditService.passAudit(this.data.submitTag)
                this.dialogRef.close(true)              
            }else{
                await this._generalArchiveAuditService.postReviewOpinion(info,this.data.submitTag)
                this.dialogRef.close(true)
            }                        
        }catch(err){
            console.log(err)
            this.loading = false 
        }
    }

    selectAudit(info){
        const dialogRef = this.dialog.open(selectAuditLevelComponent, {
            width: '',
            // disableClose : true,
            data:{
                hasOpinion : this.hasOpinion,
                info : info,
                submitTag : this.data.submitTag              
            }
          });
          dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.dialogRef.close(true)
                return 
            }      
          });
    }

    addauditCommentDesc(){
        this.auditCommentDescValues.push(this.auditCommentDesc)
        this.auditCommentDesc = ''
    }

}

export interface AuditComment{
    opinionColumnId : string, //所选意见栏的id
    opinionColumnName : string, //所选意见栏的显示名
    opinionColumnCode : string, //所选意见栏的code(目前都是null,所以没用)
    opinionClassId : string,    //当前意见分类的id
    opinionClassName : string,  //当前意见分类的名称
    opinionClassCode : string   //当前意见分类code    
}

export enum AuditSts{
    agree = 1,
    disagree = 0
}

export interface PostReviewOpinionInfo {
    auditCommentDesc : string,
    auditSts : 1 | 0,
    auditCommentClassId : string,
    auditCommentClassCode : string,
    submitTag:string
}