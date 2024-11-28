import { URL } from "./config";

export const retrieveBookInfos = async ()=>{
    const res= await fetch(`${URL}bookinfos`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await res.json()
}

export const DMLAllSections= async (inputs, type)=>{
    const res= await fetch(`${URL}bookinfos/`, {
        method: type,
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })

    return await res.json()
}


// export const editBook = async(id, updatedData)=>{
//     const response = await fetch(`${URL}bookinfos/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(updatedData)
//     })
    
//     return await response.json()
// }


export const AddNewSection= async (inputs,type)=>{
    const res= await fetch(`${URL}AddSections/`, {
        method: type,
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)      

    })
    return await res.json()
}

export const retrieveBorrowedBooks = async ()=>{
    const res= await fetch(`${URL}BorrowedBooks`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await res.json()
}
export const DMLBorrowedBooks= async (inputs, type)=>{
    const res= await fetch(`${URL}BorrowedBooks/`, {
        method: type,
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    return await res.json()
}

