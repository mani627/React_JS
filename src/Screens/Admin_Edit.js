import { HeartFilled, HeartTwoTone, LoadingOutlined ,DeleteOutlined } from '@ant-design/icons';
import { Rate, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { } from '@ant-design/icons';
import { Spin } from 'antd';
import { feth_hotels,test,admin_edit_hotel } from '../Redux/Action/Actions_Hotel';
import { useDispatch, useSelector } from "react-redux";
import Admin_Edit_Hotel from '../Components/Admin_Edit_Hotel';
import Popup from '../Components/Popup';
import { Axios } from "../Axios/Axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';






const Admin_Edit = () => {


    const usedispatch=useDispatch();


   
  
    const redux_state = useSelector((state) =>  state  );

    // const redux_state2 = useSelector((state) =>  state.trigger);
// console.log(redux_state2.data);


    useEffect(()=>{
     
    usedispatch(feth_hotels())
        
     
       
    },[])
    console.log( redux_state.hotelinfo);
    
const[selected_id,setselected_id]=useState(0)
    const [pagenumber, setpagenumber] = useState(0)
    const [startload, setstartload] = useState(true)
    const[close_popup,setclose_popup]=useState(false)
    const[switchh,setswitchh]=useState(false)
    const userPerPage = 5;
    const pagevisited = pagenumber * userPerPage;
    const sliced_data =  redux_state.hotelinfo.data.length!==0?  redux_state.hotelinfo.data.slice(pagevisited, pagevisited + userPerPage):[]

  

       
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                color: "red",

            }}
            spin
        />
    );

    const onloading = () => {
        let spinner= document.getElementById('admin_img_spinner_div');

       spinner.remove()
        
        
    }
   
  //select rating name 
    const Rating_status=(extra)=>{
        let names=["Terrible","Bad","Normal","Good","Awesome"]
let filtered_rating=names.filter((e,i)=>i+1===extra)
       return filtered_rating[0]
    }
    
    // close delete popup
const closing_popup=()=>{
    setclose_popup(!close_popup)
}

const delete_hotel=async(id)=>{
    console.log(selected_id);
    let select_btn = document.getElementById('yes_btn')

    //    //start loading in button
    select_btn.innerText = "";
    let div = document.createElement("span");
    div.classList.add("loader")
    select_btn.appendChild(div);

    let result = await Axios("/Delete_Hotel", { "id":selected_id});
    if(result.data===1){
        Toasting("Deleted", "success")
    }
    usedispatch(feth_hotels())
    setclose_popup(!close_popup)
    // http://localhost:8080/Delete_Hotel
}
   

    if(redux_state.hotelinfo.data.length===0){
        return(
            <div className='admin_edit_nodata'></div>
        )
    }
    // #16a085
    return (

        <>
            <div className='admin_create_main' >
{redux_state.admin_edit_hotel.data.length===0? <>    {sliced_data.map(e => {
                    return (

                        <div className="admin_edit_hotel_main_div">
                            {/* first */}
                            <div style={{ position: "relative" }} className="admin_edit_hotel_main_div_inside1">
                                <img loading="lazy" src={e.Img_path.slice(0, e.Img_path.indexOf(","))} onLoad={onloading} className='admin_edit_hotel_main_div_inside1_img' />
                                <div style={{ position: "absolute" }} id="admin_img_spinner_div"><Spin indicator={antIcon} /></div>


                            </div>



                            {/* second */}
                            <div className="admin_edit_hotel_main_div_inside2">
                                <div className='admin_edit_hotel_main_div_inside2_name'>
                                    <span>{e.Name.length>13?`${e.Name.slice(0, 18)}...`:`${e.Name}`}</span>
                                    <span> <HeartFilled className="reg_icon1" style={{ color: "#FF6347", cursor: "pointer" }} /></span>
                                </div>

                                <div className='admin_edit_hotel_main_div_inside2_place'>
                                    <span>{e.Location}</span>
                                </div>
                                <div className='admin_edit_hotel_main_div_inside2_rating'>
                                    <Rate disabled allowHalf value={e.Rating} />
                                    <span>{Rating_status(e.Rating)}</span>
                                </div>
                            </div>

                            {/* Third */}
                            <div className="admin_edit_hotel_main_div_inside3">
                                <div>
                                    <div>
                                        <span>single</span>
                                        <span>{e.single_bed_price} / day</span>
                                        <span>{e.offer===0?null:`offer ${e.offer}%`}</span>
                                    </div>
                                    <div>
                                        <span>double</span>
                                        <span>{e.double_bed_price} / day</span>
                                        <span>{e.offer===0?null:`offer ${e.offer}%`}</span>
                                    </div>
                                </div>
                                <div className="admin_edit_delete_div">
                                <label onClick={()=>usedispatch(admin_edit_hotel(e))} name="Register" className='submit_admin_update'>Edit</label>
                                <span>&nbsp;&nbsp;</span>
                                <label onClick={()=>{setclose_popup(!close_popup);setselected_id(e.hotel_id) }} name="Register" className='submit_admin_delete'><DeleteOutlined className='reg_icon2'/>&nbsp;&nbsp;Delete</label>
                                </div>
                              
                            </div>
                          
                        </div>
                    )
                })}


                <div className='admin_pagination_div'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        containerClassName={'admin_pagination'}
                        activeClassName={'admin_pagination_active'}
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(redux_state.hotelinfo.data.length / userPerPage)}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        onPageChange={({ selected }) => { setpagenumber(selected) }}
                        marginPagesDisplayed={0}
                    />
                </div>
               
</>:<Admin_Edit_Hotel/>}

  
{close_popup?<Popup extra={<label id="yes_btn"  onClick={(e)=>delete_hotel(e.hotel_id)} className='submit_admin_update'>Yes</label>} innerpopup={"popup_inner_login"} typeOf="popup_delete_cnfrm" close={closing_popup}  />:null}
<ToastContainer hideProgressBar={true} />
            </div>
        </>
    )
}

export default Admin_Edit;