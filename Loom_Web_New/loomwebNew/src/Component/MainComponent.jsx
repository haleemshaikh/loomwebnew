import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import { LoomPortalContext } from "../Context.jsx";
import App from "../App";
function MainComponent() {
  const [showMain, setShowMain] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginCompo, setShowLoginCompo] = useState(true);
  const [callDash, setCallDash] = useState(false);
  const [showSortedCompo, setShowSortedCompo] = useState(false);
  const [showListCompo, setShowListCompo] = useState(false);
  const [showFormCompo, setShowFormCompo] = useState(false);
  const [sortedName, setSortedName] = useState("");
  const [url, setUrl] = useState("");
  const [showLeftPane, setShowLeftPane] = useState(true);
  const [showReportCompo, setShowReportCompo] = useState(false);
  const [showMultiInsert, setShowMultiInsert] = useState(false);
  const [showMultiPage, setShowMultiPage] = useState(false);
  const [showClientReg, setShowClientReg] = useState(false);
  const [height, setHeight] = useState("800px");
  const [width, setWidth] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [heightTop, setHeightTop] = useState("50px");
  const [tabname, setTabname] = useState("");
  const [rid, setRid] = useState("");
  const [formRecordType, setFormRecordType] = useState("");
  const [showPropCompo, setShowPropCompo] = useState(false);
  const [showOwnerPrefComp, setShowOwnerPrefComp] = useState(false);
  const [showThemeCompo, setShowThemeCompo] = useState(false);
  const [showViewCompo, setShowViewCompo] = useState(false);
  const [showMultiTable, setShowMultiTable] = useState(false);
  const [showChecklistCompo, setShowChecklistCompo] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showGenerateNewPin, setShowGenerateNewPin] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [showClientInfoRec, setShowClientInfoRec] = useState(false);
  const [showRoleSelectionCompo, setShowRoleSelectionCompo] = useState(false);
  const [showHtmlPage, setShowHtmlPage] = useState(false);
  const [showMainCompo, setShowMainCompo] = useState(false);
  const [showNotificationCompo, setShowNotificationCompo] = useState(false);
  const [showUiPageCompo, setShowUiPageCompo] = useState(false);
  const [showVarBlankCompo, setShowVarBlankCompo] = useState(false);
  const [showVariableCompo, setShowVariableCompo] = useState(false);
  const [showStatusCompo, setShowStatusCompo] = useState(false);
  const [showTabularReport, setShowTabularReport] = useState(false);
  const [showViewTabularReport, setShowViewTabularReport] = useState(false);
  const [filter, setFilter] = useState("");
  const [timeline, setTimeline] = useState("");
  const [mtName, setMtName] = useState("");
  const [language, setLanguage] = useState("English");
  const [registerType, setRegisterType] = useState("");
  const [op, setOp] = useState("");
  const [un, setUn] = useState("");
  const [iD, setID] = useState("");
  const [rt, setRT] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userinfo, setUserinfo] = useState({});
  const [landingPref, setLandingPref] = useState({});
  const [html, setHtml] = useState("");
  const [script, setScript] = useState("");
  const [msg, setMsg] = useState([]);
  const [type, setType] = useState("");
  const [record, setRRecord] = useState([]);
  const [name, setName] = useState("");
  const [loca, setLoca] = useState("http://localhost:8082");
  const [test, setTest] = useState("gauhar");
  const [adminPanel, setAdminPanel] = useState(false);
  const [reload, setReload] = useState("");
  const [setRecord, setSetRecord] = useState({});
  const [reportName, setReportName] = useState("");
  const [impersonateName, setImpersonateName] = useState("");
  const [token ,setToken] =useState("abctoken");
 





  return (
    /*   <Registration /> */

  /*   <LoomPortalContext.Provider
     value={{
      token: token,
      loca: loca, 
      language:language,
      type :type,
      setLanguage:setLanguage,
      setType :setType
     }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </LoomPortalContext.Provider> */

    <App />



  );
}

export default MainComponent;
