export class Options {
    treeId : string;    //树的容器id,用于多树组件，必写
    data? : Object;     //数据类型
    view? : {           //自定义节点显示
        addDiyDom? : Function,
        selectedMulti? : boolean,
        addHoverDom? : Function,
        removeHoverDom? : Function
    };
    callback? : {       
        /**
         * 点击树节点的事件
         * @param treeId 树容器id 
         * @param treeNode 点击的节点
         */
        onClick? : Function,    
        /**
         * 所有异步事件成功的回调
         * event, treeId, treeNode
         */
        onAsyncSuccess? : Function
    };
    async? : {
        enable? : boolean,
        dataType? : string,
        type? : string,
        url? : string,
        dataFilter? : Function,
        autoParam? : any,
        otherParam? : Object,
        headers? : any
    }
    additionData? : Object;     //给树额外添加的静态数据,一般用于添加root节点   
}