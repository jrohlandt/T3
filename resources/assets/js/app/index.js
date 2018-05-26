import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../css/main.css';


const Timer = () => (
    <div>
        <div className="timer-active-task-row">
            <div className="ttr-main">
                    <div>This is the active task</div>
            </div>
            <div className="ttr-secondary">
                secondary
            </div>
            <div className="ttr-last">
                last
            </div>
        </div>
        <div className="timer-task-row">
            <div className="ttr-main">
                <div>This is a task description</div>
            </div>
            <div className="ttr-secondary">
                secondary
            </div>
            <div className="ttr-last">
                last
            </div>
        </div>
        <div className="timer-task-row">
            <div className="ttr-main">
                <div>This is a task description</div>
            </div>
            <div className="ttr-secondary">
                secondary
            </div>
            <div className="ttr-last">
                last
            </div>
        </div>
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
        <div id="wrapper">
            <aside id="sidebar-left">
                <nav>
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
                </nav>
            </aside>
            <main>
                <Route exact path="/" component={Timer} />
                <Route path="/reports" component={Reports} />
                <Route path="/projects" component={Projects} />
                <Route path="/clients" component={Clients} />
            </main>
        </div>
    </Router>
);


render(<App />, document.getElementById('app'));