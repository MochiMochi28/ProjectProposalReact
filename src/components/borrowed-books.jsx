import { Button } from "@/components/ui/button"


export default function CustomBorrowedList({LRN, BookTitle, BookNumber,section, returnBook}){

    return(
            
        <div className="bg-gray-950 text-white flex justify-between h-16 w-full p-2 mt-2 rounded-md box-border shadow-lg items-center ">    
            <div className="flex flex-col">
                <b className="block text-xl font-medium">{BookTitle}</b>
                <span className="block text-xs"> Currently with: 
                <b> {LRN} </b> of <b>{section}</b>  Book Number: <b> {BookNumber}</b>
            </span>
            </div>
            <Button onClick={returnBook}>Return</Button>
        </div>

    
        

    
    )
}