import {
  HeartOutlined,
  HeartTwoTone,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../Axios/Axios";
import "../Css/Lib_Login.css";
import useCheck_Local_Storage from "../CustomHook/CustomHook";
import { DeleteAll_Lib } from "../Redux/Action/Lib";
import LoadingOverlay from "react-loading-overlay";
import { Overlay } from "antd/lib/popconfirm/PurePanel";

function Lib_Main() {
  const [isLoader, setIsLoader] = useState(false);
  const redux_state = useSelector((state) => state);
  const [book_list, setbook_list] = useState([]);
  const [fav_books, setfav_books] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [pagenumber, setpagenumber] = useState(0);
  const [Total_Book_Count, setTotal_Book_Count] = useState(0);
  const [search_value, setsearch_value] = useState("");
  const [fav_only, setfav_only] = useState(false);

  //Thses custom hook to check login detail is there are not
  useCheck_Local_Storage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userPerPage = 10;
  let pagevisited = pagenumber * userPerPage;

  useEffect(() => {
    (async () => {
      setIsLoader(true)
      let result = await Axios(
        `/get_book?skip=${pagevisited}&limit=10`,
        null,
        "get",
        redux_state.Lib_User_Details.data[1]
      );

      setbook_list(result?.data?.mssg);

      let result2 = await Axios(
        "/get_book_fav",
        { dummy: "dummy" },
        null,
        redux_state.Lib_User_Details.data[1]
      );

      setfav_books(result2?.data?.mssg[0]?.["fav"]);

      let result3 = await Axios(
        `/Get_Book_Count`,
        null,
        "get",
        redux_state.Lib_User_Details.data[1]
      );
      setIsLoader(false)
      setTotal_Book_Count(result3?.data?.mssg);
    })();
  }, [trigger]);

  // add remove fav books
  const Add_Remove_Fav = async (type, book) => {
    setIsLoader(true)
    if (type === "add") {
      let result = await Axios(
        "/Add_Fav",
        { add: book },
        null,
        redux_state.Lib_User_Details.data[1]
      );
      settrigger(!trigger);
    } else {
      let result = await Axios(
        "/Remove_Fav",
        { remove: book },
        null,
        redux_state.Lib_User_Details.data[1]
      );
      settrigger(!trigger);
    }
    setIsLoader(false)
  };

  let data = book_list.filter((e) => {
    // empty search with non fav
    if (search_value === "" && !fav_only) {
      return e;
    }
    // empty search with fav
    else if (fav_only && search_value === "") {
      return fav_books.includes(e.Book_Name);
    } else {
      return e.Book_Name.toLowerCase().includes(search_value.toLowerCase());
    }
  });

  const LogOut = () => {
    let logout = window.confirm("Do you really want to logOut?");
    if (logout) {
      dispatch(DeleteAll_Lib());
      navigate("/Lib_Login");
    }
  };

  const onloading = () => {
    let spinner = document.getElementById("admin_img_spinner_div");
    spinner.remove();
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "red",
      }}
      spin
    />
  );

  return (
    <LoadingOverlay active={isLoader} spinner text="Loading your content...">
    <div className="min-h-screen  tracking-[.25em]   text-lg  sm:bg-white  flex  items-center flex-col pt-10 text-ellipsis">
      BOOKS
      {/* header */}
      <div className=" w-[85vw] h-[10vh] max-md:h-[25vh]  flex items-center justify-between max-md:flex-col  ">
        {/* Search bar */}
        <input
          onChange={(e) => setsearch_value(e.target.value)}
          className=" tracking-[.20em] w-[20%] h-[60%] max-md:h-[30%] max-md:w-[100%] rounded-md pl-2 bg-[#f7ede2] max-md:mt-2"
          placeholder="search"
        />

        <div className="flex items-center  w-[50%] justify-end max-md:w-[100%]">
          {/* Favourite */}
          <div
            onClick={() => setfav_only(!fav_only)}
            className="p-2 rounded-md   flex items-center hover:scale-[1.10] transition duration-150 ease-out"
          >
            {fav_only ? (
              <HeartTwoTone
                twoToneColor="#DC143C"
                className="lib_icon2"
                style={{
                  backgroundColor: "greeen",
                  color: "red",
                  cursor: "pointer",
                }}
              />
            ) : (
              <HeartOutlined
                className="lib_icon"
                style={{ backgroundColor: "greeen" }}
              />
            )}{" "}
            &nbsp; &nbsp;{" "}
          </div>

          {/* Add Books */}
          {redux_state.Lib_User_Details.data[0] &&
          redux_state.Lib_User_Details.data[0][0] &&
          redux_state.Lib_User_Details.data[0][0].role === "admin" ? (
            <button
              className=" max-md:w-[50%] tracking-[.25em] hover:scale-[1.10] transition duration-150 ease-out p-2 rounded-md  mr-4 bg-[#f6be62] flex items-center"
              onClick={() => navigate("/Lib_Admin")}
            >
              <PlusOutlined
                className="lib_icon"
                style={{ backgroundColor: "greeen" }}
              />{" "}
              &nbsp; Add
            </button>
          ) : null}

          {/* Logout */}
          <label
            onClick={() => LogOut()}
            className=" tracking-[.25em] hover:scale-[1.10] transition duration-150 ease-out p-2 rounded-md  mr-4 bg-[#82BBB5] flex items-center"
            style={{ fontSize: "clamp(0.8rem,1.3vw,3rem)" }}
          >
            LogOut?
          </label>
        </div>
      </div>
      <div className=" w-[85vw] min-h-[150vh]   mt-10 flex flex-wrap justify-around max-md:flex-col">
        {/* card */}
        {data.length>0? data.map((e, i) => {
          return (
            <div className="w-[25vw] h-[65vh] bg-white shadow-2xl shadow-white-500/50 rounded-xl mt-5 relative flex flex-col items-center max-md:w-[100%]">
              {/* card header */}
              <div className="relative top-[10px] w-[100%]    flex items-center">
                <span className=" relative left-5 tracking-[.25em] ">
                  {e.Book_Name}
                </span>
                {fav_books && fav_books.includes(e.Book_Name) ? (
                  <HeartTwoTone
                    onClick={() => Add_Remove_Fav("remove", e.Book_Name)}
                    twoToneColor="#DC143C"
                    className="lib_icon2"
                    style={{
                      backgroundColor: "greeen",
                      position: "absolute",
                      right: "8%",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => Add_Remove_Fav("add", e.Book_Name)}
                    className="lib_icon"
                    style={{
                      backgroundColor: "greeen",
                      position: "absolute",
                      right: "8%",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>

              {/* card bode */}
              <img
                loading="lazy"
                onLoad={onloading}
                className="h-[65%] w-[97%] bg-cover  mt-6  "
                src={e.Image.split(",")[0]}
                alt=""
              />
              <div style={{ position: "absolute" }} id="admin_img_spinner_div">
                <Spin indicator={antIcon} />
              </div>
              {/* View btn */}
              <button className="p-2 rounded-md mt-6  bg-[#d1825b] flex items-center hover:scale-[1.10] transition duration-150 ease-out text-white">
                View
              </button>
            </div>
          );
        }):<span>No Data... Add Books</span>}
      </div>
      {/* Pgination */}
      <div className=" mt-10 w-[25%] h-[10vh] flex items-center ">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          containerClassName={"Book_pagination"}
          activeClassName={"Book_pagination_active"}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(Total_Book_Count / userPerPage)}
          previousLabel="< "
          renderOnZeroPageCount={null}
          onPageChange={({ selected }) => {
            settrigger(!trigger);
            setpagenumber(selected);
            document.documentElement.scrollTop = 0;
          }}
          marginPagesDisplayed={0}
        />
      </div>
    </div>
    </LoadingOverlay>
  );
}

export default Lib_Main;
