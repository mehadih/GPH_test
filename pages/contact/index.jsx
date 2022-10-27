import React, {useEffect} from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {ParallaxProvider} from "react-scroll-parallax";
import ContactAddress from "../../components/contact/ContactAddress";
import InnerBanner from "../../components/InnerBanner";
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from "../../public/images/dynamic/about/banner.jpg";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {fetchContact} from "../api/redux/contact/index";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {Loader} from "../../components/loader";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ContactPage = () => {
    const getData = useSelector(state => state.contactReducer)
    // console.log(getData)
    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-banner");
    const contactTopInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-top");
    const contactBottomInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-bottom");
    // console.log(contactTopInfo)

    const contactLists = getData?.data?.sections;


    // animation
    ScrollTrigger.refresh()
    useEffect(() => {
        let allAnim = document.querySelectorAll('.fade-up');
        allAnim.forEach((el, index) => {
            gsap.fromTo(el, {
                autoAlpha: 0,
                y: 50,
                ease: "none",
            }, {
                y: 0,
                autoAlpha: 1,
                ease: "power2",
                duration: 1,
                scrollTrigger: {
                    id: `${index + 1}`,
                    trigger: el,
                    // start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                }
            })
        })
    }, [getData])

    return (
        <StyledComponent>
            {getData.loading && <Loader/>}
            <ParallaxProvider>
                <ToastContainer position="top-right" autoClose={4000} closeOnClick hideProgressBar={true}/>
                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                <ContactAddress contactTopInfo={contactTopInfo} contactBottomInfo={contactBottomInfo}/>
            </ParallaxProvider>
        </StyledComponent>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '131',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchContact([api_services, param]))
    })


const StyledComponent = styled.section`
    .addressBox{
      .title{
        margin: 0 0 20px;
      }
    }
`;

export default ContactPage;
