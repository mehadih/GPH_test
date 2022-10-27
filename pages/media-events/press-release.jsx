import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import InnerBanner from "../../components/InnerBanner";
import PressRelease from "../../components/media-events/PressRelease";
import {ParallaxProvider} from "react-scroll-parallax";
import {LightgalleryProvider} from "react-lightgallery";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData, fetchBannerData} from "../api/redux/mediaEvents/pressRelease";
import {useSelector} from "react-redux";
import NewsEvents from "../../components/media-events/NewsEvents";

const PressReleaseComponent = () => {
    const [count, setCount] = useState(0);
    const newsPageData = useSelector(state => state.pressReleaseReducer);
    const bannerData = newsPageData?.dataBanner?.sections?.[0];
    const newsList = newsPageData?.data;
    const seoData = newsPageData?.pageData?.page_data;
    const router = useRouter();

    // const pageCount = Math.ceil((newsList.count / newsList?.list.length))

    // useEffect(() => {
    //     const pageCount = Math.ceil((newsList.count / newsList.length))
    //     setCount(pageCount)
    // }, [newsPageData])

    return (
        <StyledComponent>
            <NextSeo
                title={seoData?.meta_key !== '' ? seoData?.meta_key + ' | GPH Ispat Limited' : seoData?.title + ' | GPH Ispat Limited'}
                description={seoData?.meta_description !== '' ? seoData?.meta_description : ''}
                canonical={router.pathname}
                openGraph={{
                    url: router.pathname,
                    title: seoData?.meta_description !== '' ? seoData?.meta_description : seoData?.title,
                    description: seoData?.meta_description !== '' ? seoData?.meta_description : '',
                    type: 'website',
                    images: [
                        {
                            url: bannerData?.full_path,
                            width: 1280,
                            height: 720,
                            alt: 'GPH Ispat Limited',
                            type: 'image/jpeg',
                        }
                    ],
                    site_name: 'GPH Ispat Limited',
                }}
                // facebook={{
                //     appId: '3255355539451369888',
                // }}
                // twitter={{
                //     handle: '@handle',
                //     site: '@site',
                //     cardType: 'summary_large_image',
                // }}
            />
            <ParallaxProvider>
                <InnerBanner title={bannerData?.page_data?.short_desc} img={bannerData?.images?.list?.[0].full_path}
                             subtitle={bannerData?.page_data?.subtitle}
                             des={bannerData?.page_data?.description}/>
                <LightgalleryProvider>
                    <PressRelease data={newsList}/>
                </LightgalleryProvider>
            </ParallaxProvider>

        </StyledComponent>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services_banner = ApiServices.SECTIONS;
        let param_banner = {
            [ApiParamKey.page_id]: 121,
            [ApiParamKey.get_section]: true,
        }
        let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
        let param = {
            [ApiParamKey.parent_id]: 121,
            [ApiParamKey.page_no]: 1,
            [ApiParamKey.per_page]: 3
        }
        await store.dispatch(fetchData([api_services, param]))
        await store.dispatch(fetchBannerData([api_services_banner, param_banner]))
    })

const StyledComponent = styled.section`
   .lg-thumb-outer{
    display: none !important;
  }
`;


export default PressReleaseComponent;
