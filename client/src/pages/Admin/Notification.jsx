import { useState } from "react";

function Notification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const sendNotification = async () => {
    console.log("BUTTON CLICKED");
    const res = await fetch(
      "https://edunova-web-backend.onrender.com/api/auth/send-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Send Notification</h2>

      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Notification Message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
}

export default Notification;