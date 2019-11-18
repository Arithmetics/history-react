import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { GiCorkedTube } from "react-icons/gi";

export default function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <GiCorkedTube />
          {" the lab"}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/owners">Owners</Nav.Link>
          <Nav.Link href="/auctions">Auctions</Nav.Link>
          <Nav.Link href="/players">Players</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
