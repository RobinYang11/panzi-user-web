
interface Window {
  user: any;
}
//返场记录项目实体

// 团队实体
interface ITeam {
  id?: number;

  // 用户实体
  userBean?:IUser;

  // 团队名称
  teamName?: tring;

  //logo
  logo?: string;

  //成员数量
  membersAmount?: number;

  //有效时间
  validTime?: number;

  // 创建时间
  creationTime?: number;

  //计费方式
  pricingModel?: string;

  // 套餐实体
  setMealBean?: SetMealBean;

  //团队状态
  teamState?: number;

  level?: number;
}

//记录项目
interface IRecordProject {
  
  id: number;
  //个人版巡场记录的项目名
  name: string;
  //巡场项目创建者
  creator?: IUser ;
  tmCreate?: string;
  tmModify?: string;
  //1 未删除 || 2 已删除
  isDeleted: number;
  // logo图片
  logo:string;
  page:number;
  // 是否为默认logo: null 非默认 || 1 默认
  isDefaultLogo:string 
}

// 用户实体
interface IUser {
  id?: number;
  name?: string;
  nickname?: string;
  phone?: string;
  password?: string;
  sex?: number;
  registry_time?: number
  disabled?: number;
  email?: string
  avator?: string;
  is_admin?:number;
  company?:number;
  department?:number;
  is_proxy?:number;
  is_export_free?:number;
}

// 文档实体
interface IDocument{
    //文档id
    id: number ;
    //文档地址
    url: string ;
    //创建者
    creator: number ;
    //项目id
    projectId: number ;
    //文档类型 file || folder
    type: string ;
    //文件夹名
    name: string ;
    // 父级文档id
    parentId: number ;
    //子集文档
    children: Array<IDocument> ;
    //是否删除 1 未删除 || 2 已删除
    isDiscard: number;
    //团队id
    teamId: number ;
}

// 图纸实体
interface IDesign {
    id:number;
    //图纸地址
    url: string ;
    //创建者
    creator: number ;
    //项目id
    projectId: number ;
    //文件类型 file || folder
    type: string ;
    //文件夹名
    name: string ;
    //父级文件夹id
    parentId: number ;
    //子集图纸
    children: Array<Design> ;
    //是否删除
    isDiscard:number;
}

// 记录详情实体
interface IRecordDocument {

   id: number ;
   // 标准项id
   actionId: string ;
   //团队id
   teamId :number ;
   //项目id
   projectId: number ;
   //个人版的团队项目id
   recordProjectId:number ;
   //创建者id
   creatorId:number ;
   //创建者
   creator :IUser ;
   //专业
   major :string ;
   //类型
   type: string ;
   //周期
   period :string ;
   //问题描述
   description: string ;
   //严重等级 严重 1 || 重要 2 || 一般 3
   level:number ;
   //状态  未处理 1 | 已处理 2
   status :number ;
   //创建时间
   tmCreate :string ;
   //修改时间
   tmModify: string ;
   //问题图片
   imgs: Array<any> ;
   //问题标签
   tags :Array<string> ;
   //问题整改意见
   suggestion :string ;
   //整改图片
   repairedImages :Array<any> ;
   //删除记录 未删除1 || 已删除2
   isDeleted :number ;
   //整改人姓名
   updaterName :string ;
   //是否为标准动作: 标准动作 1 || 非标准动作 2
   isStandard :number ;
   //标准项说明
   actionDescription :string ;
   //最近一次操作时间
   tmLatestOperation: string ;
   //验收时间
   tmUpdateStatus: string ;
   //查询结果中最早一条记录的创建时间
   earliestTmCreate: string ;
   //追评时间
   tmLatestComment: string ;
    //有无追评 1 有追评 || 2 无追评
   hasComment: number ;
   //追评内容
   recordComment:Array<IRecordCommentDocument> ;
   //整改描述
   reply: string ;
}

// 评论实体
interface IRecordCommentDocument{

  id: string ;
  //返场记录id
  recordId:string ;
  //追评问题
  description: string ;
  //问题图片
  imgs:Array<any> ;
  //追评时间
  tmCreate: string ;
}


/**
 * 导出记录实体
 * 返场记录多条件查询接口的请求对象
 */
interface  IRecordFilterReq {

    /**
     * 团队id（与项目id并存）
     */
    teamId :number ;

    /**
     * 项目id（必须）
     */
    project:number ;

    /**
     * 个人版巡场记录的项目id
     */
    recordProjectId:number;

    /**
     * 时间周期值查询：
     * 按固定时间查询：一周内 || 两周内 || 一个月内 || 两个月内
     */
    tmPeriod:string ;

    /**
     * 时间查询：
     * 按起止时间条件查询：起始时间
     */
    tmStart :string ;

    /**
     * 时间查询：
     * 按起止时间条件查询：截至时间
     */
    tmEnd :string ;

    /**
     * 按专业筛选（返场标准动作一级分类）
     */
    major:Array<string> ;

    /**
     * 搜索的关键字
     */
    keyword :string ;

    /**
     * 整改状态： 未处理 1 || 已处理 2
     */
    status :number ;

    /**
     * 严重等级 严重 1 || 重要 2 || 一般 3
     */
    level:Array<number>;

     /**
     * 筛选用，多选，是否有追评： 1 有追评 || 2 无追评
     */
    hasComment: Array<number> ;

    /**
      * 导出用，单选，是否导出追评： 1 有追评 || 2 无追评
     */
    isExportComment:number;

    /**
     * 身份： 自己 1 || 所有人 2
     */
    isSelf :number ;

     /**
     * 标签入参，可传多个：地下室，楼栋，景观，场地，户型
     */
    tags :Array<string>;

    /**
     * 发送到邮箱地址
     */
    email: string ;
    //导出文件格式: 传参值为 word || excel || ppt
    exportType:Array<string> ;
    //排序类型: 1 最近编辑时间 || 2 创建时间最近 || 3 创建时间最远 || 4 整改时间最近 || 5 严重程度最高 || 6 追评时间最近
    sortType: number;
    // ppt模板实体
    pptDocument: PptDocument ; 
    //导出word样式： 1 横板 || 2 竖版  (默认传2)
    isHorizontal:number ;
    //导出文件是否同步到个人文档  1 勾选代表同步 || 2 不勾选代表不同步
    saveToMyDocument: number ;
}

// PPT实体类
interface PptDocument {

  id: string ;
  //个人版项目id
  recordProjectId: number ;
  //企业版团队id
  groupId: number ;
  //企业版项目id
  projectId: number ;
  //ppt模板名
  fileName: string ;
  //下载链接
  url: string ;
  //上传模板时间
  tmCreate: number ;
  //创建者id
  creator: number ;
  // 1 未删除  || 2 已删除
  isDeleted: number ;
}

// 缺陷库实体
interface Idefect{
// 描述
description:string;

id:	string;

// 标记类型: null 无 || 1 独家漫画 || 2 独家视频
markType:string;

// 附件媒体
medias:Array<string>;

page:	number;
pageSize:number;

// 状态 1 为发布 2草稿 3为已删除
status:number;

// 标签
tags:Array<string>	

// 创建时间
tmCreate:string

// 修改时间
tmModify:string

total:number
// 类型
type:	string
}

