import React from 'react'

import { offensivecheck, urlCheck } from '../../../helpers/utils'
import { baseurl } from '../../../actions/index'

class Form2 extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
        this.state = {
            ogimg: "/images/man.svg",
            isPreview: false,
            viewrefresh: false,
            canSave: false
        };
        this.values = this.props.intialval;
        this.errors = {
            ogtitle: false,
            ogdes: false,
            ogimg: false
        };
        this.errormessage = {
            ogtitle: "",
            ogdes: "",
            ogimg: ""
        }
        this.refreshview = this.refreshview.bind(this);
        this.imagePreview = this.imagePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveandreturn = this.saveandreturn.bind(this);
        this.cancelandreturn = this.cancelandreturn.bind(this);
        this.validateblockedwords = this.validateblockedwords.bind(this);
    }
    refreshview() {
        this.setState({
            viewrefresh: !this.state.viewrefresh
        })
    }
    validateblockedwords(dta, id) {
        if (offensivecheck(dta)) {
            this.errors[id] = true;
            this.errormessage[id] = 'Contains offensive words';
            return false;
        }
        else {
            this.errors[id] = false;
            this.errormessage[id] = '';
            return true;
        }

    }
    handleChange(event) {
        const val = event.target.value;
        const id = event.target.name;
        if (!this.validateblockedwords(val, id)) {
            this.setState({
                canSave: false
            })
        }
        else {
            this.setState({
                canSave: true
            })
        }
        this.refreshview()
        this.values[id] = val.trim();
    }
    imagePreview(event) {
        const url = event.target.value;
        this.handleChange(event);
        urlCheck(url, false).then(ress => {
            if (ress) {
                this.setState({
                    ogimg: "/images/man.svg",
                    isPreview: false
                })
            }
            else {
                this.setState({
                    ogimg: url.trim(),
                    isPreview: true,
                })
            }
        })
    }

    saveandreturn() {
        if (this.state.canSave) {
            this.props.saveog(this.values);
            this.props.toggle();
        }
    }
    cancelandreturn() {
        this.props.toggle();
    }

    renderForm() {

        return (
            <section className="main-section">
                <div className="container">
                    <div className="content-main">
                        <div className="form-sec">
                            <div>
                                <h1 className="title-text">
                                    {this.props.formName}
                                </h1>

                            </div>

                            <div className="form-content">
                                <div class="form-group">
                                    <label htmlFor="og-title">OG - Title</label>
                                    <input className={`form-control ${this.errors.ogtitle ? "input-error" : ""}`} type="text" name="ogtitle" id="og-title" placeholder="Og Title" maxLength="100" value={this.values.ogtitle}
                                        onChange={this.handleChange}
                                    />
                                    {this.errors.ogtitle &&
                                        <small id="ogtitleerr" class="form-text error-text">{this.errormessage.ogtitle}</small>
                                    }

                                </div>
                                <div class="form-group">
                                    <label htmlFor="og-des">OG - Description</label>
                                    <textarea className={`form-control ${this.errors.ogdes ? "input-error" : ""}`} name="ogdes" id="og-title" placeholder="Og description " maxLength="260"
                                        value={this.values.ogdes}
                                        onChange={this.handleChange}

                                    />
                                    {this.errors.ogtitle &&
                                        <small id="ogdeshlp" class="form-text error-text">{this.errormessage.ogdes}</small>
                                    }
                                </div>
                                <div class="form-group">
                                    <label htmlFor="og-img">OG - Image</label>
                                    <input className={`form-control ${this.errors.ogimg ? "input-error" : ""}`} name="ogimg" id="og-img" placeholder="url of an image" aria-describedby="open graph tag image url"
                                        autoComplete='off' spellCheck="false"
                                        value={this.values.ogimg}
                                        onChange={this.imagePreview}

                                    />
                                    {this.errors.ogimg &&
                                        <small id="ogdeshlp" class="form-text error-text">{this.errormessage.ogimg}</small>
                                    }
                                </div>
                                <button type="button" className={`btn btn-link ${!this.state.canSave ? "disabled" : ""}`}
                                    disabled={!this.state.canSave}
                                    onClick={this.saveandreturn}>Save</button>

                                <button type="button" class="btn btn-link"
                                    onClick={this.cancelandreturn}
                                >Back</button>

                            </div>
                        </div>
                        <div className="img-sec">
                            <figure className="main-image">
                                {this.state.isPreview && <span>Image Preview</span>}
                                <img src={this.state.ogimg} loading="lazy" className={this.state.isPreview ? "previewImg" : ""} />
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

//export async function getServerSideProps(context) {

// }

export default Form2;   