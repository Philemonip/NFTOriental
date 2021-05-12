import { useState } from "react";
import SettingSide from "./SettingSide";
import SettingGeneral from "./SettingGeneral";
import SettingHi from "./SettingHi";
import SettingJoinUs from "./SettingJoinUs";

const Setting = () => {
  const [settingContent, setSettingContent] = useState("General");
  const setContent = (content) => {
    setSettingContent(content);
  };

  return (
    <div className="row">
      <div className="col-lg-2 col-sm-4 Setting">
        <SettingSide setContent={setContent} />
      </div>
      <div className="col-lg-10 col-sm-8">
        {settingContent === "General" ? (
          <SettingGeneral />
        ) : settingContent === "Hi" ? (
          <SettingHi />
        ) : (
          <SettingJoinUs />
        )}
      </div>
    </div>
  );
};

export default Setting;
