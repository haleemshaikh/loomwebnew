import React, { useContext, useState } from 'react'
import '../CSS/login.css';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import WorkInProgress from './WorkInProgress';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoomPortalContext } from '../Context';



export default function Login(props) {
  console.log("Loginxxxxxxx");
 // const [loca, setLoca] = useState("http://localhost:8082");  // authenticate
  const [isMobile , setIsMobile] =useState(false);
const [token, setToken] = useState("");

const [showlogin , setShowLogin]=useState(true);
const [pageError , setPageError] =useState(false)
const [loading ,setLoading] =useState(false)
const [error , setError] = useState("");
const [ flag ,setFlag] =useState(true)
const [showHidePassword , setShowHidePassword] = useState("fa fa-eye-slash hidepassword");
const [usernamee , setUserNamee] =useState("");
const [passwordd ,setPasswordd] =useState("")
const navigation = useNavigate();
const { loca,language ,type ,setLanguage ,setType }=useContext(LoomPortalContext)

// const [showlogin ,setShowLogin]

const _setLanguage =(event)=>{
   setLanguage(event.target.value);
}
const hideShowPassword =()=> {
  if (flag) {
   // this.setState({ showHidePassword: "fa fa-eye-slash hidepassword", flag: !this.state.flag });

    setShowHidePassword('fa fa-eye-slash hidepassword');
    setFlag(!flag);
  } else {
   // this.setState({ showHidePassword: "fa fa-eye hidepassword", flag: !this.state.flag });
    setShowHidePassword('fa fa-eye hidepassword');
    setFlag(!flag);
  }
};

const _setFlag =(e)=> {
   //  this.setState({ flag: !e.target.checked });
  setFlag(!e.target.checked)
}

const logincall =()=>{
  console.log(usernamee ,passwordd);
   setLoading(true)
   axios
      .post(
        loca + "/authenticate",
        {
          username: usernamee,
          password: passwordd,
          application: "loomyarn",
        },
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.authenticated === true) {
            var token = res.data.token;
            var userInfo = {
              userId: res.data.userId,
              username: res.data.username,
              name: res.data.name,
              admin: res.data.admin,
              cid: res.data.cid,
              mobileNumber: res.data.mobileNumber,
            };
            localStorage.setItem("userDetails", JSON.stringify(userInfo));
            setUserNamee("");setPasswordd("")
            if (res.data.passwordReset) {
             // callNewPassword(this.password.value, this.username.value);
            } else {
              if (token != null) {
                localStorage.setItem("token", token);
              //  this.dismiss();
              }
            }
          } else {
      
            setError(res.data.error)
            setLoading(false)
            setPageError(true)
          }
        }
      });

}

const showRegister =(lang , typ)=>{
   
  //language=lang; type=typ;
  setLanguage(lang);
  setType(typ);

  navigation("/register");
}

const callForgetPassword =()=>{

}

