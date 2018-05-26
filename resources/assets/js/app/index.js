import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Timer = () => (
    <div>
        Timer
    </div>
);

const Reports = () => (
    <div>
        Reports
    </div>
);

const Projects = () => (
    <div>
        Projects
    </div>
);

const Clients = () => (
    <div>
        Clients
    </div>
);

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Timer</Link>
                </li>
                <li>
                    <Link to="/reports">Reports</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/clients">Clients</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={Timer} />
            <Route path="/reports" component={Reports} />
            <Route path="/projects" component={Projects} />
            <Route path="/clients" component={Clients} />
        </div>
    </Router>
);


render(<App />, document.getElementById('app'));