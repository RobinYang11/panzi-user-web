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



