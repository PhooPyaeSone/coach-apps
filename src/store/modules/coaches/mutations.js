export default{
    register(state,payload){
        state.coaches.push(payload);
    },
    setCoaches(state,payload){
        state.coaches = payload;
    },
    setFetchTimestamp(state,payload){
        state.lastFetchTime = payload;
    },
  
}