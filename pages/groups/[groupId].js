import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function GroupChat() {
  const router = useRouter();
  const { groupId } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  // Fetch messages when component mounts or groupId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/messages/${groupId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (groupId) {
      fetchMessages();
    }
  }, [groupId]);

  // Handle joining and leaving socket room
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (groupId) {
      socket.emit("joinGroup", { groupId, token });

      socket.on("newMessage", handleMessageReceived);

      return () => {
        socket.off("newMessage", handleMessageReceived);
        socket.emit("leaveGroup", { groupId, token });
      };
    }
  }, [groupId]);

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    socket.emit("sendMessage", { groupId, token, content: newMessage });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Group Chat</h2>
        <div className="mb-4">
          {messages.map((message) => (
            <div key={message._id} className="mb-2">
              <strong>{message.sender.username}</strong>: {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="flex mb-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Type a message"
              required
            />
            <button
              type="submit"
              className="ml-2 text-white bg-blue-500 rounded px-3 py-2 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
