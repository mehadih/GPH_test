import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/performanceBanner.jpg";
import {Col, Container, Row} from "react-bootstrap";
import govern from "../../public/images/dynamic/about/meterial.svg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/ourMaterial";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const MyComponent = () => {

    const getData = useSelector(state => state.materialReducer)

    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "our-material-banner");
    const bannerImageSrc = bannerSec?.images?.list[0].full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannertitle = bannerSec?.page_data?.subtitle;
    const bannerDescription = bannerSec?.page_data?.description;

    const firstSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "our-material-topics-first-section");
    const firstImage = firstSec?.images?.list[0].full_path;
    const seo = getData?.data;


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
            <NextSeo
                title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Our Material Topics'} | GPH Ispat`}
                description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
            />
            <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle} des={bannerDescription}/>
            <div className="first_section pt-150 pb-150">
                <Container>
                    <Row>
                        <Col md={12} className='fade-up'>
                            <img src={firstImage} alt=""/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  
  .first_section{
    background: #FFFFFF;
    img{
      height: 100%;
      width: 100%;
    }
  }

`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '80',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })

export default MyComponent;
