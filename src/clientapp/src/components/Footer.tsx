import { Component, Fragment } from 'react'

class Footer extends Component {
    render() {
        return <Fragment>
            <footer className="footer">
                <span>
                    <b><a href="https://discord.gg/MFE76FqTyN" target="_blank">Join our Discord!</a></b> <br />
                    Made by <b>@carrak</b> | Special thanks to <b>@haps</b> and <b>@nopies</b>
                </span>
            </footer>
        </Fragment>;
    }
}

export default Footer;