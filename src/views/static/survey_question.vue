<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {survey_item_add,userinfo_all,survey_cate_all,survey_item_all,survey_question_all,survey_question_add,survey_question_edit,survey_question_delete,survey_question_one } from "../../http/survey"
onMounted(()=>{ getTableData() })
const tableDataAll=ref([])
const cateAll=ref([])
const arrayxx=ref([{text:''}])
const itemAll=ref([])
const userDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const stxx = ref(null)
const saveVisible = ref(false)
const diyid = ref(false)
const diyuser = ref(false)
const saveDto=ref({id:null,content:'',description:'',surveyCateId:null,surveyItemIds:'',userId:null})
const pageinfo = ref({colums: [],current: 1,size: 5,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{
  return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)
})
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
        survey_question_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyQuestions
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
    }else{
        survey_question_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyQuestion]
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
  saveDto.value.surveyItemIds=saveDto.value.surveyItemIds.split(',').map(Number)
  diyid.value=false
  diyuser.value=false
  stxx.value=1
  saveVisible.value=true
}
const handleDelete = (row) => {
  survey_question_delete(row.id).then(response => {
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
    saveDto.value={id:null,content:'',description:'',surveyCateId:null,surveyItemIds:'',userId:null}
    todo.value=0
    res.value=""
    userName.value="请输入用户编号进行查询"
    userType.value="请输入用户编号进行查询"
    diyid.value=false
    diyuser.value=false
    stxx.value=null
    setxx()
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.content===""){res.value="问卷试题不能为空!";return}
    if(saveDto.value.surveyCateId==null||saveDto.value.surveyCateId===""){res.value="请选择问卷类型!";return}
    if(stxx.value==null){res.value="请选择选项来源!";return}
    if(stxx.value===0){
      for(var i=0;i<arrayxx.value.length;i++)
      {
        if(arrayxx.value[i].text===''){
          res.value="请输入完整的选项内容!"
          return
        } 
      }
    }
    if(stxx.value===1 && saveDto.value.surveyItemIds.length===0){res.value="请选择调查问卷项!";return}
    if(saveDto.value.description===""){res.value="详细说明不能为空!";return}
    if(diyuser.value && (saveDto.value.userId==null||saveDto.value.userId==="")){res.value="用户编号不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
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
function timeout() {
  return new Promise((resolve, reject) => {
    var z=0
      for(var i=0;i<arrayxx.value.length;i++){
        survey_item_add({item:arrayxx.value[i].text,userId:saveDto.value.userId}).then(response => {
            if(response.success===true){
              z++
              if(z===arrayxx.value.length) resolve('done')
                /*ElMessage({
                    message: '添加成功!',
                    type: 'success',
                  })*/
            }else {
              z++
              if(z===arrayxx.value.length) resolve('done')
              ElMessage.error('选项添加失败!')
            }
        }).catch(error => {
            z++
            if(z===arrayxx.value.length) resolve('done')
            console.log(error)
            ElMessage.error('选项添加失败!')
        })
      }
    } )
}
async function  insertData(){
  if(!diyid.value){
    saveDto.value.id=null
  }
  if(!diyuser.value){
    var user=JSON.parse(window.localStorage.getItem("userinfo"))
    saveDto.value.userId=user.userinfo.id
  }
  saveDto.value.surveyItemIds=changeSurveyItemIds(saveDto.value.surveyItemIds)
  let result = await timeout()
    console.log(result)
    survey_item_all().then(response => {
          if(response.success===true){
            itemAll.value=response.data.surveyItems
            var str=''
            for(var i=0;i<arrayxx.value.length;i++){
              for(var j=0;j<itemAll.value.length;j++){
                if(itemAll.value[j].item===arrayxx.value[i].text){
                  if(str==='')
                  str=itemAll.value[j].id
                  else
                  str=str+","+itemAll.value[j].id
                }
              }
            }
            saveDto.value.surveyItemIds=str
            survey_question_add(saveDto.value).then(response => {
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
      }).catch(error => {
          console.log(error)
      })
}
const updateData=()=>{
  saveDto.value.surveyItemIds=changeSurveyItemIds(saveDto.value.surveyItemIds)
  survey_question_edit(saveDto.value).then(response => {
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
const addxx=()=>{
  arrayxx.value.push({text:''})
}
const setxx=()=>{
  arrayxx.value=[{text:''}]
}
</script>
<template>
<div style="position: absolute;width: 1000px; left: 240px;top: 120px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">调查问卷试题表</p>
<el-button @click="shuaxin" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData"  border>
    <el-table-column label="编号" prop="id" width="80" sortable/>
    <el-table-column label="问卷试题" prop="content" width="150"/>
    <el-table-column label="试题类型" width="100">
      <template #default="scope">
        {{ getCate(scope.row.surveyCateId).cateName }}
      </template>
    </el-table-column>
    <el-table-column label="选项列表" width="200">
      <template #default="scope">
        <div v-for="(item,index) in getItems(scope.row.surveyItemIds)">
        {{index+1}}: {{item}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="详细说明" prop="description" width="150"/>
    <el-table-column label="创建用户" width="120">
      <template #default="scope">
        {{ getUser(scope.row.userId).userName }}
      </template>
    </el-table-column>
    <el-table-column align="right" width="200">
      <template #header>
        <el-input-number :controls="false" v-model="search" size="small" placeholder="按编号查找" style="width: 100px;margin-right: 20px;"/>
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
        <el-form-item label="问卷试题">
        <el-input v-model="saveDto.content" placeholder="请输入问卷试题"/>
        </el-form-item>
        <el-form-item label="试题类型">
        <el-select v-model="saveDto.surveyCateId" class="m-2" placeholder="请选择问卷类型">
          <el-option
            v-for="item in cateAll"
            :key="item.id"
            :label="item.cateName"
            :value="item.id"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="选项来源" v-if="todo===0">
        <el-select v-model="stxx" class="m-2" placeholder="请选择选项来源">
          <el-option
            v-for="item in [{id:0,title:'创建新选项'},{id:1,title:'从已有选项中选择'}]"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
        </el-form-item>
        <div v-for="(item,index) in arrayxx" v-if="stxx===0">
        <el-form-item :label="'选项'+(index+1)">
          <el-input v-model="item.text" placeholder="请输入选项内容"/>
        </el-form-item>
        </div>
        <el-form-item label="" v-if="stxx===0">
          <el-button @click="addxx">继续添加</el-button>
          <el-button @click="setxx">重置</el-button>
        </el-form-item>
        <el-form-item label="选项列表" v-if="stxx===1">
        <el-select v-model="saveDto.surveyItemIds" class="m-2" placeholder="请选择调查问卷项" :multiple="true">
          <el-option
            v-for="item in itemAll"
            :key="item.id"
            :label="item.item"
            :value="item.id"
          />
        </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
        <el-input v-model="saveDto.description" placeholder="请输入详细说明"/>
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
</template>
<style scoped>
</style>