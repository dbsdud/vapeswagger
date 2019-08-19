import React from 'react';
import ReactDOM from 'react-dom';

import "./css/kopo.css"
import "./css/main2.css"
import "./css/bootstrap-custom.css"
import "./css/style.css"
import "react-toggle/style.css"
import "react-image-gallery/styles/css/image-gallery.css";
import Root from './components/Root';
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './components/serviceWorker';

ReactDOM.render(<Router><Root /></Router>, document.getElementById('root'));
serviceWorker.unregister();