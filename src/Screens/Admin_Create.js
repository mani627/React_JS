import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import React, { useState ,useRef,useEffect} from 'react';
import Input_admin from '../Components/Input_admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';
import { Axios } from "../Axios/Axios";
import Button from "../Components/Button";
import { feth_hotels } from '../Redux/Action/Actions_Hotel';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const Admin_Create = () => {

    const usedispatch=useDispatch();
     const navigate=useNavigate()
    // const [focused, setFocused] = React.useState(false);
    const [disable_onblur, setdisale_onblur] = useState(true);
    const searchInput = React.useRef(null);
    const [selected, setselected] = useState(null)
    const [show_close, hide_close] = useState(false);
    const [imgfile, setimgfile] = useState([]);
    const [hotel_details, sethotel_details] = useState({
        Name: null,
        Location: null,
        details: null,
        single_bed_price: null,
        double_bed_price: null,
        offer: null,
        keyword: null,
        Rooms_no: null,
    });
    const [width, setWindowWidth] = React.useState(0);
    const prevFile = useRef("");

    

    const redux_state = useSelector((state) =>  state  );
    // detect window screen size
    React.useEffect(() => {

        updateDimensions()

        window.addEventListener('resize', updateDimensions);
        return () =>
            window.removeEventListener('resize', updateDimensions);
    }, [])

// pass previous state
useEffect(() => {
    prevFile.current = imgfile;
        },[imgfile]);
    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }


    const onFocus = () => {

        document.getElementsByClassName('admin_create_drop_hidden')[0].classList.add('admin_create_drop_show')
    }
    const onBlur = () => {

        if(width<=1023){
            if(!document.getElementsByClassName("admin_create_drop_show")[0]){
                document.getElementsByClassName('admin_create_drop_hidden')[0].classList.add('admin_create_drop_show')
            }else{
                document.getElementsByClassName('admin_create_drop_hidden')[0].classList.remove('admin_create_drop_show')
            }
        }else{
            document.getElementsByClassName('admin_create_drop_hidden')[0].classList.remove('admin_create_drop_show')
        } 
      
       

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

        let list = document.querySelectorAll(".features");
        let list2 = document.querySelectorAll(".features2");



        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                if (list[i].value === list2[i].textContent) {
                    list2[i].style.backgroundColor = "rgb(248,184,120)"
                    empty_array.push(list[i].value);
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
        }



        // 
    }


    const upload_img = (e) => {


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

                Toasting("Upload Four Files only", "error")
            }

        }


    }
    console.log(imgfile?imgfile.length:null);

    const close_all_img = () => {

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
        console.log(imgfile);
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
        else if (imgfile === null || (imgfile ? imgfile.length < 4 : imgfile)) {
            Toasting("Select Images", "error")
        }

        else {

            let select_btn = document.getElementsByClassName('submit_admin_create')[0]
            console.log(select_btn);
            //    //start loading in button
            select_btn.innerText = "";
            let div = document.createElement("span");
            div.classList.add("loader")
            select_btn.appendChild(div);

            let formdata = new FormData();
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


            Array.prototype.forEach.call(imgfile, file => {
                formdata.append("image_file", file);
            })

            let result = await Axios("/Upload", formdata);
            console.log(result);
            console.log("1");
            if (result.data.affectedRows === 1) {

                Toasting("Created", "success")
                // usedispatch(feth_hotels())
                //  //reomve spinner
                let div2 = document.getElementsByClassName("loader");
                div2[0].remove();
                select_btn.innerText = "Create"
              setTimeout(()=>{navigate("/Admin/Admin_Edit")},1000)  
            } else if (Array.isArray(result.data)) {
                console.log("2");
                if (result.data[0][0].result == 'Exist') {
                    Toasting("Name Already Exist", "error")
                    //  //reomve spinner
                    let div2 = document.getElementsByClassName("loader");
                    div2[0].remove();
                    select_btn.innerText = "Create"
                }   
            }else {
                console.log("2");
                console.log("jnn");
                Toasting("Something Went Wrong", "error")
                //  //reomve spinner
                let div2 = document.getElementsByClassName("loader");
                div2[0].remove();
                select_btn.innerText = "Create" 
            }


        }



    }


    // console.log(document.getElementsByClassName("admin_img1"));
    // #16a085
    return (

        <>
            <div className='admin_create_main'>
                <Input_admin maxlength="100" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="Name" placeholder="name" type="text" />
                <Input_admin maxlength="100" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="Location" placeholder="location" type="text" />

                <div className='admin_first_input' >
                    <textarea onChange={(e) => OnchangeText(e)} name="details" placeholder='describe' className='admin_hotel_textarea' rows="4" cols="50">
                    </textarea>
                </div>

                <Input_admin type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="single_bed_price" placeholder="single bed price" />
                <Input_admin type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="double_bed_price" placeholder="double bed price" />
                <Input_admin type="number" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="offer" placeholder="offer" />



                <div className='admin_first_input2' >
                    {/* <p style={{position:"absolute",right:"20%"}}>ion</p> */}
                    <FontAwesomeIcon cursor={"pointer"} onClick={onBlur} icon={faAngleDown} style={{ color: "rgb(255,130,67)" }} className="admin_drop_icon" ></FontAwesomeIcon>
                    <textarea name="features" value={selected === null ? "" : selected} ref={searchInput} placeholder='features' onFocus={onFocus} onBlur={(width<=1023)?null:disable_onblur ? onBlur :   null} style={{ resize: "none", cursor: "pointer", caretColor: "transparent" }} className='admin_hotel_textarea' rows="1" cols="10">

                    </textarea>
                    {/* <Input_admin   className_A='admin_hotel_input' name="admin_hotelname" placeholder="features" type="text" /> */}
                    <div onClick={() => { searchInput.current.focus() }} onMouseEnter={enterdrop} onMouseLeave={leavedrop} className='admin_create_drop_hidden'>
                        {features.map((e, i) => {
                            return (
                                <div className='admin_drop_combine_div'>
                                    <input type="checkbox" id={e} style={{ display: "none" }} onChange={selected_features} className="features" name={e} value={e} />
                                    <label className="features2" style={{ display: "block" }} name={e} for={e}>{e}</label>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                {/* Keyword */}
                <Input_admin maxlength="200" onChange={(e) => OnchangeText(e)} className_A='admin_hotel_input' name="keyword" placeholder="keyword" type="text" />

                {/*  */}
                <Input_admin type="number" onChange={(e) => OnchangeText(e)} maxLength="2" className_A='admin_hotel_input' name="Rooms_no" placeholder="Rooms" />

                <div className='admin_rating_div' >Rating&nbsp; &nbsp; <Rate tooltips={desc} allowHalf defaultValue={5} /></div>
                <div className="choose_image_div">
                    <input type="file" id="myFile_admin" max="2" multiple onChange={(e) => upload_img(e)} name="filename" style={{ display: "none" }} />
                    <label for="myFile_admin" className="btnn_admin_img register">Choose</label>
                    <div className="choose_image_div2"></div>
                    {show_close ? <div className="clear_img_admin"><label onClick={close_all_img} >X</label></div> : null}

                </div>
                <div className="admin_create_create_btn">
                    <label onClick={submit} name="Register" className='submit_admin_create'>Create</label>
                </div>

               
                <br /><br /><br /><br /><br />


                <ToastContainer hideProgressBar={true} />
            </div>


        </>
    )
}

export default Admin_Create;
//  onBlur={ disable_onblur?onBlur:null}