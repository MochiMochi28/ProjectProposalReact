import CustomDialog from '../components/modal'
import { login, register , verify } from '../API/auth'
import { Button } from "@/components/ui/button"
import {useState, useEffect, useRef} from 'react'
import CustomInput from '../components/login-input-field'
import { Box, IconButton, InputAdornment } from '@mui/material'
import {AccountCircle, Lock, Visibility, VisibilityOff} from '@mui/icons-material'
import { useToast } from "@/hooks/use-toast"
import  '../stylesheet.css'
import {setUser} from '../redux/slice'
import {useDispatch, useSelector} from 'react-redux'
import {jwtDecode} from 'jwt-decode'


function Admin(){

    const [showLogPassword, setShowLogPassword] = useState(false)
    const [open,setOpen]=useState(false)
    const [registerMode, setRegisterMode] = useState(false)
    const loginRef=useRef([])
    const dispatch = useDispatch()
    const user =useSelector(state=>state.auth.user)

    useEffect(()=>{
        console.log(user)
    },[user])

    const {toast} = useToast()
  

    const openDialog = (type) =>{
        if(type === 'register'){        
            setRegisterMode(true)
        }
        setOpen(true)
    }
    const closeDialog = () =>{
        setRegisterMode(false)
        setOpen(false)
    }
    const handleLogInShowPassword =()=>setShowLogPassword(!showLogPassword)


    const Register =(event)=>{
        event.preventDefault()
        console.log(loginRef.current[0].value)
        const postData={

        }
        console.log(postData)
        Auth(postData,"POST").then(response=>{
            if(response.ok){
                console.log("Success")
                retrieve()
            }else{
                console.log( "Something went wrong", response)
            }
        })
    }

    const LogIn = (event)=>{
        event.preventDefault()
        const postData={
            username: loginRef.current[0].value,
            password: loginRef.current[1].value
        }

        login(postData).then(response=>{
            if(response.detail){
                closeDialog()
                {toast({
                    title:"Incorrect Username or Password"
                })} 
            }else{
                closeDialog()
                {toast({
                    title:"Logged in successfully!"
                })}
                sessionStorage.setItem("user" , response.access)
                dispatch(setUser(jwtDecode(response.access))) 
            }
        })

        console.log(loginRef.current[0].value)
    }


    return(
        <main className="h-[100vh] bg-yellow-200 relative">

            <div className='w-full h-2/3 flex flex-col justify-center  float-right items-end gap-8 p-8 pr-16 box-border text-2xl z-40'> 

                <div>
                    <span className='block font-sans text-right font-bold text-7xl mb-8 antialiased'>Welcome to MFI Library</span>
                    <span className='block font-sans text-right font-medium antialiased'> This is the MFI Online Logbook, where everything is made easier!</span>
                    <span className='block font-sans text-right text-xl font-medium antialiased'> Log in now to enter Admin Mode</span>
                </div>

                <div className=' flex gap-5'>
                    <CustomDialog
                        buttonText="Log In"
                        open={open}
                        handleOpen={()=> openDialog( )}
                        handleClose={()=> closeDialog()}
                        dialogTitle={registerMode ? "Register Account" : "Log in"}
                        classname="hidden"
                    >
            
                    <Box component="form" onSubmit={()=> registerMode ? Register(event) : LogIn(event)} sx={{display:'flex', flexDirection: 'column', gap:2 , mb:-4}}>
                        
                        <CustomInput 
                            required
                            fullWidth
                            variant="outlined"
                            label="Username"
                            slotProps={{
                                input:{
                                    startAdornment:(
                                        <InputAdornment position='start'>
                                            <AccountCircle/>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            inputRef={el=> loginRef.current[0] = el}
                        />

                        <CustomInput 
                            required
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type={showLogPassword ? 'text' : 'password' }
                            slotProps={{
                                input:{
                                    startAdornment:(
                                        <InputAdornment position='start'>
                                            <Lock/>
                                        </InputAdornment>
                                    ),
                                    endAdornment:(
                                        <InputAdornment position='end'>
                                            <IconButton
                                            onClick={handleLogInShowPassword}
                                            onMouseDown={e=>e.preventDefault}
                                            onMouseUp={e=>e.preventDefault} 
                                            >
                                                {showLogPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            inputRef={el=> loginRef.current[1] = el}
                        />
                        <div className="relative">
                            <Button className="float-right mt-5"> {registerMode ? "Register Account" : "Log In"}</Button>
                        </div>
                            

                    
                    </Box>
                    </CustomDialog>
                
                    <button className='bg-white text-black w-20  rounded-lg p-2 text-sm font-semibold shadow hover:bg-primary/80' onClick={()=> openDialog("register" , null)}>Register</button>
                </div>
                    
            </div>

            <div class="custom-shape-divider-bottom-1732696728">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>

        </main>
    )
}
export default Admin