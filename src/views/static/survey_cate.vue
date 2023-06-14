<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {survey_cate_all,survey_cate_add,survey_cate_edit,survey_cate_delete,survey_cate_one } from "../../http/survey"
onMounted(()=>{ getTableData() })
const tableDataAll=ref([])
const search = ref(null)
const todo = ref(0)
const diyid = ref(false)
const saveVisible = ref(false)
const saveDto=ref({id:null,cateName:''})
const pageinfo = ref({colums: [],current: 1,size: 10,total: 0})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const tableData = computed(()=>{return tableDataAll.value.slice(pageinfo.value.size * (pageinfo.value.current - 1), pageinfo.value.current * pageinfo.value.size)})
const arrySort=()=>{
  tableDataAll.value=sortKey(tableDataAll.value,'id')
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
        survey_cate_all().then(response => {
            if(response.success===true){
              tableDataAll.value=response.data.surveyCates
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('获取数据失败!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('获取数据失败!')
        })
    }else{
        survey_cate_one(search.value).then(response => {
            if(response.success===true){
              tableDataAll.value=[response.data.surveyCate]
              pageinfo.value.total=tableDataAll.value.length
              arrySort()
            }else ElMessage.error('查询不到数据!')
        }).catch(error => {
            console.log(error)
            ElMessage.error('查询不到数据!')
        })
    }  
}
const handleEdit = (row) => {
  saveDto.value=JSON.parse(JSON.stringify(row))
  todo.value=1
  res.value=""
  saveVisible.value=true
}
const handleDelete = (row) => {
  survey_cate_delete(row.id).then(response => {
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
    saveDto.value={id:null,cateName:''}
    todo.value=0
    res.value=""
    diyid.value=false
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.cateName===""){res.value="分类名称不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
}
const insertData=()=>{
  if(!diyid.value){
    saveDto.value.id=null
  }
  survey_cate_add(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
            ElMessage({
                message: '添加成功!',
                type: 'success',
              })
        }else {
          ElMessage.error('添加失败!')
          res.value='添加失败，编号或类型已存在!'
        }
    }).catch(error => {
        console.log(error)
        ElMessage.error('添加失败!')
        res.value='添加失败，编号或类型已存在!'
    })
}
const updateData=()=>{
  survey_cate_edit(saveDto.value).then(response => {
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
const shuaxin=()=>{
  search.value=null
  getTableData()
}
</script>
<template>
<div style="position: absolute;width: 1000px; left: 240px;top: 120px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">调查问卷题型表</p>
<el-button @click="shuaxin" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData"  border>
    <el-table-column label="编号" prop="id" width="300" sortable/>
    <el-table-column label="分类名称" prop="cateName" width="300"/>
    <el-table-column align="right" width="400">
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
        <el-form-item label="分类名称">
        <el-input v-model="saveDto.cateName" placeholder="请输入分类名称"/>
        </el-form-item>
        <el-form-item label="" v-if="todo===0">
        <el-checkbox v-model="diyid" label="自定义编号"/>
        </el-form-item>
        <el-form-item label="编号" v-if="todo===0 && diyid">
        <el-input type="number" v-model="saveDto.id" placeholder="请输入编号" clearable />
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
</template>
<style scoped>
</style>