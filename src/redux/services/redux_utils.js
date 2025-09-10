import { toast } from "react-toastify";

const reduxService={

    handleResponse:({success,error,resetCallback,successMsg,successCallBack})=>{
        if(success!==undefined){
            if(success){
                toast.success(successMsg)
                successCallBack();
            }else{
                toast.error(error)
            }
            resetCallback();
        }
        

    }

};


export {reduxService}