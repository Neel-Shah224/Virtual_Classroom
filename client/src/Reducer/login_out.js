
export const login_out = (state,action)=>{
    if(action.type==='LOGGEDIN'){
        return action.payload
    }
    if(action.type==='LOGGEDOUT'){
        return action.payload
    }
    return state
}