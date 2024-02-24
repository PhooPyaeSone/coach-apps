export default{
    async addRequest(context,payload){
        const coachId = payload.coachId
        const data = {
            email : payload.email,
            message : payload.message,
        }
        const response = await fetch(`https://coach-apps-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`,{
            method : 'POST',
            body : JSON.stringify(data)
        });
        const responseData = await response.data();
        if(!response.ok){
            const error = new Error(response.message || "Failed to contact to the coach!");
            throw error;
        }
        data.id = responseData.message;
        data.coachId = coachId;
        // console.log(data);
        context.commit('addRequest',data);
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        // console.log("Fetch Request"+token);
        const response = await fetch(`https://coach-apps-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=`+token);
        const responseData = await response.json();
        if(!response.ok){
            const error = new Error(response.message || "Failed to fetch the requests!");
            throw error;
        }
        const requests = [];
        for(let key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                message: responseData[key].message
            };
            requests.push(request);
        }
        context.commit('loadRequests',requests);
    }
}