import React, {useEffect} from 'react';
import styled from "styled-components";
import DirectorMessage from "../../components/about/DirectorMessage";
import ImageOne from "../../public/images/dynamic/about/dm.jpg";
import chairman from "../../public/images/dynamic/about/chairman.png";
import md from "../../public/images/dynamic/about/md.png";
import DirectorList from "../../components/about/DirectorList";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/directorsCommittee.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import directorsReducer, {fetchData} from "../api/redux/about/directors";
import {useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {NextSeo} from "next-seo";

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import TextWithImage from "../../components/TextWithImage";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = () => {

    ScrollTrigger.refresh()

    const getData = useSelector(state => state.directorsReducer)

    console.log(getData)

    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-directors-profile-banner");
    const profileInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "profile-informations");
    const profileInfoList = getData?.data?.sections?.filter(f => f?.page_data?.slug !== "about-directors-profile-banner" && f?.page_data?.slug !== "directors" && f?.page_data?.slug !== "independent-directors" );

    console.log(profileInfoList)


    const directorInfoList = getData?.data?.sections?.find(f => f?.page_data?.slug === "directors");
    const directorInfo = directorInfoList?.posts.list;
    const independantDirectorInfoList = getData?.data?.sections?.find(f => f?.page_data?.slug === "independent-directors");
    const independantDirectorInfo = independantDirectorInfoList?.posts.list;

    const profileInfoActivitiesOne = profileInfo?.posts?.list?.find(f => f?.data?.id === 39);
    const profileInfoActivitiesTwo = profileInfo?.posts?.list?.find(f => f?.data?.id === 44);


    const profileInfoOne = profileInfo?.posts?.list?.find(f => f?.data?.id === 38);
    const profileInfoTwo = profileInfo?.posts?.list?.find(f => f?.data?.id === 42);

    console.log(profileInfoActivitiesOne?.data?.description)

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
        <StyledComponent>
            <NextSeo
                title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Directors Profile'} | GPH Ispat`}
                description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
            />

            <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                         subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
            {
                profileInfoList && profileInfoList.length>0 &&
                profileInfoList.map((element,index) =>{
                    if(index % 2 == 0){
                        return (
                           <DirectorMessage profileInfo={element} director_name={profileInfoOne?.data?.subtitle} des={profileInfoActivitiesOne?.data?.description} designation={profileInfoActivitiesOne?.data?.short_desc} col={6} img={profileInfoOne?.images[0]?.full_path} text_one={profileInfoOne?.data?.description}/>
                        ) ;
                    }else{
                        return (
                           <DirectorMessage profileInfo={element} bgColor="#222222" reverse director_name={profileInfoTwo?.data?.subtitle} des={profileInfoActivitiesTwo?.data?.description} designation={profileInfoActivitiesTwo?.data?.short_desc} col={6} img={profileInfoTwo?.images[0]?.full_path} text_one={profileInfoTwo?.data?.description}/>
                       ) ;
                    }
                })
            }
            {/*<DirectorMessage director_name={'Mr. Mohammed Jahangir Alam'} des={des} designation={'Managing Director'} col={6} img={md} text_one={text}/>*/}

            <DirectorList content_color="#FFFFFF" title={directorInfoList?.page_data?.subtitle} auditCommitteeList={directorInfo}/>
            <DirectorList content_color="#FFFFFF" bgColor="#F9F9F9" title={independantDirectorInfoList?.page_data?.subtitle} auditCommitteeList={independantDirectorInfo}/>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`

`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '71',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })
export default MyComponent;



