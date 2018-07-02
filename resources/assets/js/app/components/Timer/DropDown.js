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
        setTimeout(() => this.setState({expand: false}), 0);
    }

    handleChange(itemId) {

        this.setState({ expand: false });
        // Call parent handler.
        this.props.handleChange(itemId);
    }

    render() {
        const props = this.props;
        let selectedName;
        let itemColor;
        const items = props.options.map((o, i) => {
            if (props.selected != 0 && props.selected === o.id) {
                selectedName = o.name;
                if (o.color != undefined) {
                    itemColor = o.color;
                }
            }
            return (
                <li key={o.id} onClick={ () => this.handleChange(o.id) }>{o.name}</li>
            );
        });

        let icon;
        let iconExpanded;

        switch (props.role) {
            case 'project-select':
                icon = <FaFolderO/>;
                iconExpanded = <FaFolderOpenO/>;
                break;
            case 'type-select':
                icon = <FaTag/>;
                iconExpanded = <FaTags/>;
                break;
            default:
                icon = <FaFolderO/>;
                iconExpanded = <FaFolderOpenO/>;
        }

        return (
            <div 
                className={ selectedName ? 'ttr-' + props.role : 'ttr-no-selected' } 
            >
                <div
                    tabIndex={0}
                    onClick={this.toggleDropdown} 
                    onBlur={this.handleOnBlur}  
                >
                    <div style={ itemColor ? {'color': `rgb(${itemColor})`} : {} }>
                        { selectedName ? selectedName : icon }
                    </div>
                    { this.state.expand 
                        ? <ul style={{position: 'absolute', background: 'white', zIndex: 10}}>
                                {items}
                            </ul>
                        : ''
                    }
                </div>
            </div>
        );
    }
    
};

export default DropDown;