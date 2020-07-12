import React from 'react'

class SVGHtmlRender extends React.Component {
    //class component, must implement render() to show in dom
    render() {
        return (
            <div className={this.props.className} dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML} />
        );
    }
}

export default SVGHtmlRender;