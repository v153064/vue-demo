import instance from "./axios";
const survey_cate_add=(data)=>{
    return instance.request({
        url:'api/survey-cate/add',
        method:'post',
        data
    })
}
const survey_item_add=(data)=>{
    return instance.request({
        url:'api/survey-item/add',
        method:'post',
        data
    })
}
const survey_question_add=(data)=>{
    return instance.request({
        url:'api/survey-question/add',
        method:'post',
        data
    })
}
const survey_assembly_add=(data)=>{
    return instance.request({
        url:'api/survey-assembly/add',
        method:'post',
        data
    })
}
const survey_results_add=(data)=>{
    return instance.request({
        url:'api/survey-results/add',
        method:'post',
        data
    })
}
const survey_cate_delete=(params)=>{
    return instance.request({
        url:'api/survey-cate/delete/'+params,
    })
}
const survey_item_delete=(params)=>{
    return instance.request({
        url:'api/survey-item/delete/'+params,
    })
}
const survey_question_delete=(params)=>{
    return instance.request({
        url:'api/survey-question/delete/'+params,
    })
}
const survey_assembly_delete=(params)=>{
    return instance.request({
        url:'api/survey-assembly/delete/'+params,
    })
}
const survey_results_delete=(params)=>{
    return instance.request({
        url:'api/survey-results/delete/'+params,
    })
}
const survey_cate_one=(params)=>{
    return instance.request({
        url:'api/survey-cate/one/'+params,
    })
}
const survey_item_one=(params)=>{
    return instance.request({
        url:'api/survey-item/one/'+params,
    })
}
const survey_question_one=(params)=>{
    return instance.request({
        url:'api/survey-question/one/'+params,
    })
}
const survey_assembly_one=(params)=>{
    return instance.request({
        url:'api/survey-assembly/one/'+params,
    })
}
const survey_results_one=(params)=>{
    return instance.request({
        url:'api/survey-results/one/'+params,
    })
}
const survey_cate_edit=(data)=>{
    return instance.request({
        url:'api/survey-cate/edit',
        method:'post',
        data
    })
}
const survey_item_edit=(data)=>{
    return instance.request({
        url:'api/survey-item/edit',
        method:'post',
        data
    })
}
const survey_question_edit=(data)=>{
    return instance.request({
        url:'api/survey-question/edit',
        method:'post',
        data
    })
}
const survey_assembly_edit=(data)=>{
    return instance.request({
        url:'api/survey-assembly/edit',
        method:'post',
        data
    })
}
const survey_results_edit=(data)=>{
    return instance.request({
        url:'api/survey-results/edit',
        method:'post',
        data
    })
}
const survey_cate_all=()=>{
    return instance.request({
        url:'api/survey-cate/all',
    })
}
const survey_item_all=()=>{
    return instance.request({
        url:'api/survey-item/all',
    })
}
const survey_question_all=()=>{
    return instance.request({
        url:'api/survey-question/all',
    })
}
const survey_results_all=()=>{
    return instance.request({
        url:'api/survey-results/all',
    })
}
const survey_assembly_all=()=>{
    return instance.request({
        url:'api/survey-assembly/all',
    })
}
const userinfo_all=()=>{
    return instance.request({
        url:'api/userinfo/all',
    })
}
export {
    survey_cate_add,
    survey_item_add,
    survey_question_add,
    survey_assembly_add,
    survey_results_add,

    survey_cate_delete,
    survey_item_delete,
    survey_question_delete,
    survey_assembly_delete,
    survey_results_delete,

    survey_cate_edit,
    survey_item_edit,
    survey_question_edit,
    survey_assembly_edit,
    survey_results_edit,

    survey_cate_all,
    survey_item_all,
    survey_question_all,
    survey_assembly_all,
    survey_results_all,
    userinfo_all,

    survey_cate_one,
    survey_item_one,
    survey_question_one,
    survey_assembly_one,
    survey_results_one,
} 