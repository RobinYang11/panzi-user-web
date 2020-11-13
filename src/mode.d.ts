

//返场记录项目实体
interface IReturnRecordProject {
  id?: number,
  name?: string,
  logo?: string,
}

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
  name?: string;
  //巡场项目创建者
  creator?: IUser ;
  tmCreate?: string;
  tmModify?: string;
  //1 未删除 || 2 已删除
  isDeleted?: number;
  logo?:string;
}

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