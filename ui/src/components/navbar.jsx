import * as React from "react";
import Container from "react-bootstrap/Container";
import NavbarBase  from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"; //toDo

export const Navbar = props => {
	return (
		<NavbarBase>
			<Container fluid style={{ padding: "0 30px" }}>
				<div className="navbar-holder d-flex align-items-center justify-content-between">
					<div className="navbar-header">
						<NavbarBase.Brand href="/" style={{ color: "#fff" }}>
							<div className="brand-text">{props.title}</div>
						</NavbarBase.Brand>
					</div>
				</div>
			</Container>
		</NavbarBase>
	);
};
