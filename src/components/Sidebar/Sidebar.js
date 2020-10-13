import React, { useState, useEffect } from "react";
import "./Sidebar.css";

//material-ui icons
import {
	ExpandMore,
	Add,
	SignalCellularAlt,
	InfoOutlined,
	Call,
	Mic,
	Headset,
	Settings,
} from "@material-ui/icons";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../firebase";

const Sidebar = () => {
	const user = useSelector(selectUser);
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		db.collection("channels").onSnapshot((snapshot) => {
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					channel: doc.data(),
				}))
			);
		});
	}, []);

	const handleAddChannel = () => {
		const channelName = prompt("Enter a new Channel Name");

		if (channelName) {
			db.collection("channels").add({
				channelName: channelName,
			});
		}
	};

	return (
		<div className="sidebar">
			<div className="sidebar_top">
				<h3>General</h3>
				<ExpandMore />
			</div>
			<div className="sidebar_channels">
				<div className="sidebar_channelsHeader">
					<div className="sidebar_header">
						<ExpandMore />
						<h4>Text Channels</h4>
					</div>

					<Add onClick={handleAddChannel} className="sidebar_addChannel" />
				</div>
				<div className="sidebar_channelsList">
					{channels.map(({ id, channel }) => (
						<SidebarChannel
							key={id}
							id={id}
							channelName={channel.channelName}
						/>
					))}
				</div>
			</div>
			<div className="sidebar_voice">
				<SignalCellularAlt className="sidebar_voiceIcon" fontSize="large" />
				<div className="sidebar_voiceInfo">
					<h3>Voice Connected</h3>
					<p>Stream</p>
				</div>
				<div className="sidebar_voiceIcons">
					<InfoOutlined />
					<Call />
				</div>
			</div>
			<div className="sidebar_profile">
				<Avatar onClick={() => auth.signOut()} src={user?.photo} />
				<div className="sidebar_profileInfo">
					<h3>{user?.displayName}</h3>
					<p>#{user?.uid.substring(0, 5)}</p>
				</div>
				<div className="sidebar_profileIcons">
					<Mic />
					<Headset />
					<Settings />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
