import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/performanceBanner.jpg";
import susleft from "../../public/images/dynamic/about/stackholder.jpg";

import {Col, Container, Row} from "react-bootstrap";
import TextWithImage from "../../components/TextWithImage";
import SubTitle from "../../components/SubTitle";
import TextList from "../../components/TextList";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/economicSustainability";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const MyComponent = () => {
    // animation
    ScrollTrigger.refresh()

    let maintitle = "Sustainability";
    let sub = "Our stakeholder engagement";
    // let desbanner = "GPH not only pursue financial outcomes but also invest in the sustainability and preservation of natural resources, technology, development and well-being of the employees as well as communities to make us future-ready.";

    const getData = useSelector(state => state.economicSustainabilityReducer)

    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "economic-sustainability-banner");
    const bannerImageSrc = bannerSec?.images?.list[0].full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannertitle = bannerSec?.page_data?.subtitle;


    const economicSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "economic-sustainability-details");
    // const economicImage = economicSec?.images?.list[0].full_path;
    const economicshortdesc = economicSec?.page_data?.short_desc;
    const economictitle = economicSec?.page_data?.subtitle;
    const economicdesc = economicSec?.page_data?.description;
    const seo = getData?.data;


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
                title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Economic Sustainability'} | GPH Ispat`}
                description={seo?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
            />
            <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle}/>
            <div className="section_first pt-150 pb-150">

                <Container>
                    <Row>
                        <Col md={12}>
                            <SubTitle text={economictitle}/>


                        </Col>
                    </Row>
                </Container>
                <TextWithImage text_one={economicdesc} />
                <Container>
                    <Row>
                        <TextList text={economicshortdesc}/>

                    </Row>
                </Container>
            </div>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #E9E9E9;
   .plain_text{
     margin: 0;
   }
  }
  .right_col_image_wrapper{
    padding-top: calc(600 / 530 * 100%) !important;
    @media(max-width: 1200px) and (min-width: 768px){
      height: 100%;
    }
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '87',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })


export default MyComponent;
