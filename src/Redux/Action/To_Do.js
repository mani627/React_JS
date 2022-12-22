export const add_To_Do=(data)=>{

    return{
        type:"add_To_Do",
        payload:data
    }
}



export const delete_To_Do=(data)=>{

    return{
        type:"delete_To_Do",
        payload:data
    }
}



export const DeleteAll=(data)=>{

    return{
        type:"DeleteAll"
       
    }
}


export const USER_LOGOUT=(data)=>{

    return{
        type:"USER_LOGOUT"
       
    }
}



