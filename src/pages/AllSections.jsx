import { retrieveBookInfos , DMLAllSections, AddNewSection  } from '../API/AllSections'
import {useState, useEffect, useRef} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookInfo from '../components/BookInfo'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CustomDialog from '../components/modal'
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"


function AllSections(){
    const [rows, setRows] = useState([])
    const [newSections, setNewSections] = useState([])
    const retrieve = () => retrieveBookInfos().then(res=>{setRows(res.data)})
    const addSections=()=> AddNewSection().then(res=>{setNewSections(res.data)})
    const {toast} = useToast()

    const [editMode, setEditMode] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDialogs, setOpenDialogs] = useState(false)
    const [selectedBooks , setSelectedBooks]=useState([])
    const [bookId, setBookId] = useState(null)

    const bookTitleRef = useRef(null)
    const authorRef = useRef(null)
    const datePublishedRef=useRef(null)
    const bookNumberRef=useRef(null)
    const quantityRef=useRef(null)
    const SectionRef = useRef(null)
    const newSectionRef=useRef(null)

    const[editedBooks,setEditedBooks]=useState({
        bookTitle: '',
        author: '',
        datePublished: '',
        bookNumber:'',
        quantity:'',
        sections:'',

    });

    useEffect(()=>{
        retrieve()
        addSections()
    },[])

    const SectionDialog =()=>{
        setOpenDialogs(true)
    }
  

    const openDialog = (type, item) =>{
        if(type === 'edit'){        
            setEditMode(true)
            setEditedBooks(item)
        }
        setOpen(true)
    }

    const closeDialog = () =>{
        setOpenDialogs(false)
        setOpen(false)
    }

    const AddSection = () => {
        const postSection={
            newSection: newSectionRef.current.value
        }

     
        AddNewSection(postSection, "POST")
        .then(response=>{            
            if(response.ok){
                console.log("Success")
                addSections()
                closeDialog()
            }else{
                console.log("Something went wrong")
                {toast({
                    title: "There's already a section with existing name",
                })}
            }
        })
    
     

    }

    
    const AddBookInfo = () => {
        const postData={
            bookTitle: bookTitleRef.current.value.trim(),
            author: authorRef.current.value.trim(),
            datePublished: datePublishedRef.current.value.trim(),
            bookNumber:bookNumberRef.current.value.trim(),
            quantity:quantityRef.current.value.trim(),
            sections:SectionRef.current.value.trim(),
        }
        setEditedBooks(postData)
        console.log(postData)
        DMLAllSections(postData, "POST").then(response=>{
            if(response.ok){
                console.log("Success")
                {toast({
                    title:"Book Added Succesfully",
                })}
                retrieve()
                closeDialog()
            }else{
                console.log( "Something went wrong", response)
                {toast({
                    title:"Book Add Failed",
                    description:"Pls ensure the informations given are correct "
                })}
            }
        })
    }

    const EditBookInfo = () =>{
        const patchData={
            id: bookId,
            bookTitle: bookTitleRef.current?.value.trim() || editedBooks.bookTitle,
            author: authorRef.current?.value.trim() || editedBooks.author,
            datePublished: datePublishedRef.current?.value.trim() || editedBooks.datePublished,
            bookNumber: bookNumberRef.current?.value.trim() || editedBooks.bookNumber,
            quantity: quantityRef.current?.value.trim() || editedBooks.quantity,
            sections: SectionRef.current?.value.trim() || editedBooks.sections,
        }

        console.log(patchData)
   
        DMLAllSections(patchData , "PATCH")
        .then(response=>{     
            if(response.ok){
                console.log("Edit Success")
                retrieve()
                closeDialog()
                {toast({
                    title: "Book Updated Successfully",
                })}
            }else{
                console.log("Something went wrong")
                {toast({
                    title: "Book Update Failed",
                    description: "Please ensure the inputs are correct.",
                })}
            }
        })
    }


    const DeleteBookInfo = () =>{   
        DMLAllSections( {id:bookId} , "DELETE")
        .then(response=>{
            if(response.ok){
                retrieve()
            }
            else{
                console.log(response)
                retrieve()
                {toast({
                    title: "Book Deleted Successfully",
                })}
                
            }       
        })

    }

    const section =(value)=>{
        const copyRows = JSON.parse(JSON.stringify(rows))
        let books = [] 

        for(const book of copyRows){
            if (book.sections == value){
                books.push(book)
            }
        }
        setSelectedBooks(books)
    }

    return(
        
        <main className='w-full h-[100vh]'>
            <div className="flex item-center justify-center gap-4 bg-amber-300 pt-2 pb-2">
                <i className='block text-red-900 text-lg'> Admin mode on!</i>
                        
                {/* Add Section */}
                <div> 
                    <Dialog                       
                        onOpenChange={()=>SectionDialog()}
                    >
                    <DialogTrigger asChild>
                        <Button>Add section</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add Section</DialogTitle>
        
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="addSection" id='section' className="text-right">
                                    Section
                                </Label>
                                <input placeHolder="Add sections here" className="col-span-3 h-9 outline outline-1 rounded-lg p-1" ref={newSectionRef}/>
                            </div>
                        </div>
                        <DialogFooter>
                        <Button onClick={()=> AddSection()}>
                            Save changes
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                </div>

                {/* Add & Edit a Book */}
                <div>
                    <CustomDialog
                        buttonText="Add a Book"
                        open={open}
                        handleOpen={()=>openDialog("add", null)}
                        handleClose={()=>closeDialog()}
                        dialogTitle={editMode ? "Edit Book Info" : "Add a Book"}
                        Dialogdescription={editMode ? "Edit Book Info here. Click save when you're done." : "Add Here book infos here. Click update when you're done"}
                        buttonAction = {editMode ? "Update" : "Add"}
                        onClickAction={()=> editMode ? EditBookInfo() : AddBookInfo()}
                    >
                      
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Book title:
                            </Label>
                            <input className="col-span-3 h-9 outline outline-1 rounded-lg p-1"  
                            // name='bookTitle'
                            defaultValue={editMode ? editedBooks.bookTitle : null} 
                            ref={bookTitleRef} />
                               
                        </div>
                   
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" >
                                Author:
                            </Label>
                            <input className="p-1 col-span-3 h-9 outline outline-1 rounded-lg"
                            // name='author'
                            defaultValue={editMode ? editedBooks.author : null} 
                            ref={authorRef}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Date Published:
                            </Label>
                            <input className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg"  
                            name='datePublished'
                            defaultValue={editMode ? editedBooks.datePublished : null} 
                            ref={datePublishedRef} />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Book Number:
                            </Label>
                            <input className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg"
                            // name='bookNumber'
                            defaultValue={editMode ? editedBooks.bookNumber : null} 
                             ref={bookNumberRef}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Section:
                            </Label>
                            <input className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg" 
                            // name="sections"
                            defaultValue={editMode ? editedBooks.sections : null} 
                            ref={SectionRef}  />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                            Quantity:
                            </Label>
                            <input className=" p-1 col-span-3 h-9 outline outline-1 rounded-lg" 
                            // name='quantity'
                            defaultValue={editMode ? editedBooks.quantity : null} 
                            ref={quantityRef}  />
                        </div>
                    </CustomDialog>     
                  
                </div>    
                <Button>Log Out</Button> 
            </div> 

            <Tabs defaultValue={1} onValueChange={section} className="bg-gray-900 h-full w-full overflow-auto ">

                <TabsList 
                    // className="overflow-x-auto"
                >                                    
                    {newSections?.map((items)=>(
                        <TabsTrigger value={items.newSection}
                            key={items.id}
                            sections={items.newSection}                
                        >
                            {items.newSection}
                        </TabsTrigger>
                    ))}              
                </TabsList>
           
            
                {newSections?.map((items)=>(
                    <TabsContent value= {items.newSection} className="overflow-x-auto ">
                        
                       {selectedBooks.map((items)=>(
                            <BookInfo
                            key={items.id}
                            title={items.bookTitle}
                            author={items.author}
                            datePublished={items.datePublished}
                            bookNumber={items.bookNumber}
                            quantity={items.quantity}
                            buttonEdit={()=> [openDialog("edit", items ), setBookId(items.id)]}
                            buttonDelete={()=> [DeleteBookInfo(), setBookId(items.id)]}
                        />
                       ))}
                      
                    </TabsContent>
                ))}
        

            </Tabs>
        </main>
    )
}


export default AllSections



