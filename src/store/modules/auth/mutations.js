export default{
    setUsers(state,payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogOut = false;
    },
    setAutoLogOut(state){
     state.didAutoLogOut = true;
    }
}