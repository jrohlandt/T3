import React from 'react';
import Ajax from '../../core/Helpers/AjaxHelper';

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
            <tr key={c.id} >
                <td>
                    {c.name}
                </td>
                <td className='listing-td-actions'>
                    actions
                </td>
            </tr>
        );
        return (
            <div>
                <table className='listing-table'>
                    <tbody>
                        {clientRows}
                    </tbody>
                </table>
            </div>
        );
    }
};



export default Clients;