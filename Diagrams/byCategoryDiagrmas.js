let endpoint= "https://zenny.azurewebsites.net"

let id= localStorage.getItem("id")

async function GetByCategory(id,category) {
    let categoryEndpoint=  `/api/v1/movement/expenses/${id}/${category}`
    
        let respone= await fetch(endpoint+categoryEndpoint)
        if (respone.status === 404) {
            return 0
        }
    let data=await respone.json()
    console.log(data)
    return data

}
async function GenerateArray(id) {
    let array=[]
    for (let category = 1; category <=9 ; category++) {
        let item= await GetByCategory(id,category)
        
        array+=item
    }
    return array
    
}

console.table(await GenerateArray(1))