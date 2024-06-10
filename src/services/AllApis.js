import { CommonAPI } from "./CommonStructure";
import { base_Url } from "./BaseUrl";


export const addBookAPI=async(bodyData)=>{
    return await CommonAPI('POST',`${base_Url}/books`,bodyData)
}

export const accessBooksAPI=async()=>{
    return await CommonAPI('GET',`${base_Url}/books`,{})
}

export const editBookAPI=async(id,bodyData)=>{
    return await CommonAPI('PATCH',`${base_Url}/books/${id}`,bodyData)
}
