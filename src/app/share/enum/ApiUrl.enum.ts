export enum ApiUrl {
    uploadAccessory = '/evalEventQuest/import_accessory',
    upload = '/upload',
    getPhotoImg = "/user/get_user_image_by_photo_url",
    getInfoByUserId = "/resource/get_info_by_user_id",
    getSSOInfoByToken = "/user/user_sso_userInfo",
    getPermissionList = "/admin/get_user_permission_set",
    getUnitId = '/user/user_sso_unitId',
    login = '/user/login',
    downloadFile = '/accessory/download',

    //指标等级设定
    getSymbolLevelLists = '/leve/get_level_list',
    createtSymbolLevel = '/leve/create',
    updatetSymbolLevel = '/leve/update',
    deletetSymbolLevel = '/leve/delete',

    //指标分类
    getSymbolItemTree = '/sort/get_tree_node_list',
    getKindList = '/sort/get_sort_list',
    deleteKind = '/sort/delete',
    createKind = '/sort/create',
    editKind = '/sort/update',
    

    //指标项
    createQuestItem = '/quest/create',
    createQuestItemScore = '/questItem/create',
    updateQuestItem = '/quest/update',
    getQuestItemByQuestId = '/questItem/list_by_questId',
    deleteSymbolItem = '/quest/delete',
    getSymbolItemLists = '/quest/list_by_quest_category',
    publishQuest = '/quest/publish_quest',

    //保管期限
    getStorageTimeList = '/storageTime/get_list',
    createRetentionPeriodSetting = '/storageTime/create',
    updateRetentionPeriodSetting = '/storageTime/update',
    deleteRetentionPeriodSetting = '/storageTime/delete',

    //门类设定
    getCategorySettingList = '/category/get_list',
    createCategortSetting = '/category/create',
    updateCategortSetting = '/category/update',
    deleteCategorySetting = '/category/delete',

    //开放等级
    getOpenLevelList = '/openLevel/get_list',
    createOpenLevelList = '/openLevel/create',
    updateOpenLevelList = '/openLevel/update',
    deleteOpenLevelList = '/openLevel/delete',

    //处置策略
    getMaturityProcessList = '/maturityProcess/get_list',
    createMaturityProcess = '/maturityProcess/create',
    updateMaturityProcess = '/maturityProcess/update',
    deleteMaturityProcess = '/maturityProcess/delete',

    //保管期限表
    getStorageScheduleLIstByParentId = '/storageSchedule/list_by_parentId_unitId',
    addStorageSchedule = '/storageSchedule/create',
    updateStorageSchedule = '/storageSchedule/update',
    getStorageReviewCountById = '/storageSchedule/get_sts_by_unit_id',
    deleteStorageSchedule = '/storageSchedule/delete',
    reportStorageSchedule = '/storageSchedule/report',

    //意见分类
    getStorageOpinionList = '/storageOpinion/get_list',
    createStorageOpinion = '/storageOpinion/create',
    updateStorageOpinion = '/storageOpinion/update',
    deleteStorageOpinion = '/storageOpinion/delete',

    //评估情况
    getCooperationGroupLists = '/admin/get_cooperation_group_and_child_unit',
    getToAuditUnit = '/evalEventQuest/get_to_audit_unit',
    getAuditedUnit = '/evalEventQuest/get_audited_unit',

    //意见栏
    getOpinionColumnList = '/opinion/get_list',
    createOpinionColumn = '/opinion/create',
    updateOpinionColumn = '/opinion/update',
    deleteOpinionColumn = '/opinion/delete',
    getOpinionColumnByParentId = '/opinion/get_list_id',

    //保管期限待审核表
    getStoragePendingReviewLIstByParentId = '/storageReview/pending_review_list',
    getUnitAuditDetail = '/storageReview/review_details',
    postReviewOpinion = '/storageReview/propose_review_opinion',
    passAudit = '/storageReview/pass_review',
    selectAuditLevel = '/storageSchedule/save_rate_audit',
    getAuditedGeneralArchiveUnit = '/storageReview/get_audited_unit',
    getToAuditGeneralArchiveUnit = '/storageReview/get_to_audit_unit',

    //自评
    getListAndGroupByUnitAndItemSts = '/quest/get_list_and_group_by_unit_and_item_sts',
    getQuestItemByUnitAndSts = '/questItem/get_by_unit_and_item_sts',
    getEvalEventQuestByUnitAndItemSts = '/evalEventQuest/get_by_unit_and_item_sts',
    updateEvalEventQuest = '/evalEventQuest/update',
    getEventQuestCountById = '/evalEventQuest/get_count_by_unit_id',
    postEvalEventQuest = '/evalEventQuest/report',
    deleteEvaluationFile = '/accessory/delete',
    getEvaluationFile = '/evalEventQuest/get_accessory_by_unit_and_item_sts',
    postEvaluationAgain = '/evalEventQuest/report_again',
    getUnitQuestProcess = '/evalEventQuest/get_unit_quest',

    //档案局评定
    agreeSelfEvaluation = '/evalEventQuest/conform_unit',
    disagreeSelfEvaluation = '/evalEventQuest/not_conform_unit',
    confirmEvaluation = '/evalEventQuest/review',
    finishReSelfEvaluation = '/evalEventQuest/not_conform_eventquest',

    //评定等级
    getAuditLevelList = '/audit/get_list',
    createAuditLevel = '/audit/create',
    updateAuditLevel = '/audit/update',
    deleteAuditLevel = '/audit/delete',

    //系统模块
    getWorkingModelList = '/model/get_list',
    editWorkingModel = '/model/update',

    //数据统计
    getScoreOrderList = '/evalEvent/list/final/score/order',
    getAllUnitMap = '/admin/get_all_unit_Map',
    getUnitNumberInfo= '/evalEvent/statistics_model_unit_number',

    //任务管理
    getMissionList= '/task/task_screen',
    getPostMissionList = '/taskpublish/task_publish_screen',
    getAllCooperationList = '/admin/get_all_cooperation_group',
    addMission = '/task/create',
    updateMission = '/task/update',
    updateMissionState = '/task/finish',
    missionUpload = '/accessory/import_accessory',
    getMissionInfo = '/task/detail',
    getMissionFileList = '/task/accessory_list',
    getMissionReceiver = '/task/receive_orgs_and_owners',
    deleteMission = '/task/delete',
    backMission = '/taskpublish/back',
    postMission = '/taskpublish/report',
    reviewMission = '/taskpublish/review',
    getMissionOfUnitStatusInfo = '/task/taskid_screen',
    importAccessory = '/taskpublish/import_accessory',
    updateMissionStrean = '/taskpublish/update',
    getMissionStreamDetail = '/taskpublish/detail',
    getMissionStreamFile = '/taskpublish/accessory_list',
    deleteMissionStreamFile = '/taskpublish/delete_accessory',
    getMissionAuditInfo = '/taskpublish/remarks',
    confirmReceive = '/taskpublish/receive',
    getUnReadUnit = '/task/taskid_receive',
    getUnFinishMissionCount = '/task/get_taskcount',
    getMIssionNumberStream = '/taskpublish/get_taskcountbyunitid',
    getMissionOfUnitSubmitCount = '/task/get_unitcountbytaskid',

    //评估域统计
    getSumquestscoreByUnitid = '/evalEvent/sumquestscore_by_unitid',
    getQuestGroupAvgScore = '/evalEventQuest/get_quest_group_avg_score',
    getQuestGroupRankByUnitId = '/evalEventQuest/get_quest_group_rank_by_unit_id',
    listquestgrpscoreByUnitid = '/evalEvent/listquestgrpscore_by_unitid',
    getQuestLevelRankByUnitId = '/evalEventQuestdet/get_quest_level_rank_by_unit_id'
}

