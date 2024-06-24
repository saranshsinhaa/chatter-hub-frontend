import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { format } from "date-fns";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const socket = io(`${BASE_URL}`);

export default function GroupChat() {
  const router = useRouter();
  const { groupId } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/messages/${groupId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Messages", data);
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

  const handleLeaveChat = () => {
    const token = localStorage.getItem("token");
    socket.emit("leaveGroup", { groupId, token });
    router.push("/groups");
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-black">
      <div className="w-[65%] my-24 p-6 bg-white rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Group Chat</h2>
          <button
            onClick={handleLeaveChat}
            className="text-white bg-red-500 rounded px-3 py-2 hover:bg-red-700"
          >
            Leave Chat
          </button>
        </div>
        <div className="mb-4 max-h-[50vh] overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className="p-4 border border-gray-300 rounded-lg bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-blue-600">
                    {message.sender.username}
                  </strong>
                  : {message.content}
                </div>
                <i className="text-gray-500">
                  {message.timestamp
                    ? format(
                        new Date(message.timestamp),
                        "hh:mm a dd MMMM yyyy"
                      )
                    : "Just Now"}
                </i>
              </div>
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
