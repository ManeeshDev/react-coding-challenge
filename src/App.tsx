import React, {ReactElement, useEffect, useState} from 'react';
import './App.css';
import {RouteNames} from "./RouteNames";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./views/Home";

function App(): ReactElement {

    const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

    document.addEventListener('DOMSubtreeModified', (e) => checkScrollBar());

    useEffect(() => checkScrollBar(), [hasScrollbar]);

    const checkScrollBar = () => {
        let hasVerticalScrollbar;
        let rootElement = document.documentElement;
        hasVerticalScrollbar = rootElement.scrollHeight > rootElement.clientHeight;
        setHasScrollbar(hasVerticalScrollbar);
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/">
                        <Router>
                            <Switch>
                                <Route path={RouteNames.ROOT}><Home/></Route>
                                <Route path={RouteNames.HOME}><Home/></Route>
                            </Switch>
                        </Router>
                    </Route>
                </Switch>
            </Router>
            <footer className={"footer " + (!hasScrollbar ? "position-fixed " : "")}>
                <div className="d-flex justify-content-center text-center">
                    <div>
                        <h5 className="m-0 p-0 mb-1"><b>React Coding Challenge</b></h5>
                        <span>Made with ♥ by Maneesh 😎</span>
                        <p className="text-warning">
                            <a href="https://www.linkedin.com/in/maneeshprashanth/">linkedin</a>
                            &emsp; | &emsp;
                            <a href="https://github.com/ManeeshDev">github</a>
                            &emsp; | &emsp;
                            <a href="mailto:manishprashangamage23@gmail.com">mail to me</a>
                            &emsp; | &emsp;
                            <a href="https://www.facebook.com/maneeshprashanth/">facebook</a>
                            &emsp; | &emsp;
                            <a href="https://www.instagram.com/maneeshprashanth/">instagram</a>
                            &emsp; | &emsp;
                            <a href="https://twitter.com/maneeshprashan">twitter</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
