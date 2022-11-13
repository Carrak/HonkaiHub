import { Component } from 'react';

import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

class NavMenu extends Component {

    render() {
        return <Navbar className="nav-menu fixed-top" dark expand="xs">
            <NavbarBrand href="/">
                <img src="/YattaXtals.png" width="69px" />
                Honkai Hub
            </NavbarBrand>
            <Nav navbar className="me-auto">
                <NavLink href="/calculator">Calculator</NavLink>
            </Nav>
        </Navbar>;
    }
}

export default NavMenu;