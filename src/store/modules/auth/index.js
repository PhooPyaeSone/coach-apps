import mutations from "../auth/mutations";
import actions from "../auth/actions";
import getters from "../auth/getters";

export default{
    state(){
        return {
          token : null,
          userId : null,
          didAutoLogOut : false,
        }
      },
    mutations:mutations,
    actions: actions,
    getters: getters
}