import React from 'react';

const Row = (props) => (
    <tr>
        <td>{props.name}</td>
        <td className='listing-td-actions'>
            actions
        </td>
    </tr>
);

export default Row;