import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { isArray } from 'util';
import { RecordInfoService } from './record-info.service';
import { Tile } from '../../class/tile/tile.class';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
declare var XML: any;
declare var $: any;
declare var jsonPath: any;
declare var JSONPath: any;
@Component({
    selector: 'app-record-info',
    templateUrl: './record-info.component.html',
    styleUrls: ['./record-info.component.scss'],
})
export class RecordInfoComponent implements OnInit, OnChanges, OnDestroy {
    deletePath: Array<any> = [];
    subs = new Subscription();
    tiles: Array<Tile> = [];
    xotree = new XML.ObjTree();
    jsonData: any;
    loading: boolean = false;
    saveEntity: any = {};
    tableEntitys: any = {};
    entity: any = {};
    @Input() id: string;
    @Input() disableEdit: boolean;    
    @Input() showTemplateXml: any;
    @Input() jsonMetadataTemplate: any;
    @Input() info: any;
    constructor(
        private _RecordInfoService: RecordInfoService,
        private router: Router
    ) {

    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }

    ngOnInit() {
    }

    isChecked(tile, attr) {
        this.entity[tile.options.attrName] = this.entity[tile.options.attrName] || []
        return this.entity[tile.options.attrName].indexOf(attr) >= 0
    }

    async getTemplateModule() {
        try {
            this.loading = true
            let json = this.jsonMetadataTemplate
            this.jsonData = json
            this.getShowTemplate()
            this.formatShowJson(this.jsonData.record)
            this.loading = false
        } catch (err) {
            console.log(err)
            this.loading = false
            return
        }
    }

    /**
     * 将重复的block整合成一个block,值存进一个content中
     * @param jsonData 
     */
    formatShowJson(jsonData) {
        if (jsonData.file) {
            jsonData.file = _.castArray(jsonData.file)
        }
        if (jsonData.property) {
            jsonData.property = _.castArray(jsonData.property)
            jsonData.property.forEach(pro => {
                delete pro.allowedValues
                delete pro.allowedValuesCode
            });
        }
        if (jsonData.node) {
            jsonData.node = _.castArray(jsonData.node)
        }
        if (jsonData.block) {
            jsonData.block = _.castArray(jsonData.block)
            jsonData.block.forEach(block => {
                let length = jsonData.block.filter(c => c.name == block.name).length
                if (length > 1) {
                    block.can_repeat = 'true'
                }
            });
        }
        if (jsonData.block) {
            let copy_jsonData_blocks = _.cloneDeep(jsonData.block)
            copy_jsonData_blocks.forEach(block => {
                let copyBlock = _.cloneDeep(block)
                if (copyBlock.can_repeat == 'true') {
                    let blocks = copy_jsonData_blocks.filter(c => c.name == copyBlock.name)
                    _.remove(jsonData.block, (n) => n['name'] == copyBlock.name)
                    copyBlock.property.forEach(property => {
                        property.content = []
                        blocks.forEach(repeat_block => {
                            property.content.push(repeat_block.property.find(pro => pro.name == property.name).content)
                        });
                    });
                    jsonData.block.push(copyBlock)
                }
            });
            jsonData.block.forEach(c => {
                this.formatShowJson(c)
            });
        }
    }

