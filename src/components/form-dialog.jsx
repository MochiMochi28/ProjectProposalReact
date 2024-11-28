import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import FormBorrowed from "./borrow-modal"


export default function FormDialog(){
    const [borrowDialog, setBorrowDialog]=useState(false)
    const borrowDialogTrigger=()=>{
        setBorrowDialog(true)
    }
    return(
        <Dialog 
            open={open}
            onOpenChange={borrowDialogTrigger()}
        > 
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Borrow a Book</DialogTitle>
                <DialogDescription>
                    Pls input correct information. 
                </DialogDescription>
            </DialogHeader>

            <FormBorrowed/>

        </DialogContent>
        </Dialog>
    )
}