import React from 'react';
import styled from "styled-components";
import {ParallaxProvider} from "react-scroll-parallax";
import InnerBanner from "../../components/InnerBanner";
import NewsEvents from "../../components/media-events/NewsEvents";
import BrochureList from "../../components/media-events/BrochureList";
import BannerImage from "../../public/images/dynamic/news&events/brochureBanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/mediaEvents/gphBrochure";
import {useDispatch, useSelector} from "react-redux";

const MyComponent = () => {
    const dispatch = useDispatch()
    const getData = useSelector(state => state.brochureReducer)
    console.log(getData)
    // data refactor




    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-brochure-banner");
    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;

    const getDownloadSectionData = getData?.data?.sections?.find(f => f?.page_data?.slug === "brochure-downloads");
    console.log(getDownloadSectionData)
    return (
        <StyledComponent>
            <ParallaxProvider>
                <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle} des={bannerDescription}/>
                <BrochureList data = {getDownloadSectionData} />
            </ParallaxProvider>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`

`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '149',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })

export default MyComponent;
