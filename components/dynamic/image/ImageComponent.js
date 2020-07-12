import React from 'react'
import dynamic from 'next/dynamic'
const ImageRenderComponent = dynamic(
    () => 
        import('./ImageRender'), {
            ssr: false,
            loading: () =>
               ( <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            
        }
)
class ImageComponent extends React.Component {
    //class component, must implement render() to show in dom
    render() {
        return (
            <ImageRenderComponent {...this.props} />
        );
    }
}

export default ImageComponent;