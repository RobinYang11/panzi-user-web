
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

// 返场记录项目
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
  logo?:string;
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
    id :number ;
    //文档地址
    url?: string;
    //创建者
    creator?: IUser ;
    //项目id
    projectId?: number ;
    //文档类型 file || folder
    type?: string ;
    //文件夹名
    folderName?: string ;
    // 父级文档id
    parentId?:number ;
}

// 图纸实体
interface IDesign {
  //图纸id
  id: number ;
  //图纸地址
  url?: string ;
  //创建者
  creator?: IUser ;
  //项目id
  projectId?: number ;
  //文件类型 file || folder
  type?: string ;
  //文件夹名
  folderName?: string ;
  //父级文件夹id
  parent_id ?: number ;
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
   tmCreate :number ;
   //修改时间
   tmModify: string ;
   //问题图片
   imgs: Array<any> ;
   //问题标签
   tags :Array<String> ;
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
   //追评内容
   recordComment:Array<IRecordCommentDocument> ;
}


// 评论实体
interface IRecordCommentDocument{

  id: string ;
  //返场记录id
  recordId:String ;
  //追评问题
  description: String ;
  //问题图片
  imgs:List<any> ;
  //追评时间
  tmCreate: string ;
}