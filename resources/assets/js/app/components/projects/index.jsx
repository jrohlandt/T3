import React from 'react';
import Ajax from '../../core/Helpers/AjaxHelper';

import List from '../shared/listing/list.jsx';
import Row from '../shared/listing/row.jsx';

const emptyProject = {
    name: '',
    clientId: 0,
    colorId: 0,
};

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            showPopup: false, // Valid values are: create, edit, delete and false.
            activeProject: {...emptyProject},
            savingToDb: false,
        }

        this.showPopup = this.showPopup.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.create = this.create.bind(this);
        this.store = this.store.bind(this);
        this.save = this.save.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let activeProject = {...this.state.activeProject};
        activeProject.name = event.target.value;
        this.setState({activeProject});
    }

    showPopup(type, id=0) {
        let newState = {
            showPopup: type,
        };

        if (id !== 0) {
            newState.activeProject = this.state.projects.filter(c => c.id == id)[0];
        }
        this.setState(newState);
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            activeProject: {...emptyProject},
        })
    }

    delete() {
        const id = this.state.activeProject.id;
        const projects = [...this.state.projects].filter(c => c.id != id);
        this.setState({projects});
        this.hidePopup();

        Ajax.delete('/app/projects', {id})
            .catch(err => console.log(err));
    }

    edit(id) {
        this.showPopup('edit', id);
    }

    save() {
        if (!this.state.activeProject.id) {
            return this.store();
        }

        const projects = this.state.projects.map(p => {
            if (this.state.activeProject.id === p.id) {
                return this.state.activeProject;
            }
            return p;
        });
        this.setState({projects});
        this.hidePopup();
        
        Ajax.put('/app/projects/', this.state.activeProject)
            .catch(err => console.log(err));
    }

    create() {
        this.showPopup('create');
    }

    store() {

        // Just return if the Create button was already clicked.
        if (this.state.savingToDb) {
            return;
        }

        this.setState({savingToDb: true});
        Ajax.post('/app/projects/', this.state.activeProject)
            .then(res => {
                let projects = [...this.state.projects];
                projects.push(res.project);
                this.setState({projects, savingToDb: false}); 
                this.hidePopup();
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        Ajax.get('/app/projects')
            .then(res => {
                this.setState({projects: res.projects});
            })
            .catch(err => console.log(err));
    }

    render() {

        const projectRows = this.state.projects.map(v => 
            <Row 
                key={v.id} 
                id={v.id} 
                name={v.name} 
                showPopup={this.showPopup}
                editRow={this.edit}
            />
        );

        const showPopup = this.state.showPopup;

        return (
            <div>

                <div className='main-header'>
                    <h1>Projects</h1>
                    <div 
                        className='create-new-btn'
                        onClick={this.create}>Create New</div>
                </div>
                
                <div className={ 'popup-overlay ' + (showPopup ? 'popup-show' : 'popup-hide')}>

                    {
                        showPopup === 'delete' 
                            ? <div className='popup-form'>
                                    <h3>Deleting project <small>{this.state.activeProject.name}</small></h3>.
                                    <div className='popup-buttons'>
                                        <div className='popup-btn-cancel'
                                            onClick={this.hidePopup}>Cancel</div>
                                        <div className='popup-btn-delete'
                                            onClick={this.delete}>Delete</div>
                                    </div>
                                </div>
                            : <form className='popup-form'>
                                    <h3>{this.state.activeProject.id ? 'Edit' : 'Create'} project</h3>        
                                    <input 
                                        type="text" 
                                        value={this.state.activeProject.name} 
                                        onChange={this.handleChange} 
                                    />
                                    <div className='popup-buttons'>
                                        <div className='popup-btn-cancel'
                                            onClick={this.hidePopup}>Cancel</div>
                                        <div className={ 'popup-btn-save ' + (this.state.savingToDb ? 'btn-disable' : '') }
                                            onClick={this.save}>{showPopup === 'edit' ? 'Save' : 'Create'}</div>
                                    </div>
                                </form>

                    }
                    
                </div>

                <List>
                    {projectRows}
                </List>

                
            </div>
        );
    }
};

export default Projects;