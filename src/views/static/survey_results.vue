<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import {userinfo_all,survey_cate_all,survey_item_all,survey_question_all,survey_assembly_all,survey_results_all,
  survey_results_add,
  survey_results_edit,
  survey_results_delete,
  survey_results_one } from "../../http/survey"
onMounted(()=>{ getTableData() })
const tableDataAll=ref([])
const cateAll=ref([])
const itemAll=ref([])
const questionAll=ref([])
const assemblyAll=ref([])
const userDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const saveVisible = ref(false)
const diyid = ref(false)
const diyuser = ref(false)
const saveVisible2 = ref(false)
const saveDto=ref({id:null,serveyListId:null,results:'',createTime:'',userId:null})
const pageinfo = ref({colums: [],current: 1,size: 5,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{
  return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)
})
const open = (serveyListId,results) => {
  var p=[]
  var arr=getAssembly(serveyListId).surveyQuestonIds.split(',').map(Number)
  var arr1=[]
  var arr2=results.split(';')
  for(var i=0;i<arr2.length;i++){
    var arr3=arr2[i].split('-')
    arr1.push(arr3[1])
  }
  p.push(h('span', null, '组卷名称: '+getAssembly(serveyListId).name))
  p.push(h('br',null,null))
  p.push(h('br',null,null))
  for(var i=0;i<arr.length;i++){
    p.push(h('span', null,'('+getCate(getQuestion(arr[i]).surveyCateId).cateName+')'+ getQuestion(arr[i]).content))
    p.push(h('br',null,null))
    var arr5=getItems(arr1[i])
    p.push(h('span', null,'答: '))
      for(var j=0;j<arr5.length;j++){
        p.push(h('span', null,arr5[j].item))
        if(j!=arr5.length-1)
        p.push(h('span', null,'; '))
      }
      p.push(h('br',null,null))
      p.push(h('br',null,null))
  }
  ElMessageBox({
    title: '问卷结果',
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
  if(id==="") return {id:0,item:"未作答"}
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
const getQuestions=(ids)=>{
  var arr = [];
  var res = [];
  arr  = ids.split(',')
  for(var i=0;i<arr.length;i++){
    res.push(getQuestion(arr[i]))
  }
  return res
}
const getAssembly=(id)=>{
  for(var i=0;i<assemblyAll.value.length;i++){
    if(assemblyAll.value[i].id==id){
      return assemblyAll.value[i]
    }
  }
  return {name:"查询不到组卷"}
}
const getItems=(ids)=>{
  var arr = [];
  var res = [];
  arr  = ids.split(',')
  for(var i=0;i<arr.length;i++){
    res.push(getItem(arr[i]))
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
        survey_results_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyResults
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
      
    }else{
        survey_results_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyResult]
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
      survey_assembly_all().then(response => {
            if(response.success===true){
              assemblyAll.value=response.data.surveyAssemblys
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
  var arr=[]
  var arr1=saveDto.value.results.split(';')
  for(var i=0;i<arr1.length;i++){
    var arr2=arr1[i].split('-')
    var arr3=arr2[1].split(',').map(Number)
    if(arr3[0]===0 && arr3.length===1){
      arr.push('')
    }else{
      arr.push(arr3)
    }

  }
  answerList.value=arr
  diyid.value=false
  diyuser.value=false
  saveVisible.value=true
}
const handleDelete = (row) => {
  survey_results_delete(row.id).then(response => {
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
    saveDto.value={id:null,serveyListId:null,results:'',createTime:'',userId:null}
    todo.value=0
    res.value=""
    userName.value="请输入用户编号进行查询"
    userType.value="请输入用户编号进行查询"
    answerList.value=[]
    diyid.value=false
    diyuser.value=false
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.serveyListId==null||saveDto.value.serveyListId===""){res.value="请选择问卷!";return}
    if(saveDto.value.results===""){res.value="请添加问卷结果!";return}
    if(diyuser.value && (saveDto.value.userId==null||saveDto.value.userId==="")){res.value="用户编号不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
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
  survey_results_add(saveDto.value).then(response => {
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
  survey_results_edit(saveDto.value).then(response => {
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
const addAnswer=()=>{
  if(saveDto.value.serveyListId==null ){
    res.value="请选择组卷!"
    return
  }
  res.value=""
  res2.value=""
  saveVisible2.value=true
}
const answerList=ref([])
const res2=ref("")
const addAnswer2=()=>{
  var arr1=getAssembly(saveDto.value.serveyListId).surveyQuestonIds.split(',').map(Number)
  var str=""
  for(var i=0;i<arr1.length;i++){
    answerList.value.push([])
  }
  for(var i=0;i<arr1.length;i++){
    str=str+arr1[i]+"-"
    var arr2=answerList.value[i];
    for(var j=0;j<arr2.length;j++){
      if(j===arr2.length-1)
      str=str+arr2[j]
      else
      str=str+arr2[j]+","
    }
    if(i!==arr1.length-1)
    str=str+";"
  }
  saveDto.value.results=str
  saveVisible2.value=false
}
</script>
<template>
<div style="position: absolute;width: 1200px; left: 140px;top: 120px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">调查问卷结果表</p>
<el-button @click="shuaxin" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData"  border>
    <el-table-column label="编号" prop="id" width="100" sortable/>
    <el-table-column label="组卷名称" width="300">
      <template #default="scope">
        <router-link :to="'/survey/assembly?id='+scope.row.serveyListId">{{getAssembly(scope.row.serveyListId).name}}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="创建用户" width="200">
      <template #default="scope">
        {{ getUser(scope.row.userId).userName }}
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
    <el-table-column label="问卷结果" width="240">
      <template #default="scope">
        <el-button size="small" type="primary" @click="open(scope.row.serveyListId,scope.row.results)">查看问卷结果</el-button>
      </template>
    </el-table-column>
    <el-table-column align="right" width="200">
      <template #header>
        <el-input-number :controls="false" v-model="search" size="small" placeholder="按编号查找" style="width: 110px;margin-right: 10px;"/>
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
        <el-select v-model="saveDto.serveyListId" class="m-2" placeholder="请选择组卷">
          <el-option
            v-for="item in assemblyAll"
            :key="item.id"
            :label="/*'['+item.id+'] '+*/'('+item.published+')'+item.name"
            :value="item.id"   
          />
        </el-select>
        </el-form-item>
        <el-form-item label="问卷结果">
          <el-button size="small" type="primary" @click="addAnswer()" v-if="todo===0">添加问卷结果</el-button>
          <el-button size="small" type="primary" @click="addAnswer()" v-else>修改问卷结果</el-button>
        </el-form-item>
        <!--<el-form-item label="用户类型" style="margin-top: -25px;">
        <p style="color: blue;margin-top: 0px;">{{userType}}</p>
        </el-form-item>-->
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
    </el-form>
    <p style="float: left;margin-left: 100px;margin-top: 0px;margin-bottom: 0px;color: red;">{{res}}</p>
    <template #footer>
      <span>
        <el-button @click="()=>{saveVisible=false}">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
</el-dialog>
<el-dialog v-model="saveVisible2" title="问卷结果" width="30%" :before-close="addAnswer2">
    <el-form label-width="100px" style="max-width: 460px" v-for="(item,index) in getQuestions(getAssembly(saveDto.serveyListId).surveyQuestonIds)">
      <el-form-item label="问卷试题">
        {{ '('+getCate(item.surveyCateId).cateName+')'+item.content }}
      </el-form-item>
      <el-form-item label="问卷结果">
        <el-select v-model="answerList[index]" class="m-2" placeholder="请选择答案" :multiple="true">
          <el-option
            v-for="item2 in getItems(item.surveyItemIds)"
            :key="item2.id"
            :label="item2.item"
            :value="item2.id"    
          />
        </el-select>
      </el-form-item>
    </el-form>
    <p style="float: left;margin-left: 100px;margin-top: 0px;margin-bottom: 0px;color: red;">{{res2}}</p>
    <template #footer>
      <span>
        <el-button @click="addAnswer2" type="primary">确定</el-button>
      </span>
    </template>
</el-dialog>
</template>
<style scoped>
</style>