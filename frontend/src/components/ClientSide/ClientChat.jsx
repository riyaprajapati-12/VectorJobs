import React, { useEffect, useState, useRef } from "react";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ClientChat = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [freelancerUsernames, setFreelancerUsernames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const navigate = useNavigate();
  const messageEndRef = useRef(null);

  const fetchFreelancerUsernames = async (chatFreelancers) => {
    try {
      const response = await axiosInstance.post('/freelancer/getByIds', {
        ids: chatFreelancers,
      });
      console.log('API Response:', response.data); // Debug response
      const usernames = response.data.map((freelancer) => freelancer.username);
      setFreelancerUsernames(usernames);
    } catch (error) {
      console.error('Error fetching freelancer usernames:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/client/getUser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(response)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        console.error('Error fetching user info:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedFreelancer) return;

    const message = {
      receiver: selectedFreelancer,
      content: newMessage,
    };

    try {
      await axiosInstance.post("/chat/sendMessage", message);
      setMessages([...messages, { ...message, sender: userInfo._id, timestamp: new Date() }]);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (selectedFreelancer) {
      const fetchMessages = async () => {
        try {
          const response = await axiosInstance.get("/chat/getMessages", {
            params: { receiverId: selectedFreelancer }
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedFreelancer]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.chatFreelancer && userInfo.chatFreelancer.length > 0) {
      fetchFreelancerUsernames(userInfo.chatFreelancer);
    }
  }, [userInfo]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex w-screen h-screen">
      <div className="bg-white w-1/3 flex flex-col">
        <h2 className="text-black text-3xl m-12">Contacts</h2>
        <div className="flex-grow p-4">
          {freelancerUsernames.length > 0 ? (
            freelancerUsernames.map((username, index) => (
              <div
                key={index}
                className={`w-full px-2 py-2 border-2 gap-2 cursor-pointer rounded-xl flex flex-row items-center ${
                  selectedFreelancer === username ? 'bg-blue-400 text-white' : 'bg-white'
                }`}
                onClick={() => setSelectedFreelancer(username)}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex m-2 items-center justify-center border border-lg border-stone-800 rounded-full text-slate-900 bg-slate-100 font-medium">
                  {getInitials(username)}
                </div>
                <div className="text-2xl text-neutral-800">{username}</div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="chatsection flex-grow flex flex-col">
          <div className="flex-grow overflow-auto p-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-lg ${
                    msg.sender === userInfo._id
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))
            ) : (
              <div>No messages</div>
            )}
            <div ref={messageEndRef} />
          </div>
          <div className="p-4 flex items-center border-t">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow border rounded p-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
