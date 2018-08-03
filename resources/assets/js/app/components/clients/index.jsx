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
            <Row key={c.id} name={c.name} />
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