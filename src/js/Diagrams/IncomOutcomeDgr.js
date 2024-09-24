import { GetData } from "./GetData"



export async function utility(array) {
    return array[0]-array[1]
}
export async function GenerateInfo(id) {
    let array= []
    let totalIncomesendporint= `/api/v1/movement/getTotalIncomes/${id}`
    let totalOutcomesendpoint=`/api/v1/movement/getTotalExpenses/${id}`

    array.push(await GetData(totalOutcomesendpoint)) 
    array.push(await GetData(totalIncomesendporint)) 
    return array

}


