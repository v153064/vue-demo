import{g as we,h as n,i as de,r as ke,o as v,c as R,d as V,a as s,w as u,F as q,b as i,t as k,A as Ce,k as y,l as U,j as X,R as _,f as Ee,S as Se}from"./index-180af58d.js";import{E as c,a as Ne,b as Ue,c as ze,d as De,e as Le,f as Ae,g as Te}from"./el-table-column-9b9bb6ff.js";import{E as $e,a as Be,b as Qe,c as Fe}from"./el-button-b0604719.js";import{w as Me,x as Oe,b as Je,c as Pe,s as Re,p as qe,u as He,y as Ke,z as Ye,A as Ge,E as We,g as Xe}from"./survey-15302bb4.js";import{E as Ze}from"./index-f74b8b62.js";const je={style:{position:"absolute",width:"1200px",left:"140px",top:"120px",padding:"20px","border-radius":"5px","border-color":"rgb(200, 200, 200)","border-width":"1px","border-style":"solid"}},el=V("p",{style:{"margin-top":"0px","margin-left":"10px","font-weight":"600",color:"#00000072"}},"调查问卷结果表",-1),ll={style:{display:"flex","align-items":"center"}},tl={style:{"margin-left":"10px"}},al={style:{color:"blue","margin-top":"0px"}},ul={style:{float:"left","margin-left":"100px","margin-top":"0px","margin-bottom":"0px",color:"red"}},sl={style:{float:"left","margin-left":"100px","margin-top":"0px","margin-bottom":"0px",color:"red"}},pl={__name:"survey_results",setup(rl){we(()=>{E()});const I=n([]),Q=n([]),F=n([]),M=n([]),z=n([]),O=n([]),D=n(null),x=n(0),w=n(!1),C=n(!1),b=n(!1),J=n(!1),o=n({id:null,serveyListId:null,results:"",createTime:"",userId:null}),f=n({colums:[],current:1,size:5,total:0}),ve=de(()=>x.value===0?"新增":"修改"),g=n(""),ie=de(()=>I.value.slice(f.value.size*(f.value.current-1),f.value.current*f.value.size)),pe=(l,e)=>{for(var a=[],r=L(l).surveyQuestonIds.split(",").map(Number),d=[],p=e.split(";"),m=0;m<p.length;m++){var A=p[m].split("-");d.push(A[1])}a.push(_("span",null,"组卷名称: "+L(l).name)),a.push(_("br",null,null)),a.push(_("br",null,null));for(var m=0;m<r.length;m++){a.push(_("span",null,"("+j(K(r[m]).surveyCateId).cateName+")"+K(r[m]).content)),a.push(_("br",null,null));var T=ee(d[m]);a.push(_("span",null,"答: "));for(var N=0;N<T.length;N++)a.push(_("span",null,T[N].item)),N!=T.length-1&&a.push(_("span",null,"; "));a.push(_("br",null,null)),a.push(_("br",null,null))}Ze({title:"问卷结果",message:_("p",null,a)})},Z=()=>{I.value=fe(I.value,"id")},H=l=>{for(var e=0;e<O.value.length;e++)if(O.value[e].id==l)return O.value[e];return{userName:"查询不到用户",userType:"查询不到用户"}},j=l=>{for(var e=0;e<Q.value.length;e++)if(Q.value[e].id==l)return Q.value[e];return{cateName:"查询不到类型"}},me=l=>{for(var e=0;e<F.value.length;e++)if(F.value[e].id==l)return F.value[e];return l===""?{id:0,item:"未作答"}:{item:"查询不到试题项"}},K=l=>{for(var e=0;e<M.value.length;e++)if(M.value[e].id==l)return M.value[e];return{item:"查询不到试题项"}},ce=l=>{var e=[],a=[];e=l.split(",");for(var r=0;r<e.length;r++)a.push(K(e[r]));return a},L=l=>{for(var e=0;e<z.value.length;e++)if(z.value[e].id==l)return z.value[e];return{name:"查询不到组卷"}},ee=l=>{var e=[],a=[];e=l.split(",");for(var r=0;r<e.length;r++)a.push(me(e[r]));return a};function fe(l,e){return l.sort(function(a,r){var d=a[e],p=r[e];return d<p?-1:d>p?1:0})}const E=()=>{D.value===null?Me().then(l=>{l.success===!0?(I.value=l.data.surveyResults,f.value.total=I.value.length,Z()):c.error("获取数据失败!")}).catch(l=>{console.log(l),c.error("获取数据失败!")}):Oe(D.value).then(l=>{l.success===!0?(I.value=[l.data.surveyResult],f.value.total=I.value.length,Z()):c.error("查询不到数据!")}).catch(l=>{console.log(l),c.error("查询不到数据!")}),Je().then(l=>{l.success===!0&&(Q.value=l.data.surveyCates)}).catch(l=>{console.log(l)}),Pe().then(l=>{l.success===!0&&(F.value=l.data.surveyItems)}).catch(l=>{console.log(l)}),Re().then(l=>{l.success===!0&&(M.value=l.data.surveyQuestions)}).catch(l=>{console.log(l)}),qe().then(l=>{l.success===!0&&(z.value=l.data.surveyAssemblys)}).catch(l=>{console.log(l)}),He().then(l=>{l.success===!0&&(O.value=l.data.userinfos)}).catch(l=>{console.log(l)})},ge=l=>{o.value=JSON.parse(JSON.stringify(l)),x.value=1,g.value="",le();for(var e=[],a=o.value.results.split(";"),r=0;r<a.length;r++){var d=a[r].split("-"),p=d[1].split(",").map(Number);p[0]===0&&p.length===1?e.push(""):e.push(p)}S.value=e,C.value=!1,b.value=!1,w.value=!0},ye=l=>{Ke(l.id).then(e=>{e.success===!0?(E(),c({message:"删除成功!",type:"success"})):c.error("删除失败!")}).catch(e=>{console.log(e),c.error("删除失败!")})},_e=()=>{o.value={id:null,serveyListId:null,results:"",createTime:"",userId:null},x.value=0,g.value="",P.value="请输入用户编号进行查询",Y.value="请输入用户编号进行查询",S.value=[],C.value=!1,b.value=!1,w.value=!0},be=()=>{if(g.value="",o.value.serveyListId==null||o.value.serveyListId===""){g.value="请选择问卷!";return}if(o.value.results===""){g.value="请添加问卷结果!";return}if(b.value&&(o.value.userId==null||o.value.userId==="")){g.value="用户编号不能为空!";return}x.value===0?xe():Ve()},he=l=>{var e=new Date(l);let a=e.getFullYear(),r=(e.getMonth()+1).toString().padStart(2,"0"),d=e.getDate().toString().padStart(2,"0"),p=e.getHours().toString().padStart(2,"0"),m=e.getMinutes().toString().padStart(2,"0"),A=e.getSeconds().toString().padStart(2,"0");return`${a}年${r}月${d}日 ${p}:${m}:${A}`},xe=()=>{if(C.value||(o.value.id=null),!b.value){var l=JSON.parse(window.localStorage.getItem("userinfo"));o.value.userId=l.userinfo.id}Ye(o.value).then(e=>{e.success===!0?(E(),w.value=!1,c({message:"添加成功!",type:"success"})):c.error("添加失败!")}).catch(e=>{console.log(e),c.error("添加失败!"),g.value="添加失败!"})},Ve=()=>{Ge(o.value).then(l=>{l.success===!0?(E(),w.value=!1,c({message:"修改成功!",type:"success"})):c.error("修改失败!")}).catch(l=>{console.log(l),c.error("修改失败!"),g.value="修改失败!"})},P=n("请输入用户编号进行查询"),Y=n("请输入用户编号进行查询"),le=()=>{if(o.value.userId==""){P.value="请输入用户编号进行查询",Y.value="请输入用户编号进行查询";return}P.value=H(o.value.userId).userName,Y.value=H(o.value.userId).userType},Ie=()=>{D.value=null,E()},te=()=>{if(o.value.serveyListId==null){g.value="请选择组卷!";return}g.value="",ae.value="",J.value=!0},S=n([]),ae=n(""),ue=()=>{for(var l=L(o.value.serveyListId).surveyQuestonIds.split(",").map(Number),e="",a=0;a<l.length;a++)S.value.push([]);for(var a=0;a<l.length;a++){e=e+l[a]+"-";for(var r=S.value[a],d=0;d<r.length;d++)d===r.length-1?e=e+r[d]:e=e+r[d]+",";a!==l.length-1&&(e=e+";")}o.value.results=e,J.value=!1};return(l,e)=>{const a=$e,r=De,d=ke("router-link"),p=Ee,m=We,A=Xe,T=Ne,N=Ue,G=Be,h=Qe,se=Le,re=Ae,W=Te,oe=Fe,ne=ze;return v(),R(q,null,[V("div",je,[el,s(a,{onClick:Ie,type:"primary",style:{position:"absolute",right:"120px",top:"17px"}},{default:u(()=>[i("刷新")]),_:1}),s(a,{onClick:_e,type:"success",style:{float:"right","margin-top":"-40px","margin-left":"-120px"}},{default:u(()=>[i("添加数据")]),_:1}),s(T,{data:ie.value,border:""},{default:u(()=>[s(r,{label:"编号",prop:"id",width:"100",sortable:""}),s(r,{label:"组卷名称",width:"300"},{default:u(t=>[s(d,{to:"/survey/assembly?id="+t.row.serveyListId},{default:u(()=>[i(k(L(t.row.serveyListId).name),1)]),_:2},1032,["to"])]),_:1}),s(r,{label:"创建用户",width:"200"},{default:u(t=>[i(k(H(t.row.userId).userName),1)]),_:1}),s(r,{label:"创建时间",width:"160",prop:"createTime",sortable:""},{default:u(t=>[V("div",ll,[s(p,null,{default:u(()=>[s(Ce(Se))]),_:1}),V("span",tl,k(he(t.row.createTime)),1)])]),_:1}),s(r,{label:"问卷结果",width:"240"},{default:u(t=>[s(a,{size:"small",type:"primary",onClick:$=>pe(t.row.serveyListId,t.row.results)},{default:u(()=>[i("查看问卷结果")]),_:2},1032,["onClick"])]),_:1}),s(r,{align:"right",width:"200"},{header:u(()=>[s(m,{controls:!1,modelValue:D.value,"onUpdate:modelValue":e[0]||(e[0]=t=>D.value=t),size:"small",placeholder:"按编号查找",style:{width:"110px","margin-right":"10px"}},null,8,["modelValue"]),s(a,{size:"small",type:"primary",onClick:E},{default:u(()=>[i("搜索")]),_:1})]),default:u(t=>[s(a,{size:"small",onClick:$=>ge(t.row)},{default:u(()=>[i("编辑")]),_:2},1032,["onClick"]),s(A,{title:"确认删除该记录?",onConfirm:$=>ye(t.row)},{reference:u(()=>[s(a,{size:"small",type:"danger",onClick:e[1]||(e[1]=()=>{})},{default:u(()=>[i("删除")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),s(N,{onCurrentChange:e[2]||(e[2]=()=>{}),style:{float:"right","margin-top":"20px"},"page-size":f.value.size,"pager-count":11,layout:"prev, pager, next",total:f.value.total,"onUpdate:total":e[3]||(e[3]=t=>f.value.total=t),"current-page":f.value.current,"onUpdate:currentPage":e[4]||(e[4]=t=>f.value.current=t)},null,8,["page-size","total","current-page"])]),s(ne,{modelValue:w.value,"onUpdate:modelValue":e[15]||(e[15]=t=>w.value=t),title:ve.value,width:"30%"},{footer:u(()=>[V("span",null,[s(a,{onClick:e[14]||(e[14]=()=>{w.value=!1})},{default:u(()=>[i("取消")]),_:1}),s(a,{type:"primary",onClick:be},{default:u(()=>[i("确定")]),_:1})])]),default:u(()=>[s(oe,{"label-width":"100px",style:{"max-width":"460px"}},{default:u(()=>[x.value===1?(v(),y(h,{key:0,label:"编号"},{default:u(()=>[s(G,{type:"number",disabled:"",modelValue:o.value.id,"onUpdate:modelValue":e[5]||(e[5]=t=>o.value.id=t),placeholder:"请输入编号"},null,8,["modelValue"])]),_:1})):U("",!0),s(h,{label:"组卷名称"},{default:u(()=>[s(re,{modelValue:o.value.serveyListId,"onUpdate:modelValue":e[6]||(e[6]=t=>o.value.serveyListId=t),class:"m-2",placeholder:"请选择组卷"},{default:u(()=>[(v(!0),R(q,null,X(z.value,t=>(v(),y(se,{key:t.id,label:"("+t.published+")"+t.name,value:t.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(h,{label:"问卷结果"},{default:u(()=>[x.value===0?(v(),y(a,{key:0,size:"small",type:"primary",onClick:e[7]||(e[7]=t=>te())},{default:u(()=>[i("添加问卷结果")]),_:1})):(v(),y(a,{key:1,size:"small",type:"primary",onClick:e[8]||(e[8]=t=>te())},{default:u(()=>[i("修改问卷结果")]),_:1}))]),_:1}),x.value===0?(v(),y(h,{key:1,label:""},{default:u(()=>[s(W,{modelValue:C.value,"onUpdate:modelValue":e[9]||(e[9]=t=>C.value=t),label:"自定义编号"},null,8,["modelValue"]),s(W,{modelValue:b.value,"onUpdate:modelValue":e[10]||(e[10]=t=>b.value=t),label:"自定义用户"},null,8,["modelValue"])]),_:1})):U("",!0),x.value===1?(v(),y(h,{key:2,label:""},{default:u(()=>[s(W,{modelValue:b.value,"onUpdate:modelValue":e[11]||(e[11]=t=>b.value=t),label:"修改创建用户"},null,8,["modelValue"])]),_:1})):U("",!0),x.value===0&&C.value?(v(),y(h,{key:3,label:"编号"},{default:u(()=>[s(G,{type:"number",modelValue:o.value.id,"onUpdate:modelValue":e[12]||(e[12]=t=>o.value.id=t),placeholder:"请输入编号",clearable:""},null,8,["modelValue"])]),_:1})):U("",!0),b.value?(v(),y(h,{key:4,label:"用户编号"},{default:u(()=>[s(G,{onInput:le,type:"number",modelValue:o.value.userId,"onUpdate:modelValue":e[13]||(e[13]=t=>o.value.userId=t),placeholder:"请输入用户编号"},null,8,["modelValue"])]),_:1})):U("",!0),b.value?(v(),y(h,{key:5,label:"用户名"},{default:u(()=>[V("p",al,k(P.value),1)]),_:1})):U("",!0)]),_:1}),V("p",ul,k(g.value),1)]),_:1},8,["modelValue","title"]),s(ne,{modelValue:J.value,"onUpdate:modelValue":e[16]||(e[16]=t=>J.value=t),title:"问卷结果",width:"30%","before-close":ue},{footer:u(()=>[V("span",null,[s(a,{onClick:ue,type:"primary"},{default:u(()=>[i("确定")]),_:1})])]),default:u(()=>[(v(!0),R(q,null,X(ce(L(o.value.serveyListId).surveyQuestonIds),(t,$)=>(v(),y(oe,{"label-width":"100px",style:{"max-width":"460px"}},{default:u(()=>[s(h,{label:"问卷试题"},{default:u(()=>[i(k("("+j(t.surveyCateId).cateName+")"+t.content),1)]),_:2},1024),s(h,{label:"问卷结果"},{default:u(()=>[s(re,{modelValue:S.value[$],"onUpdate:modelValue":B=>S.value[$]=B,class:"m-2",placeholder:"请选择答案",multiple:!0},{default:u(()=>[(v(!0),R(q,null,X(ee(t.surveyItemIds),B=>(v(),y(se,{key:B.id,label:B.item,value:B.id},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024))),256)),V("p",sl,k(ae.value),1)]),_:1},8,["modelValue"])],64)}}};export{pl as default};
