import { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";

function randomID(len) {
  let result = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function App() {
  const [userInfo, setUserInfo] = useState({ userName: "", userID: "" });
  const [calleeId, setCalleeId] = useState("");

  function init() {
    const userId = randomID();
    const userName = "user_" + userId;
    setUserInfo({ userName, userID: userId });
  }

  useEffect(() => {
    init();
  }, []);

  const handleCall = async (callType) => {
    const appID = parseInt(import.meta.env.VITE_appID);
    const serverSecret = import.meta.env.VITE_serverSecret;

    if (!userInfo.userID || !userInfo.userName) {
      console.error("User ID or Username is missing.");
      return;
    }

    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userInfo.userID,
      userInfo.userName
    );

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    let callee = calleeId;

    if (!callee) {
      alert("Please input callee ID");
      return;
    }

    try {
      const res = await zp.sendCallInvitation({
        callees: [{ userID: calleeId, userName: userInfo.userName }],
        callType,
        timeout: 60,
      });

      if (res.errorInvitees.length) {
        alert("Failed to invite callee. Some invitees were not registered.");
      }
    } catch (err) {
      console.error("Error sending call invitation:", err);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Username: {userInfo.userName}</h2>
        <h2>UserId: {userInfo.userID}</h2>
      </div>

      <div className="input-field">
        <input
          type="text"
          placeholder="callee's userID"
          spellCheck="false"
          onChange={(e) => setCalleeId(e.target.value)}
        />
        <label>Enter Callee&apos;s UserID</label>
      </div>

      <div className="btns">
        <button
          onClick={() => handleCall(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
        >
          Video Call
        </button>
        <button
          onClick={() => handleCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
        >
          Voice Call
        </button>
      </div>
    </div>
  );
}

export default App;
