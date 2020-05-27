import React from 'react';
import './input-component.sass';

export default class InputComponents extends React.Component {

    constructor(props) {
        super(props);

        this.label = props.label;
        this.placeholder = props.placeholder;
        this.type = props.type;
        this.onChange = props.onChange;

    }
    render() {
        return (
            <div className='input-wrapper'>
                <span className='input-label'> { this.label } </span>
                <div className='input-container'>
                    <input type= {this.type} placeholder= {this.placeholder} onChange= { (e) => this.onChange(e.target.value)} />
                </div>
            </div>
        );
    }
}