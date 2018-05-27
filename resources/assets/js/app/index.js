import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import '../../css/main.css';

import Timer from './components/Timer/index.js';
import Reports from './components/Reports';
import Projects from './components/Projects';
import Clients from './components/Clients';

const App = () => (
    <Router>
        <div id="wrapper">
            <aside id="sidebar-left">
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact
                                to="/"
                                activeClassName="left-nav-active"
                            >Timer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/reports"
                                activeClassName="left-nav-active"
                            >Reports
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/projects"
                                activeClassName="left-nav-active"
                            >Projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/clients"
                                activeClassName="left-nav-active"
                            >Clients
                            </NavLink>
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