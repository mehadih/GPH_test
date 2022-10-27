import {Provider} from 'react-redux';
import {useEffect} from "react";
import store from './api/store'
import {wrapper} from "./api/store";
import Menu from "../components/Menu";
import GlobalStyle from "../styles/globalStyle";
import {DefaultSeo} from "next-seo";
import SEO from '../next-seo.config'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import {ParallaxProvider} from "react-scroll-parallax";
import OrderNow from "../components/OrderNow";
import {CSSPlugin, gsap, TimelineLite} from "gsap";
import {useRouter} from "next/router";


function MyApp({Component, pageProps}) {

    const router = useRouter();

    useEffect(() => {

        if (router.pathname === '/search' || router.pathname === '/product/[slug]' || router.pathname === '/product/order' || router.pathname === '/media-events/[slug]' || router.pathname === '/career/[slug]') {
            document.body.classList.add('second-menu')
        } else {
            document.body.classList.remove('second-menu')
        }

    }, [router])

    return (

        <>
            <DefaultSeo {...SEO}/>
            <GlobalStyle/>
            <Menu/>
            <ParallaxProvider>
                <Component {...pageProps} />
                <OrderNow/>
                <Footer/>
            </ParallaxProvider>

        </>

    )
}

export default wrapper.withRedux(MyApp)
