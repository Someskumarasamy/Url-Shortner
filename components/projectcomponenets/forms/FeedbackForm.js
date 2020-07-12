import React from 'react'

import Feed from '../../forms/FeedBackForm'
class FeedBack extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
    }   
    renderForm() {
        return (
            <section className="main-section">
                <div className="container">
                    <div className="content-main">
                        <div className="form-sec">
                            <h1 className="title-text">{this.props.formName}</h1>
                            <div className="form-content">
                                <Feed onSubmit={this.props.onSubmit} />
                            </div>
                        </div>
                        <div className="img-sec">
                        <div class="alert alert-danger" role="alert">
                                Sorry, We made this mandatory for beta version
                            </div>
                            <figure className="main-image">
                                <img src={`/images/teardown.svg`} referrerPolicy="no-referrer" />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    render() {
        return (
            <div className="main-page">
                {
                    this.renderForm()
                }

            </div>
        );
    }
}

export default FeedBack;   