import React from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {LightgalleryProvider} from "react-lightgallery";
import PressRelease from "../../components/media-events/PressRelease";
import {ParallaxProvider} from "react-scroll-parallax";
import VideoList from "../../components/media-events/VideoList";
import BannerImage from "../../public/images/dynamic/tvc/tvcBanner.jpg";
import {useSelector} from "react-redux";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/mediaEvents/tvc/index";

const MyComponent = () => {
    let title = "Media & Events";
    let sub = "TVC";
    let des =
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ";
    const getData = useSelector(state => state.tvcReducer)
    console.log(getData)
    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "tvc-banner");
    const tvcVideoList = getData?.data?.sections?.find(f => f?.page_data?.slug === "tvc-videos");
    console.log(tvcVideoList)

    return (
        <StyledComponent>
            <ParallaxProvider>
                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
               <VideoList tvcVideoList={tvcVideoList}/>
            </ParallaxProvider>
        </StyledComponent>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '152',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })

const StyledComponent = styled.section`

`;

export default MyComponent;
