import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter, Router } from 'next/router';
import { redirectData, ogData, redirectData_server } from '../actions/index'
import Axios from 'axios'; import Head from 'next/head'

class Redirect extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
        this.state = {
            shortcode: props.shortcode,
            valid: props.isValid,
            response: "",
            og: {
                image: '',
                title: '',
                link: '',
                description: '',
                isOg: false
            },
        }
    }
    componentDidMount() {
        if (!this.state.valid) {
            setTimeout(() => {
                Router.push("/");
            }, 5000)
        }
        else if (this.props.isauto) {
            window.location.replace(this.props.mainurl);
        }
        else {
            redirectData(this.state.shortcode).then(async (val) => {

                const ogdta =
                    await ogData(encodeURIComponent(val.mainurl))
                        .then(val => { return val.meta })
                        .catch(err => {
                            console.log(err);
                            console.log("error in og");
                            this.setState({
                                og: {
                                    link: val.mainurl,
                                    description: val.mainurl,
                                    isOg: true
                                }
                            });
                            return null
                        });
                ogData == null ?
                    this.setState({
                        og: {
                            link: val.mainurl,
                            description: val.mainurl,
                            isOg: true
                        }
                    })
                    :
                    this.setState({
                        response: val,
                        og: {
                            image: ogdta.image ? ogdta.image.url : '',
                            title: ogdta.title || '',
                            link: ogdta.url || val.mainurl,
                            description: ogdta.description || val.mainurl,
                            isOg: true
                        },
                    })
            }).catch(err => {

            })
        }
    }
    renderPage(og) {
        return (
            <section className="main-section">
                {/* {this.state.og.isOg && this.renderOg(this.state.og)} */}
                <div className="ogdiv">
                    <div className="ogdiv__wrp swiper-wrapper">
                        <div className="ogdiv__item swiper-slide">
                            <div className="ogdiv__img">
                                <img src={og.image} loading="lazy" alt={og.title} />
                            </div>
                            <div className="ogdiv__content">
                                <span className="ogdiv__hostname">{new URL(og.link).hostname}</span>
                                <div className="ogdiv__title">{og.title}</div>
                                <div className="ogdiv__text">{og.description}</div>
                                <a onClick={() => {
                                    //var win = window.open(og.link, '_blank'); win.focus();
                                    alert(this.props.cusog)
                                    console.log(this.props)
                                }} className="ogdiv__button">REDIRECT</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    renderSkeleton() {
        return (
            <section className="main-section">
                <div className="ogdiv skeleton">
                    <div className="ogdiv__wrp">
                        <div className="ogdiv__item">
                            <div className="ogdiv__img">
                                <div className="inner-img"></div>
                            </div>
                            <div className="ogdiv__content">
                                <span className="ogdiv__hostname"></span>
                                <div className="ogdiv__title"></div>
                                <div className="ogdiv__text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    renderhead(props) {
        const og = props.cusog;
        return !props.isAuto && (
            <>
                <Head>

                    <title>{`${og.ogtitle}`}</title>

                    <meta name="description" content={og.ogdes} />
                    {/* <meta name="keywords" content="somes portfolio, somes developer, somes blog, somes programming" /> */}
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:site_name" content={"ghost"} />
                    <meta property="og:title" content={og.ogtitle} />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content={og.ogdes} />
                    <meta property="og:url" content={props.shortcode} />
                    <meta property="og:image" content={og.ogimg} />
                    <meta property="og:image:width" content="1200" />
                    <link rel="cannonical" href={`https://ghost.url`} />
                    <link rel="icon" type="image/ico" href="/images/icon.ico" />
                </Head>
            </>)
    }
    render() {
        return (
            <BaseLayout className="redirect-page main-page">
                <div className="main-page">
                    <div className="main-page">

                        {
                            this.renderhead(this.props)
                        }{
                            this.state.og.isOg ?
                                this.renderPage(this.state.og)
                                :
                                this.renderSkeleton()
                        }

                    </div>
                </div>



            </BaseLayout>
        );
    }
}

export async function getServerSideProps(context) {
    var getProps = null;
    const shortcode = context.query.page;
    const isValid = (shortcode != undefined && shortcode != null && shortcode != '')
    try {
        getProps = await redirectData_server(shortcode);
        return { props: { shortcode: shortcode, isValid, cusog: getProps.ogdata, iserr: false, isauto: getProps.isAuto, mainurl: getProps.mainurl, minurl: getProps.minurl } }
    }
    catch (err) {
        console.log(err);
        return { props: { shortcode: shortcode, isValid, iserr: true, err: JSON.stringify(err) } }
    }
}

export default withRouter(Redirect);   