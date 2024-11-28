import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CustomDialog({open,handleOpen,buttonAction, handleClose,children, dialogTitle, Dialogdescription, onClickAction, buttonText, classname}){
    return(
        <>
            <Button 
                sx={{marginBottom: 2}}
                onClick={handleOpen}    
            >
               {buttonText}
            </Button>
            <Dialog
                open={open}
                onOpenChange={handleClose}
            >

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>
                            {Dialogdescription}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">                  
                        {children}
                    </div>

                    <DialogFooter>
                        <Button onClick={onClickAction} className={classname}>
                            {buttonAction}
                        </Button>
                     </DialogFooter>
                    
                </DialogContent>




            </Dialog>
        
        </>
    )
}