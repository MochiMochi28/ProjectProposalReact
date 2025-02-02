import { URL } from "./config";

export const login = async(inputs) =>{
    const res= await fetch(`${URL}auth/login/` ,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    return await res.json()
}

export const verify = async(access)=>{
    const res= await fetch(`${URL}auth/login/` ,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token:accessToken})
    })
    
    const ret = await res.json()
    if(ret.detail){
        return false
    }
    return true
}

export const register = async(inputs) =>{
    const res= await fetch(`${URL}auth/users/` ,{
        method:"POST",
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    return await res.json()
}