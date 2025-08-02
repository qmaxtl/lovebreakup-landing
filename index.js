import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState(["I'm here for you, always."]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    setMessages(prev => [...prev, userInput]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput })
    });

    const data = await res.json();
    setMessages(prev => [...prev, data.reply]);
  };

  return (
    <div style={{ backgroundColor: "#ffe6f0", minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div style={{ backgroundColor: "#fff0f5", padding: "2rem", borderRadius: "10px", maxWidth: "600px", margin: "0 auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "10px 0", padding: "10px", backgroundColor: "#ffd6e8", borderRadius: "10px" }}>
            {msg}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Say something..."
          style={{ width: "60%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#ff99bb", color: "#fff", border: "none" }}>
          Send
        </button>
      </div>
    </div>
  );
}
