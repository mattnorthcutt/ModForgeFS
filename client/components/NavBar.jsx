import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar className="mf-navbar" color="dark" dark fixed="top" expand="lg">
        <NavbarBrand className="navbar-logo" tag={RRNavLink} to="/">
        ModForge
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav className="navbar-links" navbar>
                
            </Nav>
            </Collapse>
            <Button
            className="nav-button nav-button-outline"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav className="navbar-right" navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button className="nav-button">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}
