let endpoint= "https://zenny.azurewebsites.net"




export async function GetData(totalEmpoint) {// get activity from
    
    let respone= await fetch(endpoint+totalEmpoint)
    let data=await respone.json()
    console.log(typeof data)
    return data
}