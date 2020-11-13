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

