let endpoint= "https://zenny.azurewebsites.net"

export async function GetData(totalEmpoint) {// get activity from
    
    let respone= await fetch(endpoint+totalEmpoint)
    if (respone.status === 404) {
        return 0
    }
    let data=await respone.json()

    return data
}