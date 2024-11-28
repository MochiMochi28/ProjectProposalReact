import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {reset, setUser} from '../../redux/slice';
import {jwtDecode} from 'jwt-decode';
import { verify } from "../../API/auth";

export default function AdminAuth(WrappedComponent){
    return()=>{
        const nav = useNavigate()
        const dispatch =useDispatch()
        const user=sessionStorage.getItem('user')

        useEffect(()=>{
            if(!user){
                dispatch(reset())
            }else{
                verify(user)
                .then(res=>{
                    if(res){
                        const user = jwtDecode(user)
                        if(user.user_id === 1){
                            dispatch(setUser(user))
                            nav('../admin')
                        }else{
                            nav('../')
                        }
                    }else{
                        dispatch(reset())
                        sessionStorage.clear()
                        nav("../")
                    }
                })
            }
        },[])
    }
}