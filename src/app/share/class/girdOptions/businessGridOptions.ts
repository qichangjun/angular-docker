import * as _ from 'lodash';
import { GridApi, GridOptions, RowNode, SortChangedEvent } from 'ag-grid';

export class BusinessListGridOptions implements GridOptions {
    headerHeight = 40
    suppressCellSelection = true
    enableColResize = true
    enableSorting = false
    enableServerSideSorting = true
    context = {
        componentParent: this
    }
    columnDefs = []
    rowData = []
    rowHeight = 50
    pinnedBottomRowData = []
    overlayLoadingTemplate = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" ><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>'
    overlayNoRowsTemplate = '<span class="no--data"></span>'
    onGridReady = (e) => {
        e.api.sizeColumnsToFit();
        e.api.showLoadingOverlay()
    }
    onRowDataChanged = (e) => {
        e.api.hideOverlay()
        if (e.api.getRenderedNodes().length == 0) {
            e.api.showNoRowsOverlay()
        }
    }
    constructor(
        public componentParent: any
    ) {
        this.context.componentParent = componentParent
    }

    onSortChanged(e){
        let sortInfo = e.api.getSortModel()[0]
        if (sortInfo) {
            this.componentParent.parameter.sortWay = sortInfo.sort
            this.componentParent.parameter.sortField = sortInfo.colId
        } else {
            this.componentParent.parameter.sortField = null
            this.componentParent.parameter.sortWay = null
        }
        this.componentParent.router.navigate([], { queryParams: this.componentParent.parameter });

    }

}
