import React from 'react';
import Ajax from '../../core/Helpers/AjaxHelper';

import List from '../shared/listing/list.jsx';
import Row from '../shared/listing/row.jsx';

const emptyClient = {
    name: ''
};

class Clients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            showPopup: false,
            activeClient: {...emptyClient},
            storingNewClient: false,
        }

        this.deleteClient = this.deleteClient.bind(this);
        this.editClient = this.editClient.bind(this);
        this.createClient = this.createClient.bind(this);
        this.storeClient = this.storeClient.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.cancelPopup = this.cancelPopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let client = {...this.state.activeClient};
        client.name = event.target.value;
        this.setState({activeClient: client});
    }

    deleteClient(id) {
        console.log('delete client ', id);
    }

    editClient(id) {
        const client = this.state.clients.filter(c => c.id == id)[0];
        this.setState({
            showPopup: true, 
            activeClient: client,
        });
    }

    createClient() {
        this.setState({showPopup: true});
    }

    storeClient() {

        // Just return if the Create button was already clicked.
        if (this.state.storingNewClient) {
            return;
        }

        this.setState({storingNewClient: true});
        Ajax.post('/app/clients/', this.state.activeClient)
            .then(res => {
                let clients = [...this.state.clients];
                clients.push(res.client);
                this.setState({clients, storingNewClient: false}); 
                this.cancelPopup();
            })
            .catch(err => console.log(err));
    }

    saveClient() {

        if (!this.state.activeClient.id) {
            return this.storeClient();
        }

        const clients = this.state.clients.map(c => {
            if (this.state.activeClient.id === c.id) {
                return this.state.activeClient;
            }
            return c;
        });
        this.setState({clients});
        this.cancelPopup();
        
        Ajax.put('/app/clients/', this.state.activeClient)
            .catch(err => console.log(err));

    }
    
    cancelPopup() {
        this.setState({
            showPopup: false, 
            activeClient: {...emptyClient},
        });
    }

    componentDidMount() {
        Ajax.get('/app/clients')
            .then(res => {
                this.setState({clients: res.clients});
            })
            .catch(err => console.log(err));
    }

    render() {

        const clientRows = this.state.clients.map(c => 
            <Row 
                key={c.id} 
                id={c.id} 
                name={c.name} 
                deleteRow={this.deleteClient}
                editRow={this.editClient}
            />
        );

        return (
            <div>

                <div className='main-header'>
                    <h1>Clients</h1>
                    <div 
                        className='create-new-btn'
                        onClick={this.createClient}>Create New</div>
                </div>
                
                <div className={ 'popup-overlay ' + (this.state.showPopup ? 'popup-show' : 'popup-hide')}>
                    <form className='popup-form'>
                        <h3>{this.state.activeClient.id ? 'Edit' : 'Create'} client</h3>        
                        <input 
                            type="text" 
                            value={this.state.activeClient.name} 
                            onChange={this.handleChange} 
                        />
                        <div className='popup-buttons'>
                            <div className='popup-btn-cancel'
                                onClick={this.cancelPopup}>Cancel</div>
                            <div className={ 'popup-btn-save ' + (this.state.storingNewClient ? 'btn-disable' : '') }
                                onClick={this.saveClient}>{this.state.activeClient.id ? 'Save' : 'Create'}</div>
                        </div>
                    </form>
                </div>

                <List>
                    {clientRows}
                </List>

                
            </div>
        );
    }
};

export default Clients;