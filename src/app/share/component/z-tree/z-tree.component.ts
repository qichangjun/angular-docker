import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { merge as lodashMerge } from 'lodash';
import { Subscription } from 'rxjs';

import { Options } from './option.class';
import { zTreeService } from './z-tree.service';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-z-tree',
  templateUrl: './z-tree.component.html',
  styleUrls: ['./z-tree.component.scss'],
  providers: [zTreeService]
})
export class ZTreeComponent implements OnInit {
  @Input() ids: Array<any>;
  @Input() option: Options;
  @Output() clickTree: EventEmitter<any> = new EventEmitter();
  keepNode: any;
  eventSub: Subscription;
  defaultOptions: Options = {
    treeId: 'treeId',
    data: { simpleData: { enable: true, pIdKey: 'parentId', idKey: 'id' }, key: { name: 'name' } },
    view: {
      addDiyDom: this.addDiyDom.bind(this),
      selectedMulti: false
    },
    callback: {
      onClick: this.clickDom.bind(this),
      onAsyncSuccess: this.onAsyncSuccess.bind(this)
    },
    async: {
      enable: true,
      dataType: "json",
      type: "get",
      url: 'null',
      dataFilter: this.ajaxDataFilter.bind(this),
      otherParam: {
      }
    }
  }
  constructor(
    private _zTreeService: zTreeService
  ) {
    //合并用户设置和默认设置
    this.option = lodashMerge(this.defaultOptions, this.option)
  }

  ngOnInit() {
  }

  cancelSelectedNode() {
    let zTreeObj = $.fn.zTree.getZTreeObj(this.option.treeId);
    if (zTreeObj) {
      zTreeObj.cancelSelectedNode()
    }
  }

  refreshNode(id,type:'self' | 'parent') {
    let treeObj = $.fn.zTree.getZTreeObj(this.option.treeId);
    let treeNode = treeObj.getNodeByParam("id", id)
    if (!treeNode) { 
      this.getTreeDataInit()
      treeObj.reAsyncChildNodes(treeNode, "refresh");
      return
    }
    let node = type == 'self' ? treeNode :　treeNode.getParentNode()
    if (node) {
      this.keepNode = treeObj.getNodeByParam("id", treeNode.id)
      treeObj.reAsyncChildNodes(node, "refresh");
    }
    else {
      this.keepNode = treeObj.getNodeByParam("id", treeNode.id)
      this.getTreeDataInit()
      treeObj.reAsyncChildNodes(treeNode, "refresh");
    }
  }
  /**
   * 第一次加载树的数据
   * 并根据ids，默认展开ids最后一个节点(即定位功能)
   */
  async getTreeDataInit() {
    let treeData = await this._zTreeService.getTreeDataPaths(this.option.async.url, this.ids, this.option.async.otherParam)
    for (let i = 0; i < treeData.length; i++) {
      treeData[i].isParent = true
      treeData[i]['iconSkin'] = treeData[i].folderType
    }
    if (treeData.length == 0) {
      let zTreeObj = $.fn.zTree.init(jQuery('#' + this.option.treeId), this.option, treeData);
      return
    }
    if (this.option.additionData) {
      treeData.push(this.option.additionData)
    }

    let zTreeObj = $.fn.zTree.init(jQuery('#' + this.option.treeId), this.option, treeData);
    this.ids.forEach(id => {
      let treeNode = zTreeObj.getNodeByParam("id", id)      
      setTimeout(function () {
        if (treeNode) {
          zTreeObj.expandNode(treeNode, true, false, true);
          zTreeObj.selectNode(treeNode);
        }
      }, 10)
    })

  }

  /**
   * 自定义dom节点
   * @param treeId 树容器id
   * @param treeNode 节点对象
   */
  addDiyDom(treeId, treeNode): void {
    let spaceWidth = 18;
    let switchObj = jQuery("#" + treeNode.tId + "_switch");
    let icoObj = jQuery("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);
    let spaceStr = "<span class='ztree-gap' style='width:" + (spaceWidth * treeNode.level) + "px'></span>";
    switchObj.before(spaceStr);
    $("#" + treeNode.tId + "_a").addClass('ztreeDoPosition')
  }

  /**
   * 点击节点事件
   * @param event 
   * @param treeId 
   * @param treeNode 
   */
  clickDom(event, treeId, treeNode): void {
    let zTreeObj = $.fn.zTree.getZTreeObj(this.option.treeId);
    if (!zTreeObj) return console.error('未找到树对象')
    setTimeout(function () {
      zTreeObj.expandNode(treeNode, true, false, true);
      zTreeObj.selectNode(treeNode);
    }, 10)
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length > 0) {
      zTreeObj.reAsyncChildNodes(nodes[0], "refresh");
    }
    this.clickTree.emit({ ids: this.generateTreeNodeIds(treeNode), node: treeNode });
  }

