import React from 'react'
import dynamic from 'next/dynamic'
const HtmlRender = dynamic(
    () => 
        import('./HtmlRender'), {
            ssr: false,
            loading: () =>
               ( <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            
        }
)
class HtmlRenderComponent extends React.Component {
    //class component, must implement render() to show in dom
    render() {
        return (
            <HtmlRender {...this.props} />
        );
    }
}

export default HtmlRenderComponent;