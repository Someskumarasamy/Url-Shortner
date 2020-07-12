import React from 'react'
import { toast } from 'react-toastify';

import { offensivecheck, urlCheck } from '../../../helpers/utils'
import {baseurl} from '../../../actions/index'

class Form1 extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
        this.state = {
            isOg: false,
            isAuto: true,
            canSave: true,
            inSave: false,
            refresh: false
        };
        this.values = this.props.intialval;
        this.errors = {
            url: false
        };
        this.errormessage = {
            url: ''
        };
        this.toggleOG = this.toggleOG.bind(this);
        this.toggleAuto = this.toggleAuto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        this.refreshview = this.refreshview.bind(this);
        this.validateblockedwords = this.validateblockedwords.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }
    refreshview() {
        this.setState({
            refresh: !this.state.refresh
        })
    }
    toggleOG(event) {
        this.setState({
            isOg: !this.state.isOg
        })
    }
    toggleAuto(event) {
        this.setState({
            isAuto: !this.state.isAuto
        })
    }
    validateblockedwords(dta, id) {
        if (offensivecheck(dta)) {
            this.errors[id] = true;
            this.errormessage[id] = 'Contains offensive words';
            return false;
        }
        else {
            console.log("vaidate return tru")
            this.errors[id] = false;
            this.errormessage[id] = '';
            return true;
        }

    }
    handleUrl(event) {
        const val = event.target.value;
        const id = event.target.name;
        console.log("initial")
        if (this.handleChange(event)) {
            console.log("if inside")
            urlCheck(val, false).then(rtndta => {
                console.log(" I am in " + rtndta)
                if (rtndta) {
                    this.values[id] = val.trim();
                    this.setState({
                        canSave: true
                    })
                }
                else {
                    this.errors[id] = true;
                    this.errormessage[id] = 'Provide a Valid Url to minfiy';
                    this.setState({
                        canSave: false
                    })
                }
            })
                .then(dta => {
                    this.refreshview();
                })
        }
        this.refreshview();
    }
    handleChange(event) {
        const val = event.target.value;
        const id = event.target.name;
        console.log("initial change")
        if (!this.validateblockedwords(val, id)) {
            this.values[id] = val.trim();
            this.setState({
                canSave: false
            })
            this.refreshview();
            return false;
        }
        else {
            console.log("insude else hc")
            this.values[id] = val.trim();
            this.setState({
                canSave: true
            })
            this.refreshview();
            return true;
        }
    }
    saveForm() {
        var is_auto = this.state.isAuto;
        this.setState({
            inSave: true
        })
        if (this.state.isOg) {
            is_auto = false;
        }
        var url = this.values.url
        urlCheck(url, true)
            .then(rtndta => {
                console.log(" I am in " + rtndta)
                if (!rtndta) {
                    this.errors['url'] = true;
                    this.errormessage['url'] = 'Provide a Valid Url to minfiy';
                    this.setState({
                        canSave: false,
                        inSave: false
                    })
                    this.refreshview()
                    toast.error("We cannot fetch the url")
                }
                else {
                    this.setState({
                        inSave: false
                    });
                    this.props.submitForm({ url: url, auto: is_auto })
                }
            })
            
    }

    renderForm() {
        return (
            <section className="main-section">
                <div className="container">
                    <div className="content-main">
                        <div className="form-sec">
                            <h1 className="title-text">{this.props.formName}</h1>
                            <div className="form-content">
                                <div class="form-group">
                                    <label className="" for="name"></label>
                                    <input className={`form-control ${this.errors.url ? "input-error" : ""}`}
                                        type="text" name="url" id="url" placeholder="https://example.com"
                                        aria-describedby="urlHelp" required autoFocus={true} autoComplete='off' spellCheck="false"
                                        value={this.values.url}
                                        onChange={this.handleUrl}
                                    />
                                    {this.errors.url &&
                                        <small id="ogtitleerr" class="form-text error-text">{this.errormessage.url}</small>
                                    }

                                </div>

                                <div class="form-group checkbox">
                                    <label class="fill-tick">
                                        <input className={` ${!this.props.hasOGdta ? "disabled" : ""}`} type="checkbox" id="cusogcheck" disabled={!this.props.hasOGdta} checked={this.state.isOg}
                                            onChange={this.toggleOG}
                                        />
                                        <svg viewBox="0 0 21 21">
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                    </label>
                                    <span className="fill-span"> <a onClick={this.props.toggle} href="javascript:void(0);">Custom OG Tags</a> </span>
                                </div>
                                <div class={`form-group checkbox ${this.state.isOg ? "disabled" : ""}`}>
                                    <label class=" fill-tick">
                                        <input className={` ${this.state.isOg ? "disabled" : ""}`} type="checkbox" id="auto-check" disabled={this.state.isOg} checked={this.state.isAuto}
                                            onChange={this.toggleAuto}
                                        />
                                        <svg viewBox="0 0 21 21">
                                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                                        </svg>
                                    </label>
                                    <span className="fill-span">Auto Redirect <i class="fa fa-info-circle"></i></span>
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" name="generate" id="generate"
                                        value={this.state.inSave ? "Processing" : "Generate"}
                                        disabled={!this.state.canSave || this.state.inSave}
                                        className={`btn btn-primary ${!this.state.canSave || this.state.inSave ? "disabled" : ""}`}
                                        onClick={this.saveForm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="img-sec">
                            <figure className="main-image">
                                <img src={`/images/teardown.svg`} referrerPolicy="no-referrer" />
                            </figure>
                            <div class={`form-group checkbox center-flex`}>
                                    <span className="fill-span">Terms and Conditions Apply <i class="fa fa-info-circle"></i></span>
                                </div>
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

export default Form1;   