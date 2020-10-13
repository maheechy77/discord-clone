import { Button } from "@material-ui/core";
import { auth, googleProvider } from "../../firebase";
import React from "react";
import "./Login.css";

const Login = () => {
	const signin = () => {
		auth.signInWithPopup(googleProvider).catch((err) => alert(err.message));
	};
	return (
		<div className="login">
			<div className="login_logo">
				<img
					src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
					alt="Discord Logo"
				/>
			</div>
			<Button onClick={signin}>Sign In</Button>
		</div>
	);
};

export default Login;
