import React from 'react'
import './button-component.sass'

export default class ButtonComponent extends React.Component {

    constructor(props) {
        super(props);

        this.label = props.label;
        this.onClick = props.onClick;

    }

    render() {
        return (
            <div className='button-wrapper' onClick={ this.onclick}>
                <span className='button-label'>{this.label}</span>
            </div>
        );
    }
}