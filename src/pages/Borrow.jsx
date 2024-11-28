import { Button } from "@/components/ui/button"
import {useState, useRef} from 'react'
import { DMLBorrowedBooks, retrieveBorrowedBooks } from "../API/AllSections"
import { useToast } from "@/hooks/use-toast"
import  '../stylesheet.css'


export default function Borrow(){
    const [borrowed, setBorrowed] = useState([])
    const retrieve = () => retrieveBorrowedBooks().then(res=>{setBorrowed(res.data)})
    const {toast} = useToast()
    const[clearfield, setClearField] = useState({
        LRN:" ",
        GradeLevel: " ",
        StudentSection:" ",
        BookNumber: " ",
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setClearField((prevData) => ({
          ...prevData, 
          [name]: value, 
        }))
      }

    const LRNRef = useRef(null)
    const GLevelRef = useRef(null)
    const studentSectionRef=useRef(null)
    const bookNumberRef = useRef(null)

    const addBorrowedBooks =(event)=>{
        event.preventDefault();
        const postData={
            studentLRN: LRNRef.current.value.trim(),
            studentGLevel: GLevelRef.current.value.trim(),
            studentSection:studentSectionRef.current.value.trim(),
            book:bookNumberRef.current.value.trim()
        }
        console.log(postData)
        DMLBorrowedBooks(postData,"POST").then(response=>{
            if(response.ok){
                console.log("Success")
                {toast({
                    title:"Borrowed Succesfully",
                    description:"Enjoy reading!",
                })}
                retrieve()
            }else{
                console.log( "Something went wrong", response)
                {toast({
                    title:"Invalid",
                    description:"Please try again",
                })}
            }
        })
        
        setClearField({        
            LRN:" ",
            GradeLevel: " ",
            StudentSection:" ",
            BookNumber: " ",})
    }

        return(
            // [url("https://cdna.artstation.com/p/assets/images/images/046/810/354/large/scene-unique-3.jpg?1646057803")] bg-no-repeat bg-center bg-cover

            <main className='bg-[url("https://www.pngmagic.com/product_images/light-yellow-background-image.jpg")] bg-no-repeat bg-center bg-cover h-[100vh] flex flex-col items-center justify-center'>
                <div className='w-1/2  backdrop-blur-sm bg-white/30 rounded-lg shadow-2xl' >
                   
                    <div className='w-full h-16 bg-gray-950 mb-5 flex items-center justify-center rounded-t-lg'>
                        <b className='text-2xl text-center text-white'>Please Fill Up the Form</b>  
                    </div>

                    <form onSubmit={addBorrowedBooks} className="flex flex-col items-center justify-center p-5 gap-5">
                        <div className="grid grid-cols-4 items-center gap-4 w-full">
                            <label className="text-right" >
                                Student LRN
                            </label>
                            <input 
                                className="p-1 col-span-3 h-9 outline outline-1 rounded-lg" 
                                placeholder="Input your LRN..." 
                                ref={LRNRef} 
                                name="LRN"
                                value={clearfield.LRN}
                                onChange={handleChange}/>
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4 w-full">
                            <label className="text-right" name="StudentGrade">
                                Student Grade Level:
                            </label>
                            <input 
                                className="p-1 col-span-3 h-9 outline outline-1 rounded-lg"
                                placeholder="Input grade level..." 
                                ref={GLevelRef} 
                                name="GradeLevel"
                                value={clearfield.GradeLevel}
                                onChange={handleChange}/>

                        </div>
        
                        <div className="grid grid-cols-4 items-center gap-4 w-full">
                            <label className="text-right" >
                                Student Section:
                            </label>
                            <input 
                                className="p-1 col-span-3 h-9 outline outline-1 rounded-lg" 
                                placeholder="Input your section..." 
                                ref={studentSectionRef} 
                                name="StudentSection"
                                value={clearfield.StudentSection}
                                onChange={handleChange} />
                        </div>
        
                        <div className="grid grid-cols-4 items-center gap-4 w-full">
                            <label className="text-right" >
                                Book Number:
                            </label>
                            <input 
                                className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg" 
                                placeholder="Book Number here..." 
                                ref={bookNumberRef} 
                                name="BookNumber"
                                value={clearfield.BookNumber}
                                onChange={handleChange} />
                        </div>
                        <Button type="submit"> Save </Button>
                    </form>
                </div>
            </main>
        )
}





