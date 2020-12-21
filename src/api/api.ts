import request from "../utils/request";


export function queryRecordProject(params:any):Promise<Response> {
  return request.post('/api/queryRecordProject',params)
}

export function addRecordProject(params:any):Promise<Response> {
  return request.post('/api/addRecordProject',params)
}

export function updateRecordProject(params:any):Promise<Response> {
  return request.post('/api/updateRecordProject',params)
}

export function queryRecord(params:any):Promise<Response> {
  return request.post('/api/queryRecord',params)
}

export function addRecord(params:any):Promise<Response> {
  return request.post('/api/addRecord',params)
}

export function updateRecordQuestion(params:any):Promise<Response> {
  return request.post('/api/updateRecordQuestion',params)
}

export function deleteRecord(params:any):Promise<Response> {
  return request.post('/api/deleteRecord',params)
}

export function queryRecordComment(params:any):Promise<Response> {
  return request.post('/api/queryRecordComment',params)
}

export function addRecordComment(params:any):Promise<Response> {
  return request.post('/api/addRecordComment',params)
}

export function deleteRecordComment(params:any):Promise<Response> {
  return request.post('/api/deleteRecordComment',params)
}

export function exportRecord(params:any):Promise<Response> {
  return request.post('/api/exportRecord',params)
}

export function queryLatestTags(params:any):Promise<Response> {
  return request.post('/api/queryLatestTags',params)
}

export function addPpt(params:any):Promise<Response> {
  return request.post('/api/addPpt',params)
}

export function deletePpt(params:any):Promise<Response> {
  return request.post('/api/deletePpt',params)
}

export function queryPpt(params:any):Promise<Response> {
  return request.post('/api/queryPpt',params)
}

// 图纸接口
export function addDesignFolder(params:any):Promise<Response> {
  return request.post('/api/addDesignFolder',params)
}

export function batchAddDesign(params:any):Promise<Response> {
  return request.post('/api/batchAddDesign',params)
}

export function updateDesign(params:any):Promise<Response> {
  return request.post('/api/updateDesign',params)
}

export function delDesign(params:any):Promise<Response> {
  return request.post('/api/delDesign',params)
}

export function queryDesign(params:any):Promise<Response> {
  return request.post('/api/queryDesign',params)
}

export function queryDesignList(params:any):Promise<Response> {
  return request.post('/api/queryDesignList',params)
}

export function uploadFile(params:any):Promise<Response> {
  return request.post('/api/uploadFile',params)
}

// 文档接口
export function addDocumentFolder(params:any):Promise<Response> {
  return request.post('/api/addDocumentFolder',params)
}
export function batchAddDocument(params:any):Promise<Response> {
  return request.post('/api/batchAddDocument',params)
}
export function updateDocument(params:any):Promise<Response> {
  return request.post('/api/updateDocument',params)
}
export function delDocument(params:any):Promise<Response> {
  return request.post('/api/delDocument',params)
}
export function queryDocument(params:any):Promise<Response> {
  return request.post('/api/queryDocument',params)
}
export function queryPrivateDocumentList(params:any):Promise<Response> {
  return request.post('/api/queryPrivateDocumentList',params)
}

// 缺陷库
export function addDefect(params:any):Promise<Response> {
  return request.post('/api/addDefect',params)
}

export function delectDefect(params:any):Promise<Response> {
  return request.post('/api/delectDefect',params)
}

export function queryDefect(params:any):Promise<Response> {
  return request.post('/api/queryDefect',params)
}

export function updateDefect(params:any):Promise<Response> {
  return request.post('/api/updateDefect',params)
}

// 类型管理

export function addType(params:any):Promise<Response> {
  return request.post('/api/addType',params)
}

export function deletType(params:any):Promise<Response> {
  return request.post('/api/deletType',params)
}

export function queryType(params:any):Promise<Response> {
  return request.post('/api/queryType',params)
}

export function updateType(params:any):Promise<Response> {
  return request.post('/api/updateType',params)
}



