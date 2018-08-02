import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import '../../scss/main.scss';

import Timer from './components/tasks/index.jsx';
import Reports from './components/reports/index.jsx';
import Projects from './components/projects/index.jsx';
import Clients from './components/clients/index.jsx';

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
                                to="/app"
                                activeClassName="left-nav-active"
                            >
                            <FaClock size={20} style={{marginBottom: '5px'}}/>                            
                            <span>Timer</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/app/reports"
                                activeClassName="left-nav-active"
                            >
                            <FaBarChart size={20} style={{marginBottom: '5px'}}/>
                            <span>Reports</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/app/projects"
                                activeClassName="left-nav-active"
                            >
                            <FaFolderO size={20} style={{marginBottom: '5px'}}/>                            
                            <span>Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/app/clients"
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
                <Route exact path="/app" component={Timer} />
                <Route path="/app/reports" component={Reports} />
                <Route path="/app/projects" component={Projects} />
                <Route path="/app/clients" component={Clients} />
            </main>
        </div>
    </Router>
);


render(<App />, document.getElementById('app'));