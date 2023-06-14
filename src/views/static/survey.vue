<template>
<el-menu
    default-active="/survey/question"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    style="height: 50px;margin-top: -10px;"
  >
    <p style="margin-right: 100px;margin-left: 20px;">微校园问卷管理</p>

    <el-menu-item index="/survey/question">问卷试题</el-menu-item>
    <el-menu-item index="/survey/assembly">问卷组卷</el-menu-item>
    <el-menu-item index="/survey/results">问卷结果</el-menu-item>
    <el-menu-item index="/survey/item">问卷选项</el-menu-item>
    <el-menu-item index="/survey/cate">问卷题型</el-menu-item>
    <el-icon :size="25" color="#5599ff" style="float: right; margin-left: 600px;margin-top: 12px;"><UserFilled /></el-icon>
    <p style="float: right; margin-left: 12px;color: #5599ff;font-size: 14px;margin-top: 16px;">{{getUsername()}}</p>
</el-menu>
<RouterView></RouterView> 
</template>
<script setup>
const getUsername=()=>{
  //console.log(window.localStorage.getItem("userinfo"))
  var user=JSON.parse(window.localStorage.getItem("userinfo"))
  return user.userinfo.userName
}
</script>

