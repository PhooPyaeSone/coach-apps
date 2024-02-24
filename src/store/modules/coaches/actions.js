export default{
    async register(context,data){
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        console.log("Registering as a coach"+token);
        const coach = {
            firstName : data.first,
            lastName  : data.last,
            areas : data.areas,
            description : data.desc,
            hourlyRate : data.rate,
        }
        const response = await fetch(`https://coach-apps-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=`+ token,{
            method : 'PUT',
            body : JSON.stringify(coach)
        });
        if(!response.ok){
            //error
        }
        context.commit('register',{
            ...coach,
            id: userId
        });
    },
    async loadCoaches(context){
        if(context.getters.shouldUpdate === false){
            return;
        }
        const response = await fetch(`https://coach-apps-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();
        if(!response.ok){
           const error = new Error(response.message || "Failed to fetch");
           throw error;
        }
        const coaches = [];
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName : responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
            }
            coaches.push(coach);
        }

        context.commit('setCoaches',coaches);
        context.commit('setFetchTimestamp',new Date().getTime());
    }
}
