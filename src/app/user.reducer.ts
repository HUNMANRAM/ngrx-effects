import { createReducer ,on} from "@ngrx/store";
import { setError, setUsers } from "./user.action";


let initailState = {
    users:[],
    apiError:false
};

export const userReducer = createReducer(
 initailState,
 on(setUsers,(state:any,{users})=>{
    
    return {...state, users,apiError:false}

 }),

 on(setError,(state,{error}) =>{
    return {...state,apiError:true}
 }),

)