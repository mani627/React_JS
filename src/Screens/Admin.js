import React from 'react';
import Header from '../Components/Header';
import "../Css/Admin_Css.css"
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Outlet
} from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";

import { feth_hotels, admin_edit_hotel_empty } from '../Redux/Action/Actions_Hotel';

const Admin = () => {


    const usedispatch = useDispatch();
    const redux_state = useSelector((state) => state.hotelinfo.data);
    const [width, setWindowWidth] = React.useState(0);

    // detect window screen size
    React.useEffect(() => {

        updateDimensions()

        window.addEventListener('resize', updateDimensions);
        return () =>
            window.removeEventListener('resize', updateDimensions);
    }, [])


    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    let active = { paddingBottom: "1%", fontWeight: "100", letterSpacing: "3px", color: "#414141", textDecoration: "none", borderBottomColor: "#efa357", borderBottomStyle: "solid" };
    let inactive = { paddingBottom: "1%", fontWeight: "100", letterSpacing: "3px", textDecoration: "none", color: "#414141", borderBottomColor: "white", borderBottomStyle: "solid" };

    // style for responsive design
    let active_768 = { fontSize:"1rem",paddingBottom: "1%", fontWeight: "100", letterSpacing: "3px", color: "#414141", textDecoration: "none", borderBottomColor: "#efa357", borderBottomStyle: "solid" };
    let inactive_768 = { fontSize:"1rem",paddingBottom: "1%", fontWeight: "100", letterSpacing: "3px", textDecoration: "none", color: "#414141", borderBottomColor: "white", borderBottomStyle: "solid" };

    // #16a085
    return (

        <div className='admin_maindiv'>
            <Header colors={"#16a085"} />
            <div className='admin_maindiv1'>
                <div className='admin_maindiv2'>
                    {/* title */}
                    <div className='welcome_admin'><span className='w_admin'>A</span><span className='elcome_admin'>dmin Panel</span></div>
                    {/* Tab section*/}

                    <div className='admin_tab_main'>
                        <NavLink
                            onClick={() => usedispatch(admin_edit_hotel_empty())}
                            style={({ isActive }) =>
                                isActive ? width < 768 ? active_768 : active : width < 768 ? inactive_768 : inactive
                            }
                            to="/Admin/"
                        >
                            {" "}
                            Create
                        </NavLink>

                        <NavLink

                            style={({ isActive }) =>
                                isActive ? width < 768 ? active_768 : active : width < 768 ? inactive_768 : inactive
                            }
                            to="/Admin/Admin_Edit"
                        >
                            {" "}
                            Edit
                        </NavLink>
                    </div>
                    <Outlet />
                
                </div>
                <Footer typeOf="admin" />
            </div>
            
        </div>
    )
}
// Admin/Admin_Edit

export default Admin;