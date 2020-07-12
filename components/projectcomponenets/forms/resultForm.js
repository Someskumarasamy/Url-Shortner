import React from 'react'
import { toast } from 'react-toastify';

import { offensivecheck, urlCheck } from '../../../helpers/utils'
import { queryUrl, baseurl } from '../../../actions/index'

class Result extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
        this.state = {
            urlstate: props.state,
            valueurl: '',
            id: Math.random().toString(36).substring(7)
        }
        this.copytoclipboard = this.copytoclipboard.bind(this);
    }
    componentDidMount() {
        queryUrl(sessionStorage.getItem(this.state.urlstate + "_query"))
            .then(values => {
                this.setState({
                    valueurl: values
                })
            })
    }
    copytoclipboard(event) {
        try {
            if (navigator.clipboard) {
                console.log("Navigator available");
                navigator.clipboard.writeText(this.state.valueurl).then( x =>{toast.success("Copied")})
                .catch(err=>{
                    throw err
                })
            }
            else {
                var copyText = document.getElementById(this.state.id);
                copyText.select();
                document.execCommand("copy");
                toast.success("Text Copied!")
            }

        }
        catch (err) {
            console.log(err)
            toast.error("Error Occured")
        }
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
                                    <input className={`form-control`}
                                        id={this.state.id}
                                        type="text" name="furl"
                                        aria-describedby="urlHelp" required autoFocus={true} autoComplete='off' spellCheck="false"
                                        value={this.state.valueurl}
                                        disabled={true}
                                    />

                                    <small id="ogtitleerr" class="form-text">Happy Sharing</small>


                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" name="generate" id="generate"
                                        value={"Copy to Clipboard"}
                                        className='btn btn-primary'
                                        onClick={this.copytoclipboard}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="img-sec">
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

export default Result;   