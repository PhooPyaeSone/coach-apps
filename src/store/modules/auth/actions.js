let timer;
export default{
   async logIn(context,payload){
       context.dispatch('auth',{
        ...payload,
        'mode':'login'
       }); 
   },
   async signUp(context,payload){
    context.dispatch('auth',{
        ...payload,
        'mode':'signup'
       }); 
    },
   
   async auth(context,payload){
    const mode = payload.mode;
    let url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmCeFJEY6SKeOjiNq-FCuqPuzsseriM3Y";
    if(mode === "signup"){
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmCeFJEY6SKeOjiNq-FCuqPuzsseriM3Y";
    }
    const user = {
        email: payload.email,
        password : payload.password,
        returnSecureToken : true
    };
    const response = await fetch(url,{
        method : 'POST',
        body: JSON.stringify(user)
    });
    const responseData = await response.json();
    if(!response.ok){
        throw new Error(response.message|| 'Failed to sign in!');
    }
    const expiresIn = +responseData.expiresIn * 1000; //sec -> millisec
    // const expiresIn = 5000;
    const expiresDate = new Date().getTime() + expiresIn; // expDate in millisec

    timer = setTimeout(function(){
    context.dispatch('autoLogOut');
    },expiresIn);

    localStorage.setItem('token',responseData.idToken);
    localStorage.setItem('userId',responseData.localId);
    localStorage.setItem('tokenExpiration',expiresDate);

    context.commit('setUsers',{
        token : responseData.idToken,
        userId : responseData.localId,
    });
},
logOut(context){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);
    context.commit('setUsers',{
       token : null,
       userId : null,
    });
},
tryAutoLogin(context){
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const tokenExpiresDate = localStorage.getItem('tokenExpiration');
  const expiresIn = +tokenExpiresDate - new Date().getTime();
  timer = setTimeout(function(){
    context.dispatch('autoLogOut');
  },expiresIn);
  if(token && userId){
    context.commit('setUsers',{
        token : token,
        userId : userId,
    });
  }

},
autoLogOut(context){
    context.dispatch('logOut');
    context.commit('setAutoLogOut');
}

}