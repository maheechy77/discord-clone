import React from "react";
import "./ChatHeader.css";

//material ui icons

import {
	Notifications,
	EditLocationRounded,
	PeopleAltRounded,
	SearchRounded,
	SendRounded,
	HelpRounded,
} from "@material-ui/icons";

const ChatHeader = ({ channelName }) => {
	return (
		<div className="chatHeader">
			<div className="chat_headerLeft">
				<h3>
					<span className="chat_headerHash">#</span>
					{channelName}
				</h3>
			</div>
			<div className="chat_headerRight">
				<Notifications />
				<EditLocationRounded />
				<PeopleAltRounded />
				<div className="chat_headerSearch">
					<input placeholder="Search" />
					<SearchRounded />
				</div>
				<SendRounded />
				<HelpRounded />
			</div>
		</div>
	);
};

export default ChatHeader;
