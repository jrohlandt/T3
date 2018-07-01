'use strict';
import React from 'react';
// import { FaFolderO, FaFolderOpenO, FaTag, FaTags } from 'react-icons/lib/fa';
import FaFolderO from 'react-icons/lib/fa/folder-o';
import FaFolderOpenO from 'react-icons/lib/fa/folder-open-o';
import FaTag from 'react-icons/lib/fa/tag';
import FaTags from 'react-icons/lib/fa/tags';

class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    toggleDropdown() {
        this.setState({ expand: !this.state.expand });
    }

    handleOnBlur() {
        console.log('on blur');
        setTimeout(() => this.toggleDropdown(), 0);
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
            <div style={{
                cursor: 'pointer',
                width: '50%',
                background: 'green',
                border: 'red',
                }} >
                { this.state.expand 
                    ? (
                        <div 
                            tabIndex={0}
                            onClick={this.toggleDropdown} 
                            onBlur={this.handleOnBlur}  
                            style={{border: 'red thick solid'}}
                        >
                            <p>
                                <span>{ iconExpanded }</span>
                                { selectedName ? (<b>{selectedName}</b>) : '' }
                            </p>
                            <ul style={{position: 'absolute', background: 'white', zIndex: 10}}>
                                {items}
                            </ul> 
                        </div>
                        )
                    : <div 
                        tabIndex={0}
                        onClick={this.toggleDropdown} 
                        onBlur={this.handleOnBlur}  
                        style={{border: 'blue thick solid'}}
                        >
                            <p>
                                <span>{ icon }</span>
                                { selectedName ? (<b>{selectedName}</b>) : '' }
                            </p>
                        </div>
                        
                }
            </div>
        );
    }
    
};

export default DropDown;