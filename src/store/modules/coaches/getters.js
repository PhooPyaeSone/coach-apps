export default{
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_,getters,_2,rootGetters){
        const coachId = rootGetters.userId;
        return getters.coaches.some((coach) => coach.id === coachId);
    },
    shouldUpdate(state){
        const lastFetch = state.lastTimeFetch;
        if(!lastFetch){
            return true;
        }
        const currentTime = new Date().getTime();
        return (currentTime - lastFetch) / 1000 > 60;
    }
    
}
