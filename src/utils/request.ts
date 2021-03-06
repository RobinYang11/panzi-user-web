


import axios from 'axios';

const get = (url: string, params: any) => axios.get(url, {
  url,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTIiLCJzdWIiOiIxNzgyNjgwNzIyNiIsImlzcyI6ImEyOTNlMTY2LTg5ZGEtNGVlMy04NjE3LWZiOGE5NGI3M2MwZSIsImlhdCI6MTYwNTI3Nzg2MSwiZXhwIjoxNjA1ODgyNjYxfQ.iT6p9VKs0DtvzCKJUVKVHDELAY8RtZqTmfcy01kbNH8'
  },
  params
}).then(res => res.data)


const post = (url: string, data: any) => {
  return axios.post(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization':"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTIiLCJzdWIiOiIxNzgyNjgwNzIyNiIsImlzcyI6IjQ3Yzk0MTU1LTMyYjYtNDdjYi04OTM1LTliYmNhNTdmN2Y1OSIsImlhdCI6MTYwNjEzOTM1MSwiZXhwIjoxNjA2NzQ0MTUxfQ.AEO77KtIbdLbA0BFWBOUvscaSRGWJNxntAY9-w1MNBw"
    }
  }).then(res => res.data);
}

export default {
  get,
  post,
}