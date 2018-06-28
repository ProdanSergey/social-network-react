import React from 'react';
import '../css/footer.css';

class Footer extends React.Component {
    render() {
      return (
            <footer className="row d-flex align-items-center justify-content-between footer">
                <div className="col-3">
                    <div className="copyright">Copyright © Anon</div>
                </div>
                <div className="col-9">
                    <div className="footer-nav">
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Contacts</li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;