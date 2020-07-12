import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';
import ErrorInline from '../components/error'
import UrlComponenet from '../components/projectcomponenets/UrlMainComponent'
import Head from 'next/head'
class URLMain extends React.Component {
    //class component, must implement render() to show in dom
    constructor(props) {
        super(props);
    }
    renderPage() {
        return (
            <UrlComponenet></UrlComponenet>
        )
    }
    renderEmpty() {
        return (
            <ErrorInline />
        )
    }
    render() {
        return (
            <BaseLayout className="main-page">
                <Head>

                    <title>{""}</title>

                    <meta name="description" content="" />
                   <meta name="keywords" content="somes portfolio, somes developer, somes blog, somes programming" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:site_name" content="" />
                    <meta property="og:title" content="" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="" />
                    <meta property="og:url" content="" />
                    <meta property="og:image" content="" />
                    <meta property="og:image:width" content="1200" />
                    <link rel="cannonical" href={`https://someskumar.herokuapp.com`} />
                    <link rel="icon" type="image/ico" href="/images/icon.ico" />
                </Head>
                {
                    // (this.props.isError || this.props.isEmpty)?
                    //     this.renderEmpty()
                    // :
                    this.renderPage()
                }

            </BaseLayout>
        );
    }
}

//export async function getServerSideProps(context) {

// }

export default withRouter(URLMain);   