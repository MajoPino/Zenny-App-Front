import { GetData } from "./GetData.js"


export async function utility(array) {
    return array[0]-array[1]
}
export async function GenerateInfo(id) {
    let array= []
    let totalIncomesendporint= `/api/v2/movement/getTotalIncomes/${id}`
    let totalOutcomesendpoint=`/api/v2/movement/getTotalExpenses/${id}`

    array.push(await GetData(totalOutcomesendpoint)) 
    array.push(await GetData(totalIncomesendporint)) 
    return array

}


