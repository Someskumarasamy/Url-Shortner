import React from 'react'


import Form1 from './forms/Form1';
import OgMainForm from './forms/OgMain';
import FeedBckForm from './forms/FeedbackForm';
import Result from './forms/resultForm';

import { toast } from 'react-toastify';
import { getStateId } from '../../helpers/utils'
import { baseurl, storeUrl, submitfeedback } from '../../actions/index'
class URLMain extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
        this.state = {
            isOgFormOpen: false,
            isOgDataPresent: false,
            isFeedbackFormOpen: false,
            isBeta: true,
            isResult: false,
            cur_state_id: `${getStateId()}`
        }

        this.ogvalues = {
            ogtitle: "",
            ogdes: "",
            ogimg: ""
        }
        this.form1vals = {
            url: ""
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.saveog = this.saveog.bind(this);
        this.generateurl = this.generateurl.bind(this);
        this.submitFeedBack = this.submitFeedBack.bind(this);
    }
    // componentDidMount(){

    // }
    toggleForm() {
        this.setState({
            isOgFormOpen: !this.state.isOgFormOpen
        })
    }
    saveog(ogval) {
        this.ogvalues = ogval;
        alert(this.ogvalues);
        this.setState({
            isOgDataPresent: true
        })
        toast.success("Added Custom Og tags");
    }
    generateurl(formdta) {
        console.log(baseurl);
        sessionStorage.setItem(this.state.cur_state_id + "_url", formdta.url);
        sessionStorage.setItem(this.state.cur_state_id + "_og", JSON.stringify(this.ogvalues));
        const isFeedinTab = sessionStorage.getItem("feedbackSubmitted") === null || !sessionStorage.getItem("feedbackSubmitted");
        storeUrl({ formvalues: { url: formdta.url, isAuto: formdta.auto, ogdata: { ...this.ogvalues } } })
            .then(result => {
                sessionStorage.setItem(this.state.cur_state_id + "_query", result.query_id);
                if (!isFeedinTab) {
                    this.setState({
                        isResult: true
                    })
                }
                else if (this.state.isBeta) {
                    this.setState({
                        isFeedbackFormOpen: true
                    })
                }
                toast.success("Generating url");
            })
            .catch(err => {
                console.error(err);
                toast.error("Oops Error in Creating URL");
            })

    }
    submitFeedBack(values) {
        submitfeedback(values)
            .then(res => {
                sessionStorage.setItem("feedbackSubmitted",true)
                this.setState({
                    isResult: true,
                    isFeedbackFormOpen: false
                })
            })
            .catch(err => {
                toast.error("Opps Error in Submitting feebback");
            })

    }
    renderPage() {
        return (
            <div className="main-page">
                {
                    this.state.isResult ?
                        <Result state={this.state.cur_state_id}/>
                        :
                        this.state.isBeta && this.state.isFeedbackFormOpen ?
                            <FeedBckForm
                                formName="Feed back"
                                onSubmit={this.submitFeedBack}
                            />
                            :
                            !this.state.isOgFormOpen ?
                                <Form1
                                    toggle={this.toggleForm}
                                    formName="Shorten Url"
                                    submitForm={this.generateurl}
                                    hasOGdta={this.state.isOgDataPresent}
                                    intialval={this.form1vals}
                                />
                                :
                                <OgMainForm
                                    toggle={this.toggleForm}
                                    formName="Customize URL"
                                    saveog={this.saveog}
                                    intialval={this.ogvalues}
                                />
                }


            </div>
        )
    }
    render() {
        return (
            this.renderPage()
        );
    }
}

//export async function getServerSideProps(context) {

// }

export default URLMain;   