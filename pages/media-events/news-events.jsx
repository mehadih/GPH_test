import React from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import InnerBanner from "../../components/InnerBanner";
import styled from "styled-components";
import NewsEvents from "../../components/media-events/NewsEvents";
import BannerImage from "../../public/images/dynamic/news&events/newsbanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchBannerData, fetchData, fetchPageData} from "../api/redux/mediaEvents/newsEvents";
import {useSelector} from "react-redux";

const NewsComponent = () => {
    const newsPageData = useSelector(state => state.newsEventsReducer);
    const bannerData = newsPageData?.dataBanner?.sections?.[0];
    const newsList = newsPageData?.data;
    console.log('Newslist-->', newsPageData)
    const seoData = newsPageData?.pageData?.page_data;
    const router = useRouter();
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
                <NewsEvents data={newsList}/>
            </ParallaxProvider>

        </StyledComponent>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services_banner = ApiServices.SECTIONS;
        let param_banner = {
            [ApiParamKey.page_id]: 5,
            [ApiParamKey.get_section]: true,
        }
        let api_services_page = ApiServices.GET_PAGE_BY_ID;
        let param_page_data = {
            [ApiParamKey.page_id]: 5,
        }
        let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
        let param = {
            [ApiParamKey.parent_id]: 5,
            [ApiParamKey.page_no]: 1,
            [ApiParamKey.per_page]: 5
        }
        await store.dispatch(fetchData([api_services, param]))
        await store.dispatch(fetchPageData([api_services_page, param_page_data]))
        await store.dispatch(fetchBannerData([api_services_banner, param_banner]))
    })
const StyledComponent = styled.section`

`;

export default NewsComponent;