/* useState(()=>{
  console.log(loca);

},[]) */
const callNewPassword = (op, un)=> {
   //  this.props.showNewPassword(op, un);
}
console.log(isMobile)
return (
  <div>
    {loading === true && <WorkInProgress></WorkInProgress>}
    <div>
      {showlogin === true && (
        <div className='my-5'>
          {isMobile ? (
            <div className="d-flex justify-content-center h-100 mx-5">
              <div className="card_log my-2">
                <div className="card-header lang">
                {pageError === true && (
                  <div className="alertgp alert-danger">{error}</div>
                )}
                  <h3 className="cen">
                    {language === "English"
                      ? "Sign In"
                      : language === "Hindi"
                        ? "साइन इन"
                        : language === "Urdu"
                          ? "سائن ان"
                          : "Sign In"}
                  </h3>
                  <div className="justify-content-start cen_set">
                    <span className="pad5" style={{ color: "white" }}>
                      {language === "English"
                        ? "Language"
                        : language === "Hindi"
                          ? "भाषा"
                          : language === "Urdu"
                            ? "زبان"
                            : "Language"}{" "}
                    </span>
                    <select
                      value={language}
                      className="form-control form-select"
                      style={{
                        marginLeft: "5px",
                        lineHeight: "1.5",
                        width: "50%",
                      }}
                      onChange={
                        _setLanguage
                      }
                    >
                      <option value={"English"}>
                        {language === "English"
                          ? "English"
                          : language === "Hindi"
                            ? "अंग्रेज़ी"
                            : language === "Urdu"
                              ? "انگریزی"
                              : "English"}
                      </option>
                      <option value={"Hindi"}>
                        {language === "English"
                          ? "Hindi"
                          : language === "Hindi"
                            ? "हिन्दी"
                            : language === "Urdu"
                              ? "ہندی"
                              : "Hindi"}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="card-body cen_set">
                  <div className="input-group form-group pb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i
                          className=" ftsize fa fa-user"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Profile"
                        ></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder={
                        language === "English"
                          ? "Username"
                          : language === "Hindi"
                            ? "उपयोगकर्ता नाम"
                            : language === "Urdu"
                              ? "صارف نام"
                              : "username"
                      }
                      className="form-control"
                      onChange={(e) => setUserNamee(e.target.value)}
                    ></input>
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="ftsize fa fa-key "></i>
                      </span>
                    </div>
                    <input
                      type={flag ? "password" : "text"}
                      name="password"
                      placeholder={
                        language === "English"
                          ? "Password"
                          : language === "Hindi"
                            ? "पासवर्ड"
                            : language === "Urdu"
                              ? "پاس ورڈ"
                              : "password"
                      }
                      className="inpptt"
                      
                      onChange={(e) => setPasswordd(e.target.value)}
                       
                    ></input>
                    <div className="input-group-prepend">
                      <i
                        className={showHidePassword}
                        aria-hidden="true"
                        onClick={hideShowPassword}
                      ></i>
                    </div>
                  </div>

                  {/* <div className="align-items-center remember">
                    {language === "English"
                      ? "Remember Me"
                      : language === "Hindi"
                        ? "मुझे याद रखें "
                        : language === "Urdu"
                          ? "مجھے یاد رکھنا"
                          : "Remember Me"}

                    <input type="checkbox" className="pos"></input>
                  </div> */}
                  <div
                    className=" row align-items-center  justify-content-center remember "
                    style={{ fontSize: "16px", color: "white" }}
                  >
                    Show Password
                    <input
                      type="checkbox"
                      checked={!flag}
                      onChange={(e) => {
                        _setFlag(e);
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="form-group cen my-3">
                    <input
                      type="button"
                      value={
                        language === "English"
                          ? "Login"
                          : language === "Hindi"
                            ? "लॉग इन"
                            : language === "Urdu"
                              ? "لاگ ان"
                              : "Login"
                      }
                      className="btn float-right login_btn "
                      onClick={logincall}
                    ></input>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    {language === "English"
                      ? "Don't have an account?"
                      : language === "Hindi"
                        ? "खाता नहीं है?"
                        : language === "Urdu"
                          ? "اکاؤنٹ نہیں ہے؟"
                          : "Don't have an account?"}
                  </div>
                  <div className="d-flex justify-content-center links">
                    <button
                      className="btn btnyellow"
                      onClick={() =>
                        showRegister(language, "user")
                      }
                    >
                      {language === "English"
                        ? "Sign Up for User"
                        : language === "Hindi"
                          ? "उपयोगकर्ता के लिए साइन अप करें"
                          : language === "Urdu"
                            ? "صارف کے لیے سائن اپ کریں"
                            : "Sign In"}
                    </button>
                    <button
                      className="btn btnyellow"
                      onClick={() =>
                        showRegister(language, "client")
                      }
                    >
                      {language === "English"
                        ? "Sign Up For Client"
                        : language === "Hindi"
                          ? "ग्राहक के लिए साइन अप करें"
                          : language === "Urdu"
                            ? "کلائنٹ کے لیے سائن اپ کریں"
                            : "Sign In"}
                    </button>
                  </div>
                  <div className="d-flex justify-content-center links">
                    <button
                      className="btn btnyellow"
                      style={{ marginTop: "1%" }}
                      onClick={() => callForgetPassword()}
                    >
                      {language === "English"
                        ? "Forgot your password?"
                        : language === "Hindi"
                          ? "पासवर्ड भूल गए हैं? "
                          : language === "Urdu"
                            ? "اپنا پاس ورڈ بھول گئے؟"
                            : "Forgot your password?"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="d-flex justify-content-center h-100">
                <div className="card_log card_log_mar">
                  <div className="card-header lang">
                  {pageError === true && (
                  <div className="alertgp alert-danger cen">{error}</div>
                )}
                    <h3 className="cen">
                      {language === "English"
                        ? "Sign In"
                        : language === "Hindi"
                          ? "साइन इन"
                          : language === "Urdu"
                            ? "سائن ان"
                            : "Sign In"}
                    </h3>
                    <div className="justify-content-start cen_set">
                      <span className="pad5" style={{ color: "white" }}>
                        {language === "English"
                          ? "Language"
                          : language === "Hindi"
                            ? "भाषा"
                            : language === "Urdu"
                              ? "زبان"
                              : "Language"}{" "}
                      </span>
                      <select
                        value={language}
                        className="form-control form-select"
                        style={{
                          marginLeft: "5px",
                          lineHeight: "1.3",
                          width: "50%",
                        }}
                        onChange={
                          _setLanguage
                        }
                      >
                        <option value={"English"}>
                          {language === "English"
                            ? "English"
                            : language === "Hindi"
                              ? "अंग्रेज़ी"
                              : language === "Urdu"
                                ? "انگریزی"
                                : "English"}
                        </option>
                        <option value={"Hindi"}>
                          {language === "English"
                            ? "Hindi"
                            : language === "Hindi"
                              ? "हिन्दी"
                              : language === "Urdu"
                                ? "ہندی"
                                : "Hindi"}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body cen_set my-3">
                    <div className="input-group form-group pb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i
                            className=" ftsize fa fa-user "
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Profile"
                          ></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        placeholder={
                          language === "English"
                            ? "Username"
                            : language === "Hindi"
                              ? "उपयोगकर्ता नाम"
                              : language === "Urdu"
                                ? "صارف نام"
                                : "username"
                        }
                        className="form-control"
                         onChange={(e) => setUserNamee(e.target.value)}
                      /*   onChange={() => {
                          setErrorMessage();
                        }} */
                      ></input>
                    </div>
                    <div className="input-group form-group my-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ftsize fa fa-key "></i>
                        </span>
                      </div>
                      <input
                        type={flag ? "password" : "text"}
                        name="password"
                        placeholder={
                          language === "English"
                            ? "Password"
                            : language === "Hindi"
                              ? "पासवर्ड"
                              : language === "Urdu"
                                ? "پاس ورڈ"
                                : "password"
                        }
                        className="form-control "
                        onChange={(e) => setPasswordd(e.target.value)}
                     /*    onChange={() => {
                          setErrorMessage();
                        }} */
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            logincall();
                          }
                        }}
                      ></input>
                      {/* <div className="input-group-prepend">
                        <i
                          className={showHidePassword}
                          aria-hidden="true"
                          onClick={hideShowPassword}
                        ></i>
                      </div> */}
                    </div>

                    {/* <div className="align-items-center remember">
                      {language === "English"
                        ? "Remember Me"
                        : language === "Hindi"
                          ? "मुझे याद रखें "
                          : language === "Urdu"
                            ? "مجھے یاد رکھنا"
                            : "Remember Me"}

                      <input type="checkbox" className="pos"></input>
                    </div> */}
                    <div
                      className=" row align-items-center  justify-content-center remember "
                      style={{ fontSize: "16px", color: "white" }}
                    >
                      Show Password
                      <input
                        type="checkbox"
                        checked={!flag}
                        onChange={(e) => {
                          setFlag(e);
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="form-group cen">
                      <input
                        type="button"
                        value={
                          language === "English"
                            ? "Login"
                            : language === "Hindi"
                              ? "लॉग इन"
                              : language === "Urdu"
                                ? "لاگ ان"
                                : "Login"
                        }
                        className="btn float-right login_btn"
                        onClick={logincall}
                      ></input>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                      {language === "English"
                        ? "Don't have an account?"
                        : language === "Hindi"
                          ? "खाता नहीं है?"
                          : language === "Urdu"
                            ? "اکاؤنٹ نہیں ہے؟"
                            : "Don't have an account?"}
                    </div>
                    <div className="d-flex justify-content-center links my-2">
                      <button
                        className="btn btnyellow me-3"
                        onClick={() =>
                          showRegister(language, "user")
                        }  
                      >
                      {/*   {console.log(language)} */}
                        { 
                        language === "English"
                          ? "Sign Up for User"
                          : language === "Hindi"
                            ? "उपयोगकर्ता के लिए साइन अप करें"
                            : language === "Urdu"
                              ? "صارف کے لیے سائن اپ کریں"
                              : "Sign In"}
                      </button>
                      <button
                        className="btn btnyellow"
                        onClick={() =>
                          showRegister(language, "client")
                        }
                      >
                        {language === "English"
                          ? "Sign Up For Client"
                          : language === "Hindi"
                            ? "ग्राहक के लिए साइन अप करें"
                            : language === "Urdu"
                              ? "کلائنٹ کے لیے سائن اپ کریں"
                              : "Sign In"}
                      </button>
                    </div>
                    <div className="d-flex justify-content-center links my-2">
                      <button
                        className="btn btnyellow"
                        style={{ marginTop: "1%" }}
                        onClick={() => callForgetPassword()}
                      >
                        {language === "English"
                          ? "Forgot your password?"
                          : language === "Hindi"
                            ? "पासवर्ड भूल गए हैं? "
                            : language === "Urdu"
                              ? "اپنا پاس ورڈ بھول گئے؟"
                              : "Forgot your password?"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
}
