import React from 'react'

class ImageRenderComponent extends React.Component {
    //class component, must implement render() to show in dom
    render() {
        return (
                <img {...this.props} />
                          
        );
    }
}

export default ImageRenderComponent;