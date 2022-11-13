import { Component, Fragment } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer'
import NavMenu from './NavMenu'

class Layout extends Component {
    render() {
        return <Fragment>
            <NavMenu />
            <Footer />
            <Outlet />
        </Fragment>
    }
}

export default Layout;