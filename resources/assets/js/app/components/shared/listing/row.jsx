import React from 'react';

import Trash from 'react-icons/lib/md/delete';
import Pencil from 'react-icons/lib/md/edit';

const Row = (props) => (
    <tr>
        <td>{props.name}</td>
        <td className='listing-td-actions'>
            <div onClick={() => props.showPopup('delete', props.id)}>
                <Trash/>
            </div>
            <div onClick={() => props.editRow(props.id)}>
                <Pencil/>
            </div>
        </td>
    </tr>
);

export default Row;