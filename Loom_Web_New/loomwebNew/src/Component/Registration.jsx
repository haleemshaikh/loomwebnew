import React, { useContext } from "react";
import { useEffect, useState } from "react";
import WorkInProgress from "./WorkInProgress";
import axios from "axios";
import "../CSS/registercompo.css";
import "../CSS/formcompo.css";
import "../CSS/listcompo.css";
import { useLocation } from "react-router-dom";
import { LoomPortalContext } from "../Context.jsx";

export default function Registration(props) {
  
  const [record, setRecord] = useState([]);
 // const [loca, setLoca] = useState("http://localhost:8082");
// const [type, setType] = useState("client");
  const [loading, setLoading] = useState(false);
  const [page_error, setPage_error] = useState(false);
  const [error, setError] = useState();

// const { language } = useLocation().state.language;
// const { type, language } = props.location.state;
  const [formrecord, setFormRecord] = useState();
  const [message, setMessage] = useState();
  const [page_message, setpage_message] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tabId, setTabId] = useState();
  const [verify_error, setVerify_error] = useState();
  const [ob, setOb] = useState("");
  const [validation, setValidation] = useState();
  const [validation_error, setValidation_error] = useState();
  const location = useLocation();
 
  const {language ,type ,setLanguage ,loca}=useContext(LoomPortalContext)
 /*  const type =location.state.type;
  const language =location.state.language; */

  useEffect(() => {
    console.log(type); console.log(language);
    console.log(loca);

    getRegisterRecord();
  }, []);

  const getRegisterRecord = () => {
    setLoading(true);
    let url = "";
    if (type === "user") {
      url = loca + "/loom/registration/user/" + language;
    } else if (type === "client") {
      url = loca + "/loom/registration/client/" + language;
    }
    // setLoading(true);
    axios
      .get(url, {
        headers: {},
      })
      .then((resp) => {
        const mltpgrecord = resp.data;
        if (mltpgrecord !== "") {
          if ("Error" in mltpgrecord) {
            setLoading(false);
            setPage_error(true);
            setError(mltpgrecord.Error);
          } else {
            var mmm = mltpgrecord.formRecord[2].record;
            for (var i = 0; i < mmm.length; i++) {
              mmm[i].verified = "initial";
            }
            setTableName(mltpgrecord.formRecord[1].table.value);
            setTabId(mltpgrecord.formRecord[1].table.id);
            setLoading(false);
            setRecord(mmm);
            setFormRecord(mltpgrecord);
            console.log(mltpgrecord);
            console.log(mmm);
            setLoading(false);
          }
        }
      });
  };

  const fieldverify = (type, vl) => {
    if (type === "email") {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "String") {
      if (/[a-zA-Z0-9]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }

    if (type === "int") {
      if (/^[0-9]*$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "date") {
      if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "aadhar_number") {
      if (/\d{12}/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
  };

  const validationfn = (vl, index, ob) => {
    var formrecord = record;
    console.log(record);
    var minLength = formrecord[index].uivalid.min_length;
    if (minLength !== 0 && vl.length < minLength) {
      setVerify_error("Please verify your character!");
      formrecord[index].verified = "unverified";
    } else {
      if (formrecord[index].name === ob) {
        if (vl !== "") {
          formrecord[index].verified = fieldverify(formrecord[index].type, vl);
        } else {
          formrecord[index].verified = "initial";
        }
      }
    }
    setRecord(formrecord);
  };

  const Registerfn = () => {
    var rcd = record;
    var mandatory = [];
    var unverified = [];
    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true") {
        if (rcd[i].uivalid.mandatory === "true") {
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].name);
          }
        }
        if (
          rcd[i].type === "int" ||
          rcd[i].type === "String" ||
          rcd[i].type === "email" ||
          rcd[i].type === "date"
        ) {
          var veri = fieldverify(rcd[i].type, rcd[i].value);
          if (veri === "unverified") {
            unverified.push(rcd[i].name);
          }
        }
      }
    }
    console.log(mandatory.length);
    console.log("abc" + JSON.stringify(unverified));
    if (mandatory.length === 0 && unverified.length === 0) {
      var frcd = formrecord;
      frcd.formRecord[2].record = record;
      console.log("extarnalRCD " + JSON.stringify(frcd));
      setLoading(true);
      axios
        .post(loca + "/loom/create/externalrecord"  , frcd, {
          headers: {},
        })
        .then((resp) => {
          var registerrcd = resp.data;
          console.log("Response");
          console.log("registerrrrrrrrr " + JSON.stringify(registerrcd));
          console.log("inn");
          if ("Error" in registerrcd) {
            setPage_error(true);
            setError(registerrcd.Error);
            setLoading(false);
          } else {
            setpage_message(true);
            setMessage(registerrcd.formRecord[4].Message);
            setLoading(false);
          }
        });
    } else {
      console.log("mandatory" + JSON.stringify(mandatory));
      setPage_error(true);
      setError(" Check Mandatory fields not set:" + mandatory);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

 const  formChangefn = (vl, index, ob) =>{

  //  this.setState({ page_error: false, error: "", page_message: false, message: "" });
    setPage_error(false);   setError(""); setpage_message(false);  setMessage("");
    var frecord = record;
    if (frecord[index].name === ob) {
      if (frecord[index].type === "String") {
        if (frecord[index].validation === "number") {
          if (/^[0-9]*$/.test(vl)) {
            frecord[index].value = vl;
           // this.setState({ record: frecord, validation_error: false, validation: "" });
             setRecord([...frecord]); setValidation_error(false); setValidation("");
          } else {
            document.getElementById("myPopup");
           // this.setState({ validation_error: true, validation: "Only Accept Number", ob: ob });
            setValidation_error(true);  setValidation("Only Accept Number") ;  setOb(ob);
          }
        } else if (frecord[index].validation === "character") {
          if (/^[a-zA-Z\s]*$/.test(vl)) {
            frecord[index].value = vl;
         //   this.setState({ record: frecord, validation_error: false, validation: "" });
         setRecord([...frecord]); setValidation_error(false); setValidation("");
           // console.log(frecord[index].value);
           console.log(record);
            
          } else {
            document.getElementById("myPopup");
           // this.setState({ validation_error: true, validation: "Only Accept Character", ob: ob });
            setValidation_error(true);  setValidation("Only Accept Character") ;  setOb(ob);
        }
          }
        else if (frecord[index].validation === "withoutSpecialCharacter") {
          if (/^[_A-z0-9\s]*((-|\s)*[_A-z0-9])*$/.test(vl)) {
            frecord[index].value = vl;
           // this.setState({ record: frecord });
             setRecord([...frecord])
          }
        } else if (frecord[index].validation === "withSpecialCharacter") {
          if (/^[ A-Za-z0-9_@./#&+-]*$/.test(vl)) {
            frecord[index].value = vl;
          //  this.setState({ record: frecord });
               setRecord([...frecord])
          }
        } else if (frecord[index].validation === "zipCode") {
          if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(vl)) {
            frecord[index].value = vl;
           // this.setState({ record: frecord });
            setRecord([...frecord])
          }
        } else if (frecord[index].validation === "decimal") {
          if (/^\d*\.?\d*$/.test(vl)) {
            frecord[index].value = vl;
           // this.setState({ record: frecord });
            setRecord([...frecord])
          }
        } else if (frecord[index].validation === "ipAddress") {
          if (/((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}$/.test(vl)) {
            frecord[index].value = vl;
         //   this.setState({ record: frecord });
            //Ipv4 = (([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])
            //Ipv6 = ((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}
             setRecord([...frecord])
          }
        } else {
          if (/^[a-zA-Z0-9_\s]*$/.test(vl)) {
            frecord[index].value = vl;
           // this.setState({ record: frecord });
            setRecord([...frecord])
          }
        }
      } else {
        frecord[index].value = vl;
       // this.setState({ record: frecord });
        setRecord([...frecord])
      }
      }
    }
  

  return (
    <div className="container registerSetup mt-2">
      {loading === true ? (
        <WorkInProgress />
      ) : (
        <div className="maincss bg-dark  text-white">
       
          
          <div className="text_al">
            <div className="useric">
              <i
                className="fa fa-user-circle-o"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Profile"
              ></i>
            </div>

            <span className="mainsp">
              {tableName === "loom_registration"
                ? language === "English"
                  ? "User Registration Form!"
                  : language === "Hindi"
                  ? "उपयोगकर्ता पंजीकरण प्रपत्र!"
                  : "User Registration Form!"
                : null}
              {tableName === "client_new"
                ? language === "English"
                  ? "Client Registration Form!"
                  : language === "Hindi"
                  ? "ग्राहक पंजीकरण फॉर्म!"
                  : "Client Registration Form!"
                : null}
            </span>
          </div>
          {page_error === true && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{
                padding: "0.2rem 0.2rem",
                marginBottom: "0px",
              }}
            >
              {error}
            </div>
          )}

          {page_message === true && (
            <div
              className="alert alert-success"
              role="alert"
              style={{
                padding: "0.2rem 0.2rem",
                marginBottom: "0px",
              }}
            >
              {message}
            </div>
          )}

          {record.length === 0 && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <div className="">
            <div className="">
              {record.map((obj, index) => (
                <span key={index}>
                  {obj.uivalid.visible === "true" &&
                    obj.columnAccess === "true" && (
                      <div key={index} className=" dblock col-md-6 ">
                        <div className="inppd ">
                          {obj.type === "String" ? (
                            <div className="form-group objpdg mrg">
                              {obj.verified === "unverified" && (
                                <div
                                  className="alert alert_danger"
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  {verify_error}
                                </div>
                              )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "" && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              <span className="txt-white">{obj.label}</span>
                              {ob === obj.name &&
                                validation_error &&
                                validation !== "" && (
                                  <span
                                    className="popup_txt popuptext"
                                    id="myPopup"
                                  >
                                    {validation}
                                  </span>
                                )}

                              <input
                                type="text"
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control formpadd_danger"
                                    : "with form-control formpadd"
                                }
                                value={obj.value}
                                readOnly={obj.uivalid.read_only === "true"}
                                maxLength={obj.uivalid.max_length}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}

                           {obj.type === "int" ? (
                            <div className="form-group objpdg mrg">
                              {obj.verified === "unverified" && (
                                <div
                                  className="alert alert_danger"
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  Please verify your integer number!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "" && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>
                              <input
                                type="text"
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control formpadd_danger"
                                    : "with form-control formpadd"
                                }
                                value={obj.value}
                                readOnly={obj.uivalid.read_only === "true"}
                                maxLength={obj.uivalid.max_length}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}
                           
                           {obj.type === "aadhar_number" ? (
                            <div className="form-group objpdg mrg">
                              {obj.verified === "unverified" && (
                                <div
                                  className="alert alert_danger"
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  Please verify your aadhar number!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "" && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>
                              <input
                                type="text"
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control formpadd_danger"
                                    : "with form-control formpadd"
                                }
                                value={obj.value}
                                readOnly={obj.uivalid.read_only === "true"}
                                maxLength={obj.uivalid.max_length}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}
                          
                          {obj.type === "email" ? (
                            <div className="form-group objpdg mrg">
                              {obj.verified === "unverified" && (
                                <div
                                  className="alert alert_danger"
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  Email Format Not Correct!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "" && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>
                              <input
                                type="email"
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control formpadd_danger"
                                    : "with form-control formpadd"
                                }
                                value={obj.value}
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}

                         {obj.type === "choice" ? (
                            <div className="form-group mrg">
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "None" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>
                              <select
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control form-select formpadd_danger"
                                    : "with form-control form-select formpadd"
                                }
                                aria-label="Default select example"
                                value={obj.value}
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                              >
                                <option value="None">None</option>
                                {obj.choice.map((ch, chi) => (
                                  <option key={chi} value={ch.name}>
                                    {ch.value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : null}
                         {obj.type === "date" ? (
                            <div className=" form-group mrg">
                              {obj.verified === "unverified" && (
                                <div
                                  className={
                                    obj.verified === "unverified"
                                      ? "form-control formpadd_danger"
                                      : "form-control formpadd"
                                  }
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  please verify your date of birth!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "None" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>

                              <input
                                type="date"
                                className={
                                  obj.verified === "unverified"
                                    ? "with form-control formpadd_danger"
                                    : "with form-control formpadd"
                                }
                                value={obj.value}
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}

                        {obj.type === "time" ? (
                            <div className=" form-group">
                              {obj.verified === "unverified" && (
                                <div
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  please verify your time!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "None" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>

                              <input
                                type="time"
                                className="form-control formpadd"
                                value={obj.value}
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}
                        {obj.type === "datetime" ? (
                            <div className=" form-group">
                              {obj.verified === "unverified" && (
                                <div
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  role="alert"
                                  style={{
                                    padding: "0.2rem 0.2rem",
                                    marginBottom: "0px",
                                  }}
                                >
                                  please verify your date and time!
                                </div>
                              )}
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "None" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>

                              <input
                                type="datetime-local"
                                step="1"
                                className={
                                  obj.verified === "unverified"
                                    ? "form-control formpadd_danger"
                                    : "form-control formpadd"
                                }
                                value={obj.value}
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}

                         {obj.type === "boolean" ? (
                            <div className="form-check">
                              <span className="mainlab">{obj.label}</span>
                              <input
                                type="checkbox"
                                // className="checkpadd"
                                className="form-control checkpadd"
                                maxLength={obj.uivalid.max_length}
                                checked={obj.value === "true" ? true : false}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                              ></input>
                            </div>
                          ) : null}  

                        {obj.type === "lookup" ? (
                            <div className="form-group mrg">
                              {obj.uivalid.mandatory === "true" &&
                                obj.value !== "None" &&
                                obj.value !== "" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span className="mainlab">{obj.label}</span>
                              <select
                                className="with form-control form-select formpadd "
                                aria-label="Default select example"
                                value={obj.value}
                                onBlur={(e) =>
                                  validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onChange={(e) =>
                                  formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                              >
                                <option value="None">None</option>
                                {obj.lookup.map((ch, chi) => (
                                  <option key={chi} value={ch.name}>
                                    {ch.value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : null}
                           



                        </div>
                      </div>
                    )}
                </span>
              ))}
            </div>
          </div>
          {/*  */}
          <div className="btncen">
              <button
                type="button"
                className="btttt btn btn-success"
                onClick={Registerfn}
              >
                {language === "English"
                  ? "Register"
                  :language === "Hindi"
                    ? "पंजीकरण करवाना"
                    : "Registration Form!"}
              </button>
            </div>

        </div>
      )}
    </div>
  );
}
