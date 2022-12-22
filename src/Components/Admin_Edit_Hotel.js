import React, { useState, useEffect ,useRef} from 'react';
import "../Css/Popup_Css.css"
import { feth_hotels, test, admin_edit_hotel,admin_edit_hotel_empty } from '../Redux/Action/Actions_Hotel';
import { useDispatch, useSelector } from "react-redux";
import Input_admin from '../Components/Input_admin';
import Toasting from '../Components/Toast';
import { Axios } from "../Axios/Axios";
import { ToastContainer, toast } from 'react-toastify';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate } from 'antd';
import "../Css/Admin_Css.css"


const Admin_Edit_Hotel = ({ close2 }) => {

    const redux_state = useSelector((state) => state);

    const usedispatch = useDispatch();
   

    // const [focused, setFocused] = React.useState(false);
    const [disable_onblur, setdisale_onblur] = useState(true);
    const searchInput = React.useRef(null);
    const [selected, setselected] = useState(redux_state.admin_edit_hotel.data[0].features)
    const [show_close, hide_close] = useState(true);
    const [imgfile, setimgfile] = useState(redux_state.admin_edit_hotel.data[0].Img_path.split(","));
    const [hotel_details, sethotel_details] = useState({
        Name: redux_state.admin_edit_hotel.data[0].Name,
        Location: redux_state.admin_edit_hotel.data[0].Location,
        details: redux_state.admin_edit_hotel.data[0].details,
        single_bed_price: redux_state.admin_edit_hotel.data[0].single_bed_price,
        double_bed_price: redux_state.admin_edit_hotel.data[0].double_bed_price,
        offer: redux_state.admin_edit_hotel.data[0].offer,
        keyword: redux_state.admin_edit_hotel.data[0].keyword,
        Rooms_no: redux_state.admin_edit_hotel.data[0].Rooms_no.split(",").length,
    });
    const [width, setWindowWidth] = React.useState(0);
    const [def_selected, setdef_selected] = React.useState([]);
    const [hide_def_img, sethide_def_img] = React.useState(false);
    const prevFile = useRef("");

    // pass previous state
    useEffect(() => {
        prevFile.current = imgfile;
            },[imgfile]);

    // console.log(hotel_details);
    // detect window screen size
    React.useEffect(() => {
        setdef_selected([...redux_state.admin_edit_hotel.data[0].features.split(",")])
        const change_color_checkbox = () => {
            let list = document.querySelectorAll(".features");
            let list2 = document.querySelectorAll(".features2");


            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    if (list[i].value === list2[i].textContent) {
                        list2[i].style.backgroundColor = "rgb(248,184,120)"

                    }
                }

            }
        }
      
        setTimeout(()=>{
            imgfile.forEach((e)=>{
                let upload_div = document.getElementsByClassName("choose_image_div2")
                let image_tag = document.createElement("img");
                image_tag.setAttribute("class", "admin_img1");
                image_tag.setAttribute("id", "admin_img_id");
                image_tag.setAttribute("src", `${e}`);
                upload_div[0].appendChild(image_tag)
            })
            

        },1000)

       

        setTimeout(() => { change_color_checkbox() }, 1000)
        updateDimensions()

        window.addEventListener('resize', updateDimensions);
        return () =>
            window.removeEventListener('resize', updateDimensions);
    }, [])


    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }


    const onFocus = () => {

        document.getElementsByClassName('admin_create_drop_hidden')[0].classList.add('admin_create_drop_show')
    }
    const onBlur = () => {
        document.getElementsByClassName('admin_create_drop_hidden')[0].classList.remove('admin_create_drop_show')

    }

    const enterdrop = () => {
        setdisale_onblur(false)

    }

    const leavedrop = () => {

        setdisale_onblur(true)

    }


    // star rating tooltip
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


    // list features
    const features = ["swimming", "wifi", "spa", "parking", "drinks"]


    // 
    let empty_array = [];
    let checked_counts = document.querySelectorAll("input[type=checkbox]:checked").length;
    const selected_features = () => {

        let features1 = redux_state.admin_edit_hotel.data[0].features.split(",")


        let list = document.querySelectorAll(".features");
        let list2 = document.querySelectorAll(".features2");



        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                if (list[i].value === list2[i].textContent) {
                    list2[i].style.backgroundColor = "rgb(248,184,120)"
                    empty_array.push(list[i].value);
                    features1.push(list[i].value)
                    setdef_selected(empty_array)
                    setselected(empty_array)
                }
            }
            if (!list[i].checked) {
                if (list[i].value === list2[i].textContent) {
                    list2[i].style.backgroundColor = "#E8E8E8"
                }
            }
        }

        let check_empty = Array.prototype.filter.call(list, (e) => {

            return e.checked

        })

        if (check_empty.length === 0) {
            setselected(null)
            setdef_selected([])
        }



        // 
    }


    const upload_img = (e) => {
        console.log(document.getElementById("#admin_img_id"));
        if(document.querySelectorAll("#admin_img_id").length!==0){
       
            setimgfile([])
            document.querySelectorAll(".admin_img1").forEach(el => el.remove())
        }
        
      
        if (!(document.getElementsByClassName("admin_img1").length < 4)) {
          
            e.target.value = null
            Toasting("Reached Max Limit", "error")
        } else {

            if (document.getElementsByClassName("admin_img1").length + e.target.files.length <= 4) {
               
                let upload_div = document.getElementsByClassName("choose_image_div2")
                // starting limit while upload more than 4 like multiple
                if (e.target.files.length <= 4) {
                    setimgfile([...prevFile.current,...e.target.files])
                    for (let i = 0; i < e.target.files.length; i++) {
                        let reader = new FileReader();
                        reader.onload = function () {
                            let image_tag = document.createElement("img");
                            image_tag.setAttribute("class", "admin_img1");
                            image_tag.setAttribute("src", `${reader.result}`);

                            upload_div[0].appendChild(image_tag)
                        };
                        reader.readAsDataURL(e.target.files[i]);
                    }
                    hide_close(true)
                }
            } else {
                console.log("4");
                Toasting("Upload Four Files only", "error")
            }

        }

        
    }
    // console.log(prevFile.current, document.querySelectorAll("#admin_img_id").length);
    const close_all_img = () => {
//         let upload_div = document.getElementsByClassName("choose_image_div")
        

// console.log(document.querySelectorAll(".admin_img1"));
        // document.querySelectorAll("#img_unique").forEach(el => el.remove())
// document.querySelectorAll(".admin_img1").forEach(el =>console.log( el)   )
// document.querySelectorAll("#img_unique").forEach(el => el.remove() )

        document.querySelectorAll(".admin_img1").forEach(el => el.remove())
        hide_close(false)
        setimgfile([])

    }

    const OnchangeText = (e) => {

        sethotel_details({
            ...hotel_details,
            [e.target.name]: e.target.value.trim()

        })
    }
   

    const submit = async () => {

        if (hotel_details.Name === null || hotel_details.Name === "") {
            Toasting("Enter Hotel Name", "error")
        } else if (hotel_details.Location === null || hotel_details.Location === "") {
            Toasting("Enter Location", "error")
        } else if (hotel_details.details === null || hotel_details.details === "") {
            Toasting("Enter Details", "error")
        } else if (hotel_details.single_bed_price === null || hotel_details.single_bed_price === "") {
            Toasting("Enter Price", "error")
        } else if (hotel_details.double_bed_price === null || hotel_details.double_bed_price === "") {
            Toasting("Enter Price", "error")
        } else if (hotel_details.offer === null || hotel_details.offer === "") {
            Toasting("Enter Offer", "error")
        } else if (parseInt(hotel_details.offer) > 100) {
            Toasting("Offer above 100", "error")
        }

        else if (selected === null || selected === "") {
            Toasting("Select Features", "error")
        } else if (hotel_details.keyword === null || hotel_details.keyword === "") {
            Toasting("Enter Keywords", "error")
        } else if (hotel_details.Rooms_no === null || hotel_details.Rooms_no === "") {
            Toasting("Enter RoomNo", "error")
        }
        else if (imgfile.length < 4 ||imgfile.length===0 ) {
            Toasting("Select Images", "error")
        }
        else {

            let select_btn = document.getElementsByClassName('submit_admin_create')[0]

            //    //start loading in button
            select_btn.innerText = "";
            let div = document.createElement("span");
            div.classList.add("loader")
            select_btn.appendChild(div);

            let formdata = new FormData();

            formdata.append("hotel_id", redux_state.admin_edit_hotel.data[0].hotel_id);
            formdata.append("Name", hotel_details.Name);
            formdata.append("Location", hotel_details.Location);
            formdata.append("details", hotel_details.details);
            formdata.append("single_bed_price", hotel_details.single_bed_price);
            formdata.append("double_bed_price", hotel_details.double_bed_price);
            formdata.append("offer", hotel_details.offer);
            formdata.append("features", selected);
            formdata.append("keyword", hotel_details.keyword);
            formdata.append("Rooms_no", hotel_details.Rooms_no);
            formdata.append("Rating", "5");


            //   formdata.append("hotel_id", 1);
            // formdata.append("Name","mani" );
            // formdata.append("Location", "wwe");
            // formdata.append("details", "dd");
            // formdata.append("single_bed_price", 12);
            // formdata.append("double_bed_price", 13);
            // formdata.append("offer",3);
            // formdata.append("features","hhh");
            // formdata.append("keyword", "jn");
            // formdata.append("Rooms_no", 5);
            // formdata.append("Rating", "5");

            if (imgfile ? imgfile.length != 0 : null) {
                Array.prototype.forEach.call(imgfile, file => {
                    formdata.append("image_file", file);
                })
            } 
            // else {
            //     formdata.append("image_file", redux_state.admin_edit_hotel.data[0].Img_path);
            // }
            // Array.prototype.forEach.call(imgfile, file => {
            //     formdata.append("image_file",  redux_state.admin_edit_hotel.data[0].Img_path!=""?  file);
            // })

            let result = await Axios("/Update_hotel", formdata);

            if (result.data.affectedRows === 1) {

                Toasting("Udated", "success")
                // usedispatch(feth_hotels())
                //  //reomve spinner
                let div2 = document.getElementsByClassName("loader");
                div2[0].remove();
                select_btn.innerText = "Create"
              setTimeout(()=>{ usedispatch(admin_edit_hotel_empty())},1000) 
            } else if (Array.isArray(result.data)) {

                if (result.data[0][0].result == 'Exist') {
                    Toasting("Name Already Exist", "error")
                    //  //reomve spinner
                    let div2 = document.getElementsByClassName("loader");
                    div2[0].remove();
                    select_btn.innerText = "Create"
                }
            } else {

                Toasting("Something Went Wrong", "error")
                //  //reomve spinner
                let div2 = document.getElementsByClassName("loader");
                div2[0].remove();
                select_btn.innerText = "Create"
            }



        }


    }

    let room = redux_state.admin_edit_hotel.data[0].Rooms_no.split(",").length;
    let img = redux_state.admin_edit_hotel.data[0].Img_path.split(",");



    return (

        <>
            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].Name} maxlength="100" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="Name" placeholder="name" type="text" />
            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].Location} maxlength="100" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="Location" placeholder="location" type="text" />

            <div className='admin_first_input' >
                <textarea defaultValue={redux_state.admin_edit_hotel.data[0].details} onChange={(e) => OnchangeText(e)} name="details" placeholder='describe' className='admin_hotel_textarea' rows="4" cols="50">
                </textarea>
            </div>

            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].single_bed_price} type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="single_bed_price" placeholder="single bed price" />
            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].double_bed_price} type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="double_bed_price" placeholder="double bed price" />
            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].offer} type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="offer" placeholder="offer" />



            <div className='admin_first_input2' >
                {/* <p style={{position:"absolute",right:"20%"}}>ion</p> */}
                <FontAwesomeIcon cursor={"pointer"} onClick={onBlur} icon={faAngleDown} style={{ color: "rgb(255,130,67)" }} className="admin_drop_icon" ></FontAwesomeIcon>
                <textarea defaultValue={redux_state.admin_edit_hotel.data[0].features} name="features" value={selected === null ? "" : selected} ref={searchInput} placeholder='features' onFocus={onFocus} onBlur={(width <= 1023) ? null : disable_onblur ? onBlur : null} style={{ resize: "none", cursor: "pointer", caretColor: "transparent" }} className='admin_hotel_textarea' rows="1" cols="10">

                </textarea>
                {/* <Input_admin   className_A='admin_hotel_input' name="admin_hotelname" placeholder="features" type="text" /> */}
                <div onClick={() => { searchInput.current.focus() }} onMouseEnter={enterdrop} onMouseLeave={leavedrop} className='admin_create_drop_hidden'>
                    {features.map((e, i) => {
                        return (
                            <div className='admin_drop_combine_div'>
                                <input type="checkbox" id={e} style={{ display: "none" }} onChange={selected_features} className="features" name={e} value={e} checked={def_selected.includes(e)} />
                                <label className="features2" style={{ display: "block" }} name={e} for={e}>{e}</label>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            {/* Keyword */}
            <Input_admin defaultValue={redux_state.admin_edit_hotel.data[0].keyword} maxlength="200" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="keyword" placeholder="keyword" type="text" />

            {/*  */}
            <Input_admin defaultValue={room} type="number" onChange={(e) => OnchangeText(e)} maxLength="2" className_A='admin_hotel_input' name="Rooms_no" placeholder="Rooms" />

            <div className='admin_rating_div' >Rating&nbsp; &nbsp; <Rate tooltips={desc} allowHalf defaultValue={5} /></div>
            <div className="choose_image_div">
                <input type="file" id="myFile_admin" max="2" multiple onChange={(e) => upload_img(e)} name="filename" style={{ display: "none" }} />
                <label for="myFile_admin" className="btnn_admin_img register">Choose</label>
                <div className="choose_image_div2"></div>
                {/* {imgfile.length!==0?imgfile.map(e => {
                    return (<><img id="img_unique" className="admin_img1" src={e} /></>)
                }):null} */}
                {show_close ? <div className="clear_img_admin"><label onClick={close_all_img} >X</label></div> : null}

            </div>
            <div className="admin_create_create_btn">
                <label onClick={submit} name="Register" className='submit_admin_create'>Update</label>
            </div>


            <br /><br /><br /><br /><br />


            <ToastContainer hideProgressBar={true} />
        </>
    )
}

export default React.memo(Admin_Edit_Hotel);
