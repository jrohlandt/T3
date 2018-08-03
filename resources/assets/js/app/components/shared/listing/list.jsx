import React from 'react';

const List = (props) => (
    <div>
        <table className='listing-table'>
            <tbody>
                {props.children}
            </tbody>
        </table>
    </div>
);

export default List;
