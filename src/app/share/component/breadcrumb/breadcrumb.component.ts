import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter } from '@angular/core';
export interface BreadcrumbNode{
  childType : 'da_file_plan' | 'da_category' | 'da_class' | 'da_volume' | 'da_record' | '';
  id : string;
  objectName : string;
  objectType : 'da_file_plan' | 'da_category' | 'da_class' | 'da_volume' | 'da_record' | ''
}

@Component({
  selector: 'bread-crumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit,OnChanges{
  @Input() breadCrumbLists : Array<BreadcrumbNode>;
  @Input() idLists : any;
  @Input() rootName : string;
  @Output() clickRoot : EventEmitter<any> = new EventEmitter();
  @Output() clickBreadCrumb : EventEmitter<any> = new EventEmitter();
  constructor() {}
  gotoRoot(rootName){
    this.clickRoot.emit();
  }
  onSelect(breadNode : BreadcrumbNode){
    for (let i = 0 ; i < this.breadCrumbLists.length;i++) {
      if (this.breadCrumbLists[i].id == breadNode.id) {
        this.breadCrumbLists.splice(i+1,this.breadCrumbLists.length - i);
        break;
      }
    }
    let treeNodeIds = [];
    for (let i = 0 ; i < this.breadCrumbLists.length;i++) {
      treeNodeIds.push(this.breadCrumbLists[i].id)
    }
    let ids = []
    ids = ids.concat(treeNodeIds)
    this.clickBreadCrumb.emit({ids:ids,node:breadNode});
  }
  ngOnInit(){}
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}
