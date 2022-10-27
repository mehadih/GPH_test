import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/product_banner.jpg";
import product from "../../public/images/dynamic/p1.jpg";
import product_2 from "../../public/images/dynamic/p2.jpg";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../../components/Title";
import Product from "../../components/Product";
import {fetchData} from '../api/redux/product/product'
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {useSelector} from "react-redux";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = () => {
    let maintitle = "Product & Services";
    let sub = "Products";
    let desbanner = "Ensures Strength, Flexibility, Unparalled quality and unbreakable bond with cement that forms the foundation of your installation.\n";

    // animation
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
    }, [])


    // product data
    const productData = useSelector(state => state.productReducer.data);
console.log(productData)


    return (
        <StyledComponent>
            <InnerBanner title={maintitle} img={BannerImage} subtitle={sub} des={desbanner}/>
            <section className="section_first pt-150 pb-120">
                <Container>
                    {/*<Row>*/}

                    {productData?.data?.map(data => (
                        <Row key={data?.id}>
                            <Col md={12}>
                                <Title text={data?.title} margin="0 0 40px"/>
                            </Col>
                            {data?.products?.map(item => (
                                <Col key={item.id} md={4} className='fade-up'>
                                    <Product img={item?.images?.list?.[0]?.full_path} title={item?.product_data?.title}
                                             text={item?.product_data?.description}
                                             src={`/product/${item?.product_data?.slug}`}/>
                                </Col>
                            ))}

                        </Row>
                    ))}


                    {/*</Row>*/}
                </Container>
            </section>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #F9F9F9;

    .product {
      margin: 0 0 30px;
    }
  }
`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.CATE_WITH_PROJECT;
        await store.dispatch(fetchData([api_services]))
    })
export default MyComponent;
