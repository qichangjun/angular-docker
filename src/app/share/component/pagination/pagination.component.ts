import { Component, Input, OnChanges, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'my-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class MyPaginationComponent implements OnInit, OnChanges {
    routerSubscription : any 
    page : any = undefined
    save_currentPage : number = 1
    @Input() isSelectAll: boolean = false;
    @Input() totalElement: number = 0;
    @Input() currentPage: number = 1;
    @Input() pageSize?: string = '50';
    @Input() enableSelectAll : boolean = false
    @Output() selectAll : EventEmitter<any> = new EventEmitter();
    pageCount : Array<number> = [1];
    constructor(
        private route : ActivatedRoute,
        private router: Router
    ) {
        
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params=>{
            this.isSelectAll = params.isSelectAll ==  'true' ? true : false                  
        })
     }
    ngOnChanges() {
        this.currentPage = this.currentPage*1      
        this.save_currentPage = this.currentPage 
        this.pageCount = []
        let pageCount = Math.ceil(this.totalElement/parseInt(this.pageSize))
        if (pageCount == 0){
            pageCount = 1
        }
        this.pageCount.push(pageCount)
        // for(let i = 1;i<=pageCount;i++){
        //     this.pageCount.push(i)
        // }
    }

    changePage(e?) {
        var keycode = window.event ? e.keyCode : e.which;//获取按键编码
        if (keycode == 13) {
            this.currentPage = this.save_currentPage
            this.router.navigate([],{queryParams:{currentPage:this.currentPage,totalElement:this.totalElement,isSelectAll:this.isSelectAll,pageSize:this.pageSize},queryParamsHandling:'merge'})
        }
        
    }

    changePageBtn(){
        this.save_currentPage = this.currentPage
        this.router.navigate([],{queryParams:{currentPage:this.currentPage,totalElement:this.totalElement,isSelectAll:this.isSelectAll,pageSize:this.pageSize},queryParamsHandling:'merge'})
    }

    changePageSize(e?) {
        this.currentPage = 1
        this.router.navigate([],{queryParams:{currentPage:this.currentPage,totalElement:this.totalElement,isSelectAll:this.isSelectAll,pageSize:this.pageSize},queryParamsHandling:'merge'})
    }
}
