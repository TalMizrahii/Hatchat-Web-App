import {Link} from 'react-router-dom';
function DisclaimerText() {
    return (
        <div className="bottomDisclaimer">
            <p>
                Not registered yet? <Link id="linkToChat" to="/register">Click here</Link> to register.
            </p>

            <div dir="ltr"
                 className="css-901oao r-14j79pv r-1k78y06 r-n6v787 r-16dba41 r-1cwl3u0 r-1p6iasa r-bcqeeo r-1qhn6m8 r-qvutc0">
                            <span
                                className="css-901oao css-16my406 r-1k78y06 r-bcqeeo r-qvutc0">© 2023 HatChat, Inc.
                            </span>
            </div>
        </div>
    );
}

export default DisclaimerText;
