import React, { useState, useEffect } from "react";
import firebase from "firebase";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./Chat.css";

// materialui icons
import {
	AddCircle,
	CardGiftcard,
	Gif,
	EmojiEmotions,
} from "@material-ui/icons";
import Message from "../Messages/Message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import db from "../../firebase";

const Chat = () => {
	const user = useSelector(selectUser);
	const channelId = useSelector(selectChannelId);
	const channelName = useSelector(selectChannelName);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (channelId) {
			db.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [channelId]);

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection("channels").doc(channelId).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user,
		});

		setInput("");
	};

	return (
		<div className="chat">
			<ChatHeader channelName />
			<div className="chat_messages">
				{messages.map((message) => (
					<Message
						timestamp={message.timestamp}
						message={message.message}
						user={message.user}
					/>
				))}
			</div>
			<div className="chat_input">
				<AddCircle fontSize="large" />
				<form>
					<input
						disabled={!channelId}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder={`@message ${channelName}`}
					/>
					<button
						className="chat_inputButton"
						type="submit"
						onClick={sendMessage}
					>
						Send Message
					</button>
				</form>
				<div className="chat_inputIcons">
					<CardGiftcard fontSize="large" />
					<Gif fontSize="large" />
					<EmojiEmotions fontSize="large" />
				</div>
			</div>
		</div>
	);
};

export default Chat;