    async getShowTemplate() {
        let xmlData = this.showTemplateXml
        let data = this.xotree.parseXML(xmlData).data.saveData
        data.forEach(c => {
            if (!c.style) {
                c.style = {}
            }
            c.radioBtnAttrs = _.castArray(c.radioBtnAttrs);
            c.checkBoxAttrs = _.castArray(c.checkBoxAttrs);
            c.selectAttrs = _.castArray(c.selectAttrs);
            this.tiles.push(new Tile(c))
        })
        data.forEach(c => {
            if (c.attrName) {
                if (c.contentType != 'table' && c.contentType != 'upload') {
                    if (jsonPath(this.jsonData, c.attrName) != false) {
                        this.entity[c.attrName] = jsonPath(this.jsonData, c.attrName)[0]
                        return
                    }
                    this.entity[c.attrName] = ''
                } else if (c.contentType == 'upload') {
                    let path = c.attrName
                    let files = jsonPath(this.jsonData, path)
                    this.entity[c.attrName] = this.entity[c.attrName] || []
                    if (files == false) {
                        return
                    }
                    if (isArray(files[0])) {
                        files = files[0]
                    }
                    files.forEach(file => {
                        if (file.name && file.md5 && !this.entity[c.attrName].find(f => f.md5 == file.md5)) {
                            this.entity[c.attrName].push(file)
                        }
                    });
                } else {
                    this.tableEntitys[c.attrName] = []
                    c.tableAttrs.forEach(tableAttr => {
                        let datas = jsonPath(this.jsonData, tableAttr.jsonPath)
                        if (!datas) {
                            return
                        }
                        let data = _.castArray(datas)
                        if (data) {
                            for (let x = 0; x < data.length; x++) {
                                if (!this.tableEntitys[c.attrName][x]) {
                                    this.tableEntitys[c.attrName].push({})
                                }
                                this.tableEntitys[c.attrName][x][tableAttr.jsonPath] = data[x]
                            }
                        }
                    });
                }
            }
        })
    }

    addTableList(jsonPath) {
        if (!this.tableEntitys[jsonPath]) {
            this.tableEntitys[jsonPath] = []
        }
        this.tableEntitys[jsonPath].push({})
    }
    async editRecord() {
        let tableEntitys = _.cloneDeep(this.tableEntitys)
        this.saveEntity = _.cloneDeep(this.entity)
        for (let key in tableEntitys) {
            tableEntitys[key].forEach(tableEntity => {
                for (let tableKey in tableEntity) {
                    if (!this.saveEntity[tableKey]) {
                        this.saveEntity[tableKey] = []
                    }
                    this.saveEntity[tableKey].push(tableEntity[tableKey])
                }
            });
        }
        var jsonData = _.cloneDeep(this.jsonData)
        // 先去除数组，保证jsonPath能对应
        this.formatArrayItems(jsonData.record)
        // 根据jsonPath填入数据
        this.formatServiceData(jsonData)
        // 把所有单个对象转换成数组
        this.formatObjTOArray(jsonData.record)
        // 将可重复block拆分成多个blcok
        this.formatTableEntity(jsonData.record)
        // 重新转换回正确的服务端需要格式
        this.formatArrayItems(jsonData.record)
        this.info.jsonData = jsonData
        // await this._RecordInfoService.jsonToXml(jsonData)
    }

    formatObjTOArray(jsonData) {
        if (jsonData.file) {
            jsonData.file = _.castArray(jsonData.file)
        }
        if (jsonData.property) {
            jsonData.property = _.castArray(jsonData.property)
        }
        if (jsonData.node) {
            jsonData.node = _.castArray(jsonData.node)
        }
        if (jsonData.block) {
            jsonData.block = _.castArray(jsonData.block)
            jsonData.block.forEach(c => {
                this.formatShowJson(c)
            });
        }
    }

    formatArrayItems(jsonData) {
        if (jsonData.file && Array.isArray(jsonData.file) && jsonData.file.length == 1) {
            jsonData.file = jsonData.file[0]
        }
        if (jsonData.property && Array.isArray(jsonData.property) && jsonData.property.length == 1) {
            jsonData.property = jsonData.property[0]
        }
        if (jsonData.block && Array.isArray(jsonData.block) && jsonData.block.length == 1) {
            jsonData.block = jsonData.block[0]
            delete jsonData.block.can_repeat
            this.formatArrayItems(jsonData.block)
        } else if (jsonData.block && Array.isArray(jsonData.block) && jsonData.block.length > 1) {
            jsonData.block.forEach(block => {
                delete block.can_repeat
                this.formatArrayItems(block)
            })
        }
    }

