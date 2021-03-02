


Model 层
连接数据库，增删改查数据库。

Controller 层
1. 接收和发送 http 请求，根据接收到的 http 请求，调用 model 层获取数据，处理后，然后响应。
2. 编写中间件，记录日志、错误处理、404等处理。

View 层
将 Model 层数据注入 View 层，通过 Next.js 实现服务端渲染。


