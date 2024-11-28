import CustomBorrowedList from "../components/borrowed-books"
import { DMLBorrowedBooks, retrieveBorrowedBooks } from "../API/AllSections"
import {useState, useEffect, useRef} from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { useToast } from "@/hooks/use-toast"


function Borrowed(){
    const [borrowed, setBorrowed] = useState([])
    const retrieve = () => retrieveBorrowedBooks().then(res=>{setBorrowed(res.data)})
    const [selectedBooks, setSelectedBooks]=useState([])
    const {toast} = useToast()
    const [Id, setId] = useState(null)
    
    useEffect(()=>{
        retrieve()
    },[])

    
    const returnBorrowedBook = () =>{    
        DMLBorrowedBooks({id: Id}, "DELETE")
        .then(response=>{
            if(response.ok){
                console.log("Success")   
                {toast({
                    title: "Book Deleted Successfully",
                })}     
                retrieve()
            
            }else{
                console.log( "Something went wrong", response)
                {toast({
                    title: "Book Deleted Successfully",
                })}
                retrieve()
        }
    })
}

    return(
        <main className=' bg-yellow-200 h-[100vh] box-border flex '>

            <ScrollArea className=" w-1/2 rounded-md  p-4">

            <span className="text-3xl font-semibold bg-gray-950 text-white block p-2 rounded-lg fixed w-[32rem] z-10 ">The following books will be available soon  </span>

            <div className="p-5 flex-wrap mt-20">
                
                {borrowed?.map((items=>(
                    <CustomBorrowedList
                        LRN={items.studentLRN}
                        BookTitle={items.book.bookTitle}
                        BookNumber={items.book.bookNumber}
                        section={items.studentSection}
                        returnBook={()=> [returnBorrowedBook(items.id), setId(items.id)]}
                    />
                )))}
            </div>
            </ScrollArea>
            <div className="w-1/2 text-white flex items-center justify-center ">
 
            <Carousel className=" p-5">
                <CarouselContent>
                    <CarouselItem><img src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/468080727_939803874844648_7323425849740076697_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEhsE6hV6CgSftVUuxcIURbJ1YqhiNleBQnViqGI2V4FOM-JNeVRFny3p7F5M_vJEQkNnZeZ-eJRzlIOkSq6sW_&_nc_ohc=cariA7gfjxwQ7kNvgEmBye5&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=AmHR9HSQZXBDQc9Ab8hcPa9&oh=00_AYA9IcuEQI212l6m5yyIUWr7QylCXeQVNGj36knriSKRlA&oe=674C8F75"/></CarouselItem>
                    <CarouselItem><img src="https://scontent.fmnl31-1.fna.fbcdn.net/v/t39.30808-6/467753491_939068664918169_5289334604331380571_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE5vngf5-D_P60Cy1oH6OuYTtaanwPBunFO1pqfA8G6cYNN61gsM11s-l02Od2Zniwlnc5jaYzdpv0bMwQd0szz&_nc_ohc=ceTJGKBc4e8Q7kNvgGl_TvA&_nc_zt=23&_nc_ht=scontent.fmnl31-1.fna&_nc_gid=A7t9ywIJ2yEhRYDUn1R3EST&oh=00_AYDtRzNlTwHYB1dA0v747TjfEt-s69pIykkAIV3jUMVH3w&oe=674C843C"/></CarouselItem>
                    <CarouselItem><img src="https://scontent.fmnl31-1.fna.fbcdn.net/v/t39.30808-6/467720813_938858621605840_8365001963684483000_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEhBk2ErwuTN6keZ6A4x8keoCtBNBNMZfGgK0E0E0xl8bFlN5yugMNDDbygnOS_BQje1Jf_6TCE3VOIP9jCIe7w&_nc_ohc=eXM1v1YPCrIQ7kNvgHME7l9&_nc_zt=23&_nc_ht=scontent.fmnl31-1.fna&_nc_gid=ALbVYEKVSlha0mv4azwpX13&oh=00_AYDk8Nbda33wMHAT0ZR7kCbNPYz4blBT2043qAhlqlYUzA&oe=674C6656"/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
               
            </div>

      </main>
    )
}
export default Borrowed