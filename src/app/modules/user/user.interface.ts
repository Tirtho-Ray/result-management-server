import {  USER_ROLE, USER_STATUS } from "./user.constant";

export type TUser ={
    name:string;
    email:string;
    password?:string ;
    role:keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS  
};



