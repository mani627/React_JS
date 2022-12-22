import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const Toasting=(title,type)=>{

    if(type==="error"){
        toast.error(<div style={{marginLeft:"5%",color:"#FFFFFF"}}>{title}</div>, {
            position: toast.POSITION.TOP_CENTER
        }, { autoClose: 100, hideProgressBar: true });
    }else if(type==="success"){
        toast.success(<div style={{marginLeft:"5%",color:"#FFFFFF"}}>{title}</div>, {
            position: toast.POSITION.TOP_CENTER
        }, { autoClose: 100, hideProgressBar: true });
    }
    
}
export default Toasting;