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



