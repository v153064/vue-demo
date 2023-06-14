<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import route from '../../router/index'
import {survey_question_edit,userinfo_all,survey_cate_all,survey_item_all,survey_question_all,survey_assembly_all,
  survey_assembly_add,
  survey_assembly_edit,
  survey_assembly_delete,
  survey_assembly_one } from "../../http/survey"
onMounted(()=>{  
  var url=window.location.href
  var reg=/[?&]([^?&#]+)=([^?&#]+)/g;
  var param={};
  var ret =  reg.exec(url);
  while(ret){ 
      param[ret[1]]=ret[2];
      ret = reg.exec(url);
  }
  //console.log(param)
  if(param.id!=null && param.id!=='' ){
    search.value=param.id
  }
  getTableData() 
})
const tableDataAll=ref([])
const cateAll=ref([])
const itemAll=ref([])
const questionAll=ref([])
const userDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const saveVisible = ref(false)
const saveVisible3 = ref(false)
const diyid = ref(false)
const diyuser = ref(false)
const pw = ref(false)
const sname = ref('')
const squestonIds = ref('')
const saveDto=ref({id:null,name:'',password:'',surveyQuestonIds:'',published:'',createTime:'',updateTime:'',userId:null})
const saveDto3=ref({})
const pageinfo = ref({colums: [],current: 1,size: 5,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{
  return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)
})
const goto=(index)=>{
  console.log(index)
  saveDto3.value=JSON.parse(JSON.stringify(getQuestion(index)))
  saveDto3.value.surveyItemIds=saveDto3.value.surveyItemIds.split(',').map(Number)
  saveVisible3.value=true
}
const changeSurveyItemIds=(arr)=>{
    var str=""
    for(var i=0;i<arr.length;i++){
      if(i===arr.length-1)
      str+=arr[i]
      else
      str+=arr[i]+","
    }
    return str
}
const onOk2=()=>{
  saveDto3.value.surveyItemIds=changeSurveyItemIds(saveDto3.value.surveyItemIds)
  survey_question_edit(saveDto3.value).then(response => {
        if(response.success===true){
          ElMessage({
                message: '修改成功!',
                type: 'success',
              })
            saveVisible3.value=false 
            ElMessageBox.close(false)
            getTableData2()  
        }else ElMessage.error('修改失败!')
    }).catch(error => {
        console.log(error)
        ElMessage.error('发生错误!')
    })
}
const open = (QuestonIds,name) => {
  squestonIds.value=QuestonIds
  sname.value=name
  var arr=QuestonIds.split(',').map(Number)
  var p=[]
  p.push(h('span', null, '组卷名称: '+name))
  p.push(h('br',null,null))
  p.push(h('br',null,null))
  for(var i=0;i<arr.length;i++){
    const temp=arr[i]
    p.push(h('span',null,'('+getCate(getQuestion(arr[i]).surveyCateId).cateName+')'+ getQuestion(arr[i]).content))
    p.push(h('button', {
      onClick: () => goto(temp)
    },'编辑'))
    p.push(h('br',null,null))
    var arr2=getItems(getQuestion(arr[i]).surveyItemIds)
      for(var j=0;j<arr2.length;j++){
        p.push(h('span', null,(j+1)+'.'+arr2[j]))
        p.push(h('br',null,null))
      }
      p.push(h('br',null,null))
  }
  ElMessageBox({
    title: '题目列表',
    message: h('p', null, p,
    ),
  })
}
const arrySort=()=>{
  tableDataAll.value=sortKey(tableDataAll.value,'id')
}
const getUser=(id)=>{
  for(var i=0;i<userDataAll.value.length;i++){
    if(userDataAll.value[i].id==id){
      return userDataAll.value[i]
    }
  }
  return {userName:"查询不到用户",userType:"查询不到用户"}
}
const getCate=(id)=>{
  for(var i=0;i<cateAll.value.length;i++){
    if(cateAll.value[i].id==id){
      return cateAll.value[i]
    }
  }
  return {cateName:"查询不到类型"}
}
const getItem=(id)=>{
  for(var i=0;i<itemAll.value.length;i++){
    if(itemAll.value[i].id==id){
      return itemAll.value[i]
    }
  }
  return {item:"查询不到试题项"}
}
const getQuestion=(id)=>{
  for(var i=0;i<questionAll.value.length;i++){
    if(questionAll.value[i].id==id){
      return questionAll.value[i]
    }
  }
  return {item:"查询不到试题项"}
}
const getItems=(ids)=>{
  var arr = [];
  var res = [];
  arr  = ids.split(',')
  for(var i=0;i<arr.length;i++){
    res.push(getItem(arr[i]).item)
  }
  return res
}
function sortKey(array,key){
                return array.sort(function(a,b){
                    var x = a[key];
                    var y = b[key];
                    return ((x<y)?-1:(x>y)?1:0)
                })
            }
const getTableData=()=>{
    if(search.value===null){
        survey_assembly_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyAssemblys
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
      
    }else{
        survey_assembly_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyAssembly]
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('查询不到数据!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('查询不到数据!')
        })
    }
      survey_cate_all().then(response => {
            if(response.success===true){
              cateAll.value=response.data.surveyCates
            }
        }).catch(error => {
            console.log(error)
        })
      survey_item_all().then(response => {
            if(response.success===true){
              itemAll.value=response.data.surveyItems
            }
        }).catch(error => {
            console.log(error)
        })
      survey_question_all().then(response => {
            if(response.success===true){
              questionAll.value=response.data.surveyQuestions
            }
        }).catch(error => {
            console.log(error)
        })
      userinfo_all().then(response => {
            if(response.success===true){
              userDataAll.value=response.data.userinfos
            }
        }).catch(error => {
            console.log(error)
        })
}
const getTableData2=()=>{
    if(search.value===null){
        survey_assembly_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyAssemblys
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
      
    }else{
        survey_assembly_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyAssembly]
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('查询不到数据!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('查询不到数据!')
        })
    }
      survey_cate_all().then(response => {
            if(response.success===true){
              cateAll.value=response.data.surveyCates
            }
        }).catch(error => {
            console.log(error)
        })
      survey_item_all().then(response => {
            if(response.success===true){
              itemAll.value=response.data.surveyItems
            }
        }).catch(error => {
            console.log(error)
        })
      survey_question_all().then(response => {
            if(response.success===true){
              questionAll.value=response.data.surveyQuestions
              open(squestonIds.value,sname.value)
            }
        }).catch(error => {
            console.log(error)
        })
      userinfo_all().then(response => {
            if(response.success===true){
              userDataAll.value=response.data.userinfos
            }
        }).catch(error => {
            console.log(error)
        })
}
const handleEdit = (row) => {
  saveDto.value=JSON.parse(JSON.stringify(row))
  todo.value=1
  res.value=""
  checkUserId()
  saveDto.value.surveyQuestonIds=saveDto.value.surveyQuestonIds.split(',').map(Number)
  diyid.value=false
  diyuser.value=false
  if(saveDto.value.password===''||saveDto.value.password==null){
    pw.value=false
  }else{
    pw.value=true
  }
  saveVisible.value=true
}
const handleDelete = (row) => {
  survey_assembly_delete(row.id).then(response => {
            if(response.success===true){
              getTableData()
              ElMessage({
                message: '删除成功!',
                type: 'success',
              })
            }else ElMessage.error('删除失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('删除失败!')
        })
}
const insertTableData= () => {
    saveDto.value={id:null,name:'',password:'',surveyQuestonIds:'',published:'',createTime:'',updateTime:'',userId:null}
    todo.value=0
    res.value=""
    userName.value="请输入用户编号进行查询"
    userType.value="请输入用户编号进行查询"
    diyid.value=false
    diyuser.value=false
    pw.value=false
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.name===""){res.value="组卷名称不能为空!";return}
    if(saveDto.value.surveyQuestonIds==="" || saveDto.value.surveyQuestonIds.length===0){res.value="请选择问卷试题!";return}
    if(saveDto.value.published===""){res.value="请选择发布情况!";return}
    if(diyuser.value && (saveDto.value.userId===null||saveDto.value.userId==="")){res.value="用户编号不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
}
const changeSurveyQuestonIds=(arr)=>{
    var str=""
    for(var i=0;i<arr.length;i++){
      if(i===arr.length-1)
      str+=arr[i]
      else
      str+=arr[i]+","
    }
    return str
}
const changePassword = (value) =>{
    if(value==='' || value==null)
    return '无密码'
    else return value
}
const changeDate = (value) =>{
    var dt = new Date(value)
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2,'0')
    let date = dt.getDate().toString().padStart(2,'0')
    let hour = dt.getHours().toString().padStart(2,'0')
    let minute = dt.getMinutes().toString().padStart(2,'0')
    let second = dt.getSeconds().toString().padStart(2,'0')
    return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`
}
const insertData=()=>{
  if(!diyid.value){
    saveDto.value.id=null
  }
  if(!diyuser.value){
    var user=JSON.parse(window.localStorage.getItem("userinfo"))
    saveDto.value.userId=user.userinfo.id
  }
  if(!pw.value){
    saveDto.value.password=null
  }
  saveDto.value.surveyQuestonIds=changeSurveyQuestonIds(saveDto.value.surveyQuestonIds)
  survey_assembly_add(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '添加成功!',
                type: 'success',
              })
        }else ElMessage.error('添加失败!')
    }).catch(error => {
        console.log(error)
        ElMessage.error('添加失败!')
        res.value='添加失败!'
    })
}
const updateData=()=>{
  var now = new Date().getTime();
  saveDto.value.updateTime=now;
  if(!pw.value){
    saveDto.value.password=null
  }
  saveDto.value.surveyQuestonIds=changeSurveyQuestonIds(saveDto.value.surveyQuestonIds)
  survey_assembly_edit(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '修改成功!',
                type: 'success',
              })
        }else ElMessage.error('修改失败!')
    }).catch(error => {
        console.log(error)
        ElMessage.error('修改失败!')
        res.value='修改失败!'
    })
}
const userName=ref("请输入用户编号进行查询")
const userType=ref("请输入用户编号进行查询")
const checkUserId=()=>{
  if(saveDto.value.userId==""){
    userName.value="请输入用户编号进行查询"
    userType.value="请输入用户编号进行查询"
    return 
  }
  userName.value=getUser(saveDto.value.userId).userName
  userType.value=getUser(saveDto.value.userId).userType
}
const shuaxin=()=>{
  search.value=null
  getTableData()
}
</script>
<template>
<div style="position: absolute;width: 1200px; left: 140px;top: 120px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">调查问卷组卷表</p>
<el-button @click="shuaxin" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData"  border>
    <el-table-column label="编号" prop="id" width="80" sortable/>
    <el-table-column label="组卷名称" prop="name" width="150"/>
    <el-table-column label="组卷密码" width="130">
      <template #default="scope">
        {{changePassword(scope.row.password)}}
      </template>
    </el-table-column>
    <el-table-column label="发布" width="90">
      <template #default="scope">
        <el-tag>{{ scope.row.published }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="160" prop="createTime" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ changeDate(scope.row.createTime) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" width="160" prop="updateTime" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ changeDate(scope.row.updateTime) }}</span>
        </div>
      </template>
    </el-table-column>
    <!--<el-table-column label="试题类型" width="120">
      <template #default="scope">
        {{ getCate(scope.row.surveyCateId).cateName }}
      </template>
    </el-table-column>
    <el-table-column label="调查问卷项" width="200">
      <template #default="scope">
        <div v-for="(item,index) in getItems(scope.row.surveyItemIds)">
        {{index+1}}: {{item}}
        </div>
      </template>
    </el-table-column>-->

    <el-table-column label="创建用户" width="120">
      <template #default="scope">
        {{ getUser(scope.row.userId).userName }}
      </template>
    </el-table-column>
    <el-table-column label="试题列表" width="130">
      <template #default="scope">
        <el-button size="small" type="primary" @click="open(scope.row.surveyQuestonIds,scope.row.name)">查看试题列表</el-button>
      </template>
    </el-table-column>
    <el-table-column align="right" width="180">
      <template #header>
        <el-input-number :controls="false" v-model="search" size="small" placeholder="按编号查找" style="width: 90px;margin-right: 10px;"/>
        <el-button size="small" type="primary" @click="getTableData">搜索</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确认删除该记录?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger" @click="">删除</el-button>
          </template>
        </el-popconfirm>  
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="" style="float: right;margin-top: 20px;" :page-size="pageinfo.size" :pager-count="11" layout="prev, pager, next" v-model:total="pageinfo.total" v-model:current-page="pageinfo.current"/>
</div>
<el-dialog v-model="saveVisible" :title="title" width="30%">
    <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="编号" v-if="todo===1">
        <el-input type="number" disabled v-model="saveDto.id" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="组卷名称">
        <el-input v-model="saveDto.name" placeholder="请输入组卷名称"/>
        </el-form-item>
        <el-form-item label="">
        <el-checkbox v-model="pw" label="需要密码"/>
        </el-form-item>
        <el-form-item label="组卷密码" v-if="pw">
        <el-input v-model="saveDto.password" placeholder="请输入组卷密码"/>
        </el-form-item>
        <el-form-item label="试题列表">
        <el-select v-model="saveDto.surveyQuestonIds" class="m-2" placeholder="请选择问卷试题" :multiple="true">
          <el-option
            v-for="item in questionAll"
            :key="item.id"
            :label="/*'['+item.id+'] '+*/'('+getCate(item.surveyCateId).cateName+')'+item.content"
            :value="item.id"
            
          />
        </el-select>
        </el-form-item>
        <el-form-item label="发布情况">
        <el-radio-group v-model="saveDto.published">
        <el-radio label="发布" />
        <el-radio label="未发布" />
        </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="todo===0">
        <el-checkbox v-model="diyid" label="自定义编号"/>
        <el-checkbox v-model="diyuser" label="自定义用户" />
        </el-form-item>
        <el-form-item label="" v-if="todo===1">
        <el-checkbox v-model="diyuser" label="修改创建用户" />
        </el-form-item>
        <el-form-item label="编号" v-if="todo===0 && diyid">
        <el-input type="number" v-model="saveDto.id" placeholder="请输入编号" clearable />
        </el-form-item>
        <el-form-item label="用户编号"  v-if="diyuser">
        <el-input @input="checkUserId" type="number" v-model="saveDto.userId" placeholder="请输入用户编号"/>
        </el-form-item>
        <el-form-item label="用户名"  v-if="diyuser">
        <p style="color: blue;margin-top: 0px;">{{userName}}</p>
        </el-form-item>
        <!--<el-form-item label="用户类型" style="margin-top: -25px;">
        <p style="color: blue;margin-top: 0px;">{{userType}}</p>
        </el-form-item>-->
    </el-form>
    <p style="float: left;margin-left: 100px;margin-top: 0px;margin-bottom: 0px;color: red;">{{res}}</p>
    <template #footer>
      <span>
        <el-button @click="()=>{saveVisible=false}">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
</el-dialog>
<el-dialog v-model="saveVisible3" title="编辑试题" width="30%">
    <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="问卷试题">
        <el-input v-model="saveDto3.content" placeholder="请输入问卷试题"/>
        </el-form-item>
        <el-form-item label="试题类型">
        <el-select v-model="saveDto3.surveyCateId" class="m-2" placeholder="请选择问卷类型">
          <el-option
            v-for="item in cateAll"
            :key="item.id"
            :label="item.cateName"
            :value="item.id"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="选项列表">
        <el-select v-model="saveDto3.surveyItemIds" class="m-2" placeholder="请选择调查问卷项" :multiple="true">
          <el-option
            v-for="item in itemAll"
            :key="item.id"
            :label="item.item"
            :value="item.id"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
        <el-input v-model="saveDto3.description" placeholder="请输入详细说明"/>
        </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="()=>{saveVisible3=false}">取消</el-button>
        <el-button type="primary" @click="onOk2">确定</el-button>
      </span>
    </template>
</el-dialog>
</template>
<style scoped>
</style>