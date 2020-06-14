import React from 'react';
import './form-component.sass'

export default class FormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.formContent = props.formContent;
        this.formSubmit = props.formSubmit;
        this.formTitle = props.formTitle
    }

    render() {
        return (
            <div className="form-wrapper">
                <div className="form-head-wrapper">
                    <h1> { this.formTitle } </h1>
                </div>
                <div className="form-content">
                    <div className="form-input-container">
                        { this.formContent }
                    </div>
                    <div className="form-button-container">
                        { this.formSubmit }
                    </div>
                </div>
            </div>
        );
    }
}