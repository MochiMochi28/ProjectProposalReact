import { Button } from "@/components/ui/button"
import BorrowFormModal from "./borrow-modal"

export default function BookInfo({
    title, author, datePublished, bookNumber, quantity, buttonEdit,buttonDelete, buttonBorrow,
}){


    return(
        <div className="text-gray-950 flex bg-gray-500 h-auto w-full p-2 mt-2 rounded-md box-border shadow-lg items-center">
            
            <div className="w-3/4 flex flex-col ">
                <div className="flex-col  ">
                    <span className="block text-xl overflow-hidden">
                        <b>{title}</b>
                    </span> 

                    <span className="block text-xs "> by: 
                        <b> {author} </b>  on <b> {datePublished}</b>
                    </span>
                </div> 

                <span className="text-xs italic">Quantity Available: 
                    <b> {quantity} </b>
                </span>                     
            </div>


            <div className="w-1/3 flex justify-end justify-between " > 

                <div className='font-bold text-l text-gray-950 '>
                    Book Number: {bookNumber}
                </div>
                
                <Button onClick={buttonEdit}> Edit </Button>
                <Button onClick={buttonDelete}> Delete </Button>

            </div>

        </div>
        

            

        
    )
}