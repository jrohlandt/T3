'use strict';
import React from 'react';
import { FaFolderO, FaFolderOpenO, FaTag, FaTags } from 'react-icons/lib/fa';

class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({ expand: !this.state.expand });
    }

    handleChange(itemId) {

        this.setState({ expand: false });
        // Call parent handler.
        this.props.handleChange(itemId);
    }

    render() {
        const props = this.props;
        let selectedName;
        const items = props.options.map((o, i) => {
            if (props.selected != 0 && props.selected === o.id) {
                selectedName = o.name;
            }
            return (
                <li key={o.id} onClick={ () => this.handleChange(o.id) }>{o.name}</li>
            );
        });

        let icon;
        let iconExpanded;

        switch (props.displayIcon) {
            case 'folder':
                icon = <FaFolderO/>;
                iconExpanded = <FaFolderOpenO/>;
                break;
            case 'tag':
                icon = <FaTag/>;
                iconExpanded = <FaTags/>;
                break;
            default:
                icon = <FaFolderO/>;
                iconExpanded = <FaFolderOpenO/>;
        }

        return (
            <div style={{cursor: 'pointer'}} >
                <p onClick={this.toggleDropdown} >
                    <span>{ this.state.expand ? iconExpanded : icon }</span>
                    { selectedName ? (<b>{selectedName}</b>) : '' }
                </p>
                { this.state.expand 
                    ? <ul>{items}</ul> 
                    : '' 
                }
            </div>
        );
    }
    
};

export default DropDown;