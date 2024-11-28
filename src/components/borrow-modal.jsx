import { Button } from "@/components/ui/button"
import { retrieveBookInfos } from '../API/AllSections'
import {useState, useEffect,useMemo, useRef} from 'react'
import { DMLBorrowedBooks, retrieveBorrowedBooks } from "../API/AllSections"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

// Need alert

export default function BorrowFormModal({handleOpen, handleClose}){
    const [borrowed, setBorrowed] = useState([])
    const retrieve = () => retrieveBorrowedBooks().then(res=>{setBorrowed(res.data)})

    const LRNRef = useRef(null)
    const GLevelRef = useRef(null)
    const studentSectionRef=useRef(null)
    const bookNumberRef = useRef(null)

    const addBorrowedBooks =()=>{
        const postData={
            studentLRN: LRNRef.current.value.trim(),
            studentGLevel: GLevelRef.current.value.trim(),
            studentSection:studentSectionRef.current.value.trim(),
            bookNumber:bookNumberRef.current.value.trim()
        }
        console.log(postData)
        DMLBorrowedBooks(postData,"POST").then(response=>{
            if(response.ok){
                console.log("Success")
                retrieve()
            }else{
                console.log( "Something went wrong", response)
            }
        })
    }


    return(
        <>
            <Button 
                sx={{marginBottom: 2}}
                onClick={handleOpen}    
            >
                Add a Book
            </Button>
            <Dialog
                open={open}
                onOpenChange={handleClose}
            >

            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle> Please Fill Up the Form</DialogTitle>
                        <DialogDescription>
                            Borrowing books is fun! But ensure to return them like how you borrowed them!
                        </DialogDescription>
                    </DialogHeader>

            <div className='bg-gray-900 h-[100vh] flex flex-col items-center justify-center'>

                <div className='w-1/2 h-16 bg-gray-600 flex items-center justify-center'>
                    <b className='text-2xl'>Please Fill Up the Form</b>            
                </div>


                <div className='w-1/2 p-5  bg-white ' >
                <form className="flex flex-col items-center justify-center gap-5">
                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <label className="text-right" >
                            Student LRN
                        </label>
                        <input className="p-1 col-span-3 h-9 outline outline-1 rounded-lg" placeholder="Input your LRN..." ref={LRNRef}/>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <label className="text-right" name="StudentGrade">
                            Student Grade Level:
                        </label>
                        <input className="p-1 col-span-3 h-9 outline outline-1 rounded-lg" placeholder="Input grade level..." ref={GLevelRef}/>

                        {/* <select type="text" name="StudentGrade" className="h-9 outline outline-1 rounded-lg cursor-pointer" placeholder="Select Grade Level" ref={GLevelRef}>
                            <option> </option>
                            <option value="1"> 11 </option>
                            <option value="2"> 12 </option>
                            <option value="3"> DTS</option>
                        </select> */}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <label className="text-right" >
                            Student Section:
                        </label>
                        <input className="p-1 col-span-3 h-9 outline outline-1 rounded-lg" placeholder="Input your section..." ref={studentSectionRef}/>
                        {/* <select type="text" name="StudentGrade" className="h-9 outline outline-1 rounded-lg cursor-pointer" data-placeholder="Select Section" ref={studentSectionRef}>
                            <option> </option>
                            <option value="1"> 1E1 </option>
                            <option value="2"> 1E2 </option>
                            <option value="3"> 1E3</option>
                        </select> */}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <label className="text-right" >
                            Book Number:
                        </label>
                        <input className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg" placeholder="Book Number here..." ref={bookNumberRef}/>
                    </div>
                    <Button onClick={()=>addBorrowedBooks()}> Save </Button>

                    <span className="valid-text"><i>Book borrowed logged succesfully</i></span>
                    <span className="error-text"><i>Invalid!</i></span>
                </form>
                </div>
                </div>
                    
                </DialogContent>
            </Dialog>
          

        </>
    )
}

