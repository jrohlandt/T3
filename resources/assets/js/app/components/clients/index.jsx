import React from 'react';
import Ajax from '../../core/Helpers/AjaxHelper';

import List from '../shared/listing/list.jsx';
import Row from '../shared/listing/row.jsx';

class Clients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clients: [],
        }

        this.deleteClient = this.deleteClient.bind(this);
        this.editClient = this.editClient.bind(this);
    }

    deleteClient(id) {
        console.log('delete client ', id);
    }

    editClient(id) {
        console.log('edit client ', id);
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
            />
        );

        return (
            <div>
                <List>
                    {clientRows}
                </List>
            </div>
        );
    }
};

export default Clients;