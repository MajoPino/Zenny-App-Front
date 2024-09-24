import { GetData } from "./GetData"
let endpoint= "https://zenny.azurewebsites.net"

export async function GenerateArray(id) {
    
    let array=[]
    for (let category = 1; category <=9 ; category++) {
        let categoryEndpoint=  `/api/v2/movement/getTotalExpensesByCategory/${id}/${category}`
        let item= await GetData(categoryEndpoint)
        array.push(item)
    }
    return array
    
}

