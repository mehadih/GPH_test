import React, {useEffect} from 'react';
import styled from "styled-components";
import DirectorList from "../../components/about/DirectorList";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/directorsCommittee.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import directorscommitteReducer, {fetchData} from "../api/redux/about/directors-committe";
import {useSelector} from "react-redux";
import {NextSeo} from "next-seo";

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = () => {

    // animation
    ScrollTrigger.refresh()
    const getData = useSelector(state => state.directorscommitteReducer)
    console.log(getData)

    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "board-of-directors-committee-banner");
    const auditCommittee = getData?.data?.sections?.find(f => f?.page_data?.slug === "audit-committee");
    const nominationCommittee = getData?.data?.sections?.find(f => f?.page_data?.slug === "nomination");
    const auditCommitteeList = auditCommittee?.posts?.list;
    const nominationCommitteeList = nominationCommittee?.posts?.list;
    // console.log(auditCommitteeList)
    // console.log(bannerImage)


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
                title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Board Of Directors'} | GPH Ispat`}
                description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
            />

            <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                         subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
            <DirectorList background_color="#FFFFFF" title={auditCommittee?.page_data?.subtitle}
                          auditCommitteeList={auditCommitteeList}/>
            <DirectorList background_color="#F9F9F9" title={nominationCommittee?.page_data?.subtitle}
                          auditCommitteeList={nominationCommitteeList}/>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`
    .directors_list_section{
      &:after{
        display: none;
      }
      &:nth-of-type(2){
        .directors_single__content{
          background: #FFFFFF;
        }
      }
    }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '36',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })
export default MyComponent;
