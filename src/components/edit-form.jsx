import { retrieveBookInfos , DMLAllSections, AddNewSection } from '../API/AllSections'
import {DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import $ from 'jquery'
import {useState, useEffect} from 'react'

const book_Number=$("#book_Number").val()
let bool = false;

export default function EditForm(){
    const [rows, setRows] = useState([])
    const retrieve = () => retrieveBookInfos().then(res=>{setRows(res.data)})
    bool=true

        return(
            <BookNumberChecker/>
        )

}


function BookNumberChecker(){
    const book_Number = $('#book_Number').val()

    return(
    <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right">
            Book Number:
        </label>
        <input id="book_Number" defaultValue=" " className="col-span-3 h-9 outline outline-1"/>
        
        <DialogFooter>
            <Button onClick={()=>FillUpForm()}>Enter</Button>
        </DialogFooter>
    
    </div>
    </div>

    )
}

function FillUpForm(){

    const Book_Title =$("#Book_Title").val()
    const author=$('#author').val()
    const date_Published=$('#date_Published').val()
    const quantity = $('#quantity').val()

    if(book_Number == 1){
        return(


        <div className="grid gap-4 py-4">

        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
                Book title:
            </label>
            <input id="Book_Title" defaultValue=" " className="col-span-3 h-9 outline outline-1"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right " >
                Author:
                </label>
                <input id="author" defaultValue=" " className="col-span-3 h-9 outline outline-1"/>
                
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                Date Published:
                </label>
                <input id="date_Published" defaultValue=" " className="col-span-3 h-9 outline outline-1"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                Quantity:
                </label>
                <input id="quantity" defaultValue=" " className="col-span-3 h-9 outline outline-1"/>
            </div>
        
        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </div>
    )
    }
}