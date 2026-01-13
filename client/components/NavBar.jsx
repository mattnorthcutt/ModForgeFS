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
Dropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser, myProfile }) {
const [open, setOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);
const toggleProfile = () => setProfileOpen((prev) => !prev);

const profileImage = myProfile?.imageLocation || myProfile?.ImageLocation || "";
const fullName = myProfile?.firstName && myProfile?.lastName ? `${myProfile.firstName} ${myProfile.lastName}` : myProfile?.firstName || myProfile?.lastName || "Profile";
const email = myProfile?.email || myProfile?.Email || "";
const joinedRaw = myProfile?.createDateTime || myProfile?.CreateDateTime;
const joinedText = joinedRaw ? new Date(joinedRaw).toLocaleDateString() : "";

return (
    <div>
    <Navbar className="mf-navbar" color="dark" dark fixed="top" expand="lg">
        <NavbarBrand className="navbar-logo" tag={RRNavLink} to="/">
        ModForge
        </NavbarBrand>
        <Nav navbar className="me-auto">
            <NavItem>
                <NavLink tag={RRNavLink} to="/community">
                    Community
                </NavLink>
            </NavItem>
        </Nav>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav className="navbar-links" navbar>
                
            </Nav>
            </Collapse>

            <Dropdown isOpen={profileOpen} toggle={toggleProfile}>
                <DropdownToggle className="nav-button nav-button-outline" caret>
                    {myProfile?.firstName || "Profile"}
                </DropdownToggle>

                <DropdownMenu end className="mf-profile-menu">
                <div className="mf-profile-preview">
                    <div className="mf-profile-preview-top">
                    <div className="mf-profile-avatar">
                        {profileImage ? (
                        <img src={profileImage} alt="Profile" className="mf-profile-avatar-img"/>
                        ) : (
                        <div className="mf-profile-avatar-fallback" />
                        )}
                    </div>

                    <div className="mf-profile-meta">
                        <div className="mf-profile-name">{fullName}</div>
                        {email ? <div className="mf-profile-email">{email}</div> : null}
                        {joinedText ? (
                        <div className="mf-profile-joined">Joined: {joinedText}</div>) : null}
                        </div>
                    </div>

                    <div className="mf-profile-divider" />

                    <DropdownItem
                    className="mf-profile-logout"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        setProfileOpen(false);
                        logout().then(() => {
                        setLoggedInUser(null);
                        setOpen(false);
                        setProfileOpen(false);
                        });
                    }}
                    >
                    Logout
                    </DropdownItem>
                </div>
                </DropdownMenu>
                            </Dropdown>
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