  /**
   * 
   * @param treeId 
   * @param parentNode 父节点对象
   * @param res http请求的返回值
   */
  ajaxDataFilter(treeId, parentNode, res) {
    let datas = res
    let c_docTreeData = [];
    if (datas.length == 0) {
      let zTreeObj = $.fn.zTree.getZTreeObj(treeId);
      if (!zTreeObj) return console.error('未找到树对象')
      parentNode.childCount = 0
      parentNode.isParent = false
      zTreeObj.updateNode(parentNode)
    }
    for (let i = 0; i < datas.length; i++) {
      let c_docItem = {
        id: datas[i].id,
        parentId: datas[i].parentId,
        name: datas[i].name,
        childCount : datas[i].childCount,
        isParent: true,
        folderType: datas[i].folderType,
        creationDate: datas[i].creationDate,
        creatorName: datas[i].creatorName,
        description: datas[i].description,
        collectionWay: datas[i].collectionWay,
        da_category: datas[i].da_category,
        childType: datas[i].childType,
        iconSkin: datas[i].folderType
      };
      // if (datas[i].childCount > 0) {
      //   c_docItem.isParent = true
      // } else {
      //   c_docItem.isParent = false
      // }
      c_docTreeData.push(c_docItem);
    }
    return c_docTreeData
  }

  /**
   * 所有异步操作的成功回调(展开，刷新，重新初始化等操作)
   * @param event 
   * @param treeId 
   * @param treeNode 
   */
  onAsyncSuccess(event, treeId, treeNode) {
    if (this.keepNode) {
      let zTreeObj = $.fn.zTree.getZTreeObj(this.option.treeId);
      if (!zTreeObj) return console.error('未找到树对象')
      let treeNode = zTreeObj.getNodeByParam("id", this.keepNode)
      if (!treeNode) {
        return
      }
      zTreeObj.expandNode(treeNode, true, false, true);
      zTreeObj.selectNode(treeNode);
      this.keepNode = null
    }
  }

  /**
   * 根据节点获取ids路径
   * @param treeNode 
   */
  generateTreeNodeIds(treeNode): Array<any> {
    let treeNodeIds = [];
    treeNodeIds.unshift(treeNode.id);
    let getTreeNodeIds = (treeNode) => {
      let parentNode = treeNode.getParentNode();
      if (!parentNode) {
        treeNodeIds.unshift(treeNode.id);
        return
      }
      treeNodeIds.unshift(parentNode.id);
      getTreeNodeIds(parentNode)
    };
    getTreeNodeIds(treeNode);
    treeNodeIds.shift();
    return treeNodeIds
  };

  /**
   * 父控件更新ids时，在树节点中展开对应节点
   * @param ids 
   */
  async updateData(ids) {
    let zTreeObj = $.fn.zTree.getZTreeObj(this.option.treeId);
    if (!zTreeObj) return console.error('未找到树对象')
    let treeNode = zTreeObj.getNodeByParam("id", ids[ids.length - 1])
    if (!treeNode) {
      // zTreeObj.cancelSelectedNode()
      return
    }
    setTimeout(function () {
      zTreeObj.expandNode(treeNode, true, false, true);
      zTreeObj.selectNode(treeNode);
    }, 10)
  }

  refreshTree() {
    this.option = lodashMerge(this.defaultOptions, this.option)
    this.getTreeDataInit()
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    /**
     * 初始化操作/每次用户修改otion时，重新加载树
     */
    if (changes['option']) {
      this.refreshTree()
    }
    /**
     * 若时第一次设置ids，则用getTreeDataInit()方法初始化
     * 否则用updateData方法定位
     */
    if (changes['ids']) {
      console.log(this.ids)
      if (changes['ids'].firstChange) return
      console.log(this.ids)
      this.updateData(this.ids)
    }
  }
}

/**
 * node : zTree的node对象
 */
export interface clickTreeEventInfo {
  ids: Array<string>;
  node: any;
}