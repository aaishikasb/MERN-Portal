import React from 'react';
import './page-layout-component.sass';

export default class PageLayoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.pageRight = props.pageRight;
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-left">
                    <div className="header-container">
                        <h1> Placeholder Heading</h1>
                        <span>Subheading</span>
                    </div>
                </div>
                <div className="page-right">
                    { this.pageRight }
                </div>
            </div>
        );
    }
}