    /**
     * 将单个可重复block的属性多值分解成多个block
     */
    formatTableEntity(jsonData) {
        if (jsonData.block) {
            jsonData.block.forEach((b) => {
                if (b.can_repeat == 'true') {
                    let block = _.cloneDeep(b)
                    let property = {}
                    block.property.forEach(pro => {
                        if (!property[pro.name]) {
                            property[pro.name] = {}
                        }
                        property[pro.name].content = _.cloneDeep(pro.content)
                    })
                    let repeat_block = []
                    for (let key in property) {
                        if (property[key].content) {
                            for (let i = 0; i < property[key].content.length; i++) {
                                if (!repeat_block[i]) {
                                    repeat_block[i] = _.cloneDeep(block)
                                    repeat_block[i].property.forEach(pro => {
                                        pro.content = ''
                                    });
                                }
                                repeat_block[i].property.find(pro => {
                                    return pro.name == key
                                }).content = property[key].content[i]
                            }
                        }
                    }
                    jsonData.block = jsonData.block.concat(repeat_block)
                    _.remove(jsonData.block, (n) => {
                        return n == b
                    })
                    return
                }
                this.formatTableEntity(b)
            })
        }
    }

    formatServiceData = (jsonData) => {
        //根据saveEntity对象，将值填入this.nodes对象中
        for (let key in this.saveEntity) {
            let result = JSONPath.JSONPath({ path: key, json: jsonData, resultType: 'all' })
            if (result[0]) {
                //   根据deletePath,去掉json中的被删除文件
                if (isArray(this.saveEntity[key])) {
                    //父节点是{file:{name:xx,size:xx}}这种情况
                    if (result[0].parentProperty == 'file') {
                        _.remove(result[0].parent[result[0].parentProperty], (file) => {
                            return file['url'] && this.deletePath.indexOf(file['url']) >= 0
                        })
                    } else {
                        //父节点是{file:[{name:xx,size:xx},{name:}]}情况
                        _.remove(result[0].parent, (file) => {
                            return file['url'] && this.deletePath.indexOf(file['url']) >= 0
                        })
                    }
                }
                if (!this.saveEntity[key] || this.saveEntity[key].length == 0) {
                    continue
                }
                if (isArray(this.saveEntity[key]) && this.saveEntity[key].length > 0 && this.saveEntity[key][0].url && this.saveEntity[key][0].md5) {
                    if (result[0].parentProperty == 'file') {
                        result[0].parent[result[0].parentProperty] = _.castArray(result[0].parent[result[0].parentProperty])
                        this.saveEntity[key].forEach(c => {
                            c.type = result[0].value.type
                            if (!result[0].parent[result[0].parentProperty].find(file => file.md5 == c.md5)) {
                                result[0].parent[result[0].parentProperty].push(c)
                            }
                        });
                    } else {
                        result[0].parent = _.castArray(result[0].parent)
                        this.saveEntity[key].forEach(c => {
                            c.type = result[0].value.type
                            if (!result[0].parent.find(file => file.md5 == c.md5)) {
                                result[0].parent.push(c)
                            }
                        });
                    }
                    continue
                }
                result[0].parent[result[0].parentProperty] = this.saveEntity[key]
            } else {
                let path = key.replace('.content', '')
                let result = JSONPath.JSONPath({ path: path, json: jsonData, resultType: 'all' })
                if (result[0]) {
                    result[0].value.content = this.saveEntity[key]
                }
            }
        }
    }


    uploadFinish({ data, attrName, name, size }) {
        if (!this.entity[attrName]) {
            this.entity[attrName] = []
        }
        this.entity[attrName].push({
            'type': attrName,
            'url': 'local:' + data.storagePath,
            'size': size,
            'name': name,
            'md5': data.md5,
            'isNew': true
        })
    }

    deleteFile(tile, file, i) {
        this.entity[tile.options.attrName].splice(i, 1)
        this.deletePath.push(file['url'])
    }

    async previewDoc(url) {
        // let res = await this._RecordInfoService.getDocumentId(this.id, url)
        // this.router.navigate(['/previewDoc'], { queryParams: { objectId: res } })
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (!this.showTemplateXml) {
            return
        }
        if (this.jsonMetadataTemplate && changes.jsonMetadataTemplate) {
            this.deletePath = []
            this.tiles = []
            this.getTemplateModule()
        }

    }

}
