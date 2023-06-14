<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {userinfo_all,survey_item_all,survey_item_add,survey_item_edit,survey_item_delete,survey_item_one } from "../../http/survey"
onMounted(()=>{ getTableData() })
const tableDataAll=ref([])
const userDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const saveVisible = ref(false)
const diyid = ref(false)
const diyuser = ref(false)
const saveDto=ref({id:null,item:'',userId:null})
const pageinfo = ref({colums: [],current: 1,size: 10,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{
  return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)
})
const arrySort=()=>{
  tableDataAll.value=sortKey(tableDataAll.value,'id')
}
const getUser=(userid)=>{
  for(var i=0;i<userDataAll.value.length;i++){
    if(userDataAll.value[i].id==userid){
      return userDataAll.value[i]
    }
  }
  return {userName:"查询不到用户",userType:"查询不到用户"}
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
        survey_item_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyItems
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
    }else{
        survey_item_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyItem]
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('查询不到数据!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('查询不到数据!')
        })
    }
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
  diyid.value=false
  diyuser.value=false
  saveVisible.value=true
}
const handleDelete = (row) => {
  survey_item_delete(row.id).then(response => {
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
    saveDto.value={id:null,item:'',userId:null}
    todo.value=0
    res.value=""
    userName.value="请输入用户编号进行查询"
    userType.value="请输入用户编号进行查询"
    diyid.value=false
    diyuser.value=false
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.item===""){res.value="调查选项不能为空!";return}
    if(diyuser.value && (saveDto.value.userId==null||saveDto.value.userId==="")){res.value="用户编号不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
}
const insertData=()=>{
  if(!diyid.value){
    saveDto.value.id=null
  }
  if(!diyuser.value){
    var user=JSON.parse(window.localStorage.getItem("userinfo"))
    saveDto.value.userId=user.userinfo.id
  }
  survey_item_add(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '添加成功!',
                type: 'success',
              })
        }else {
          ElMessage.error('添加数据失败!')
          res.value='添加失败，编号或选项已存在!'
        }
    }).catch(error => {
        console.log(error)
        ElMessage.error('添加数据失败!')
        res.value='添加失败，编号或选项已存在!'
    })
}
const updateData=()=>{
  survey_item_edit(saveDto.value).then(response => {
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
<div style="position: absolute;width: 1000px; left: 240px;top: 120px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">调查问卷选项表</p>
<el-button @click="shuaxin" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData"  border>
    <el-table-column label="编号" prop="id" width="100" sortable/>
    <el-table-column label="问卷选项" prop="item" width="500"/>
    <!--<el-table-column label="用户编号" prop="userId" width="100"/>-->
    <el-table-column label="创建用户" width="200">
      <template #default="scope">
        {{ getUser(scope.row.userId).userName }}
      </template>
    </el-table-column>
    <!--<el-table-column label="用户类型" width="100">
      <template #default="scope">
        {{ getUser(scope.row.userId).userType }}
      </template>
    </el-table-column>-->
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
        <el-form-item label="问卷选项">
        <el-input v-model="saveDto.item" placeholder="请输入问卷选项"/>
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