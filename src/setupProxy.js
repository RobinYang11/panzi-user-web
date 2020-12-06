
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTIiLCJzdWIiOiIxNzgyNjgwNzIyNiIsImlzcyI6ImEyOTNlMTY2LTg5ZGEtNGVlMy04NjE3LWZiOGE5NGI3M2MwZSIsImlhdCI6MTYwNTI3Nzg2MSwiZXhwIjoxNjA1ODgyNjYxfQ.iT6p9VKs0DtvzCKJUVKVHDELAY8RtZqTmfcy01kbNH8"
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target:"https://userweb.ngrok2.xiaomiqiu.cn",
      // target: 'http://r3x4365388.wicp.vip',
      // target: 'http://r3x4365388.wicp.vip:19183',
      // target: 'http://2081uw5545.iask.in:46203',
      // target: 'localhost:192.168.0.61:6661',
      changeOrigin: true,
    })
  );
};