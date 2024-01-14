import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../Axios/Axios";
import Toasting from "../Components/Toast";
import "../Css/Lib_Login.css";
import useCheck_Local_Storage from "../CustomHook/CustomHook";
import LoadingOverlay from "react-loading-overlay";

function Lib_Admin() {
  const navigate = useNavigate();

  // Redux state
  const redux_state = useSelector((state) => state);

  //Thses custom hook to check login detail is there are not
  useCheck_Local_Storage();
  const [isLoader, setIsLoader] = useState(false);
  const [Book_img, setBook_img] = React.useState([]);
  const [Book_img_files, setBook_img_files] = React.useState([]);
  const [inputs, setinputs] = useState({
    name: "",
    desc: "",
  });

  // Clear All state value
  const ClearAllState = () => {
    setBook_img([]);
    setinputs({
      name: "",
      desc: "",
    });
  };

  //assign value to state when user type
  const Pass_Value = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  console.log(Book_img.length);
  const upload_img = (e) => {
    let Book_img_Arry = [];

    // if select above 2
    if (e.target.files.length > 2) {
      Toasting("Maximum Two Images", "error");
    }
    // if select  1
    else {
      // if they selected alreay one and current choose one, it will execute
      if (
        (Book_img.length !== 0 &&
          Book_img.length + e.target.files.length <= 2) ||
        (e.target.files.length <= 2 &&
          Book_img.length < 2 &&
          Book_img.length + e.target.files.length <= 2)
      ) {
        Array.from(e.target.files).forEach((e, i) => {
          setBook_img_files((prev) => [...prev, e]);
          Book_img_Arry.push(e);
        });

        Book_img_Arry.forEach((e) => {
          let reader = new FileReader();
          reader.onload = function () {
            setBook_img((prev) => [...prev, reader.result]);
          };

          reader.readAsDataURL(e);
        });
      } else {
        Toasting("Maximum Reached", "error");
      }
    }
  };

  // send details to db
  const send = async () => {
    if (inputs.name === "" || inputs.desc === "" || Book_img.length === 0) {
      Toasting("Enter Book Details", "error");
    } else {
      setIsLoader(true)
      let formdata = new FormData();
      formdata.append("Book_Name", inputs.name);
      formdata.append("Book_Desc", inputs.desc);

      Book_img_files.forEach((e, i) => {
        formdata.append("image_file", e);
      });

      let result = await Axios(
        "/Insert_book",
        formdata,
        null,
        redux_state.Lib_User_Details.data[1]
      );
      setIsLoader(false)
      if (result.data === "Already Exist") {
        Toasting("Name Already Exist", "error");
      } else if (
        result.data &&
        result.data.mssg &&
        result.data.mssg.acknowledged
      ) {
        Toasting("Added", "success");
        setTimeout(() => {
          navigate("/Lib_Main");
        }, 2000);
      } else if (result.data.error && result.data.error.message) {
        Toasting("Something went wrong", "error");
      }
    }
  };

  return (
    <LoadingOverlay active={isLoader} spinner text="Loading your content...">
    <div className="min-h-screen     flex  items-center flex-col">
      {/* header */}
      <div className=" w-[85vw] h-[10vh] max-md:h-[20vh]   mt-5    flex items-center  justify-center max-md:flex-col  ">
        <div
          onClick={() => navigate("/Lib_Main")}
          className=" absolute left-24 cursor-pointer max-md:left-1 max-md:top-10 "
          style={{ fontSize: "clamp(0.9rem,1vw,3rem)" }}
        >
          Back
        </div>
        <p
          className=" text-slate-600  font-thin max-md:mt-[15%]"
          style={{ fontSize: "clamp(1.3rem,2vw,3rem)" }}
        >
          <span
            className=" text-rose  font-thin tracking-[.25em]"
            style={{ fontSize: "clamp(1.3rem,2vw,3rem)" }}
          >
            Add
          </span>{" "}
          <span
            style={{ fontSize: "clamp(1.3rem,2vw,3rem)" }}
            className={"tracking-[.25em]"}
          >
            Books
          </span>
        </p>
      </div>

      {/* Body */}
      <div className=" w-[85vw] min-h-[100vh]  flex flex-col items-center">
        {/* Book name */}
        <input
          name="name"
          onChange={(e) => Pass_Value(e)}
          value={inputs.name}
          className="w-[30%] max-md:w-[90%] max-md:p-[3%] p-[1%] m-[5%] focus:outline  bg-[#E8E8E8] rounded-sm"
          style={{ fontSize: "clamp(0.9rem,1.3vw,3rem)" }}
          placeholder="Book Name"
        />
        {/* Book desc */}
        <textarea
          name="desc"
          onChange={(e) => Pass_Value(e)}
          value={inputs.desc}
          className="w-[30%] max-md:w-[90%] max-md:p-[3%] p-[1%] bg-[#E8E8E8] focus:outline rounded-sm"
          style={{ fontSize: "clamp(0.9rem,1.3vw,3rem)" }}
          placeholder="Desc"
        />
        {/* Choose img btn */}
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          id="myFile_admin"
          multiple
          onChange={(e) => upload_img(e)}
          max="2"
          name="filename"
          style={{ display: "none" }}
        />
        <label
          for="myFile_admin"
          className=" max-md:mt-10 max-md:p-[2%] max-md:translate-x-[-120.5%]  hover:scale-[1.10] transition duration-150 ease-out bg-orange-300 m-[4%]  translate-x-[-112.5%] rounded-sm p-[1%]  "
          style={{ fontSize: "clamp(0.8rem,1.3vw,3rem)" }}
        >
          Choose Pic
        </label>

        <div className="w-[30%] h-[30vh] p-[1%] m-[-2%] max-md:w-[93%] flex  gap-10 overflow-auto relative">
          {Book_img.length !== 0
            ? Book_img.map((e) => {
                return (
                  <img id="images" src={e} className="h-[100%] w-[60%]  " />
                );
              })
            : null}
        </div>

        {/* Clear all state  and submit section*/}

        <div className="flex  h-[10%] m-14 w-[40%] justify-center gap-5">
          <label
            onClick={() => ClearAllState()}
            className=" tracking-[.25em] max-md:p-[7%] hover:scale-[1.10] transition duration-150 ease-out bg-orange-300    rounded-sm p-[2.3%]"
            style={{ fontSize: "clamp(0.8rem,1.3vw,3rem)" }}
          >
            Clear
          </label>
          <label
            className=" tracking-[.25em] max-md:p-[7%] hover:scale-[1.10] transition duration-150 ease-out bg-[#82BBB5]   rounded-sm p-[2.3%]"
            style={{ fontSize: "clamp(0.8rem,1.3vw,3rem)" }}
            onClick={send}
          >
            Submit
          </label>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
    </LoadingOverlay>
  );
}

export default Lib_Admin;
