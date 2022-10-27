import React, {useEffect} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import InnerBanner from "../../components/InnerBanner";
import JobList from "../../components/career/JobList";
import BannerImage from "../../public/images/dynamic/career/available-jobs.jpg";
import {useDispatch, useSelector} from "react-redux";
import careerReducer, {fetchCareer} from "../api/redux/career";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const AvailableJobs = () => {


    const getData = useSelector(state => state.careerReducer)

    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "jobs-banner");

    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;


    const joblists = getData?.data?.sections?.find(f => f?.page_data?.slug === "jobs");


    ScrollTrigger.refresh()

    // animation
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
        <div>
            <ParallaxProvider>
                <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle}
                             des={bannerDescription}/>
                <JobList joblists={joblists}/>
            </ParallaxProvider>
        </div>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '34',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchCareer([api_services, param]))
    })


export default AvailableJobs;