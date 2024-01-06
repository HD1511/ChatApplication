import React, { useContext, useEffect, useRef, useState } from 'react';

import '../ChatMessagesComponent/ChatMessages.css';

import { UserDetailsContext } from '../Dashboard.jsx';
import moment from 'moment';

import { getChatMessages, postChatMessages } from '../../../api/apiHandler.js';

const ChatMessages = ({ showClickedChat }) => {
    const [newMessages, setNewMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { userDetails, socketSetter } = useContext(UserDetailsContext);
    const myElementRef = useRef(null);
    const anotherId = showClickedChat?.senderId === userDetails?._id ? showClickedChat?.recieverId : showClickedChat?.senderId;

    useEffect(() => {

        const collectAllMessages = async () => {
            const { data } = await getChatMessages(showClickedChat);
            setNewMessages(data.Data);
        }

        collectAllMessages();

    },[showClickedChat]);

    useEffect(() => {

        myElementRef.current?.scrollIntoView({
            behavior: "smooth",
        });

        socketSetter?.on('chatMessageRecieve', async (Data) => {
            setNewMessages((prev) => {
                return [...prev, Data];
            });
        });

        return () => {
            socketSetter?.off('chatMessageRecieve');
        }

    }, [newMessages]);

    const sendMessages = async () => {

        const { data } = await postChatMessages(showClickedChat, userDetails, message);
        const { Data } = data;

        setNewMessages((prev) => {
            return [...prev, Data];
        });

        socketSetter.emit('Send-chat-message', { Data, anotherId });

        setMessage("");
    };

    return (
        <>
            {showClickedChat ?
                <div className='chatMessagesBar'>
                    <div className='sender'>
                        <div className="img" style={{ backgroundImage: `url('/src/assets/${showClickedChat?.senderAvatar === userDetails?.Avatar ? showClickedChat?.recieverAvatar : showClickedChat?.senderAvatar}')` }}></div>
                        <div className="name">{showClickedChat?.senderName === userDetails?.Username ? showClickedChat?.recieverName : showClickedChat?.senderName}</div>
                    </div>
                    <div className="messagesWrapper">
                        <div className='messagesBar'>
                            {newMessages?.map((mes, ind) => {
                                return (
                                    <div className={userDetails?._id === mes.senderId ? 'sender' : 'reciever'} key={ind} >
                                        <div className='messages'>{mes.Message}
                                            <span className='dateTimeShower'>
                                                {moment(mes.createdAt).format("h:mm A")}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={myElementRef}></div>
                        </div>
                        <div className='inputChatBar'>
                            <i className="fa-solid fa-file sendIcon2" />
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <i className="fa-solid fa-paper-plane sendIcon1" onClick={sendMessages} />
                        </div>
                    </div>
                </div> :
                <div className='chatsNotOpened'>
                    No chats are opened yet.
                </div>
            }
        </>
    )
}

export default ChatMessages;