import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import '../../css/main.scss';

import Timer from './components/Timer/index.js';
import Reports from './components/Reports';
import Projects from './components/Projects';
import Clients from './components/Clients';

import FaClock from 'react-icons/lib/fa/clock-o';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
import FaFolderO from 'react-icons/lib/fa/folder-o';
import FaUser from 'react-icons/lib/fa/user';

const App = () => (
    <Router>
        <div id="wrapper">
            <aside id="sidebar-left">
                <div>
                    <h3>T3</h3>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact
                                to="/"
                                activeClassName="left-nav-active"
                            >
                            <FaClock size={20} style={{marginBottom: '5px'}}/>                            
                            <span>Timer</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/reports"
                                activeClassName="left-nav-active"
                            >
                            <FaBarChart size={20} style={{marginBottom: '5px'}}/>
                            <span>Reports</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/projects"
                                activeClassName="left-nav-active"
                            >
                            <FaFolderO size={20} style={{marginBottom: '5px'}}/>                            
                            <span>Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/clients"
                                activeClassName="left-nav-active"
                            >
                            <FaUser size={20} style={{marginBottom: '5px'}}/>                                                        
                            <span>Clients</span>
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