import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Product from "../Product";
import Title from "../Title";
import p1 from '../../public/images/dynamic/product/p1.jpg';
import p2 from '../../public/images/dynamic/product/p2.jpg';
import p3 from '../../public/images/dynamic/product/p3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";


const MyComponent = () => {

    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    function PrevArrow(props) {
        const {className, style, onClick, currentSlide} = props;
        return (
            <div className={`left hover-here ${currentSlide === 0 ? " slick-disabled" : ""}`} onClick={onClick}>
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <defs>
                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1"
                                        gradientUnits="objectBoundingBox">
                            <stop offset="0" stop-color="#ad0000"/>
                            <stop offset="1" stop-color="red"/>
                        </linearGradient>
                    </defs>
                    <g id="Component_42_2" data-name="Component 42 – 2"
                       transform="translate(50 50) rotate(180)">
                        <g id="Ellipse_437" data-name="Ellipse 437" fill="none" stroke="#222"
                           stroke-width="1">
                            <circle cx="25" cy="25" r="25" stroke="none"/>
                            <circle cx="25" cy="25" r="24.5" fill="none"/>
                        </g>
                        <circle id="Ellipse_4377" data-name="Ellipse 437" cx="25" cy="25" r="25"
                                fill="#222"/>
                        <circle className='circle' id="Ellipse_471" data-name="Ellipse 471" cx="1"
                                cy="1" r="1"
                                transform="translate(24 24)" opacity="0" fill="url(#linear-gradient)"/>
                        <g id="Group_14802" data-name="Group 14802" transform="translate(22.75 17.5)">
                            <line id="Line_3789" data-name="Line 3789" x2="7" y2="7"
                                  transform="translate(0.25 0.5)" fill="none" stroke="#FFF"
                                  stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_3790" data-name="Line 3790" y1="8" x2="7"
                                  transform="translate(0.25 7.5)" fill="none" stroke="#FFF"
                                  stroke-linecap="round" stroke-width="1"/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }

    function NextArrow(props) {
        const {className, style, onClick, currentSlide, slideCount} = props;
        return (
            <div
                className={`right hover-here ${windowWidth > 768 ? currentSlide === slideCount - 3 ? " slick-disabled" : "" : currentSlide === slideCount - 1 ? " slick-disabled" : ""}`}
                onClick={onClick}>

                <svg width="50" height="50" viewBox="0 0 50 50">
                    <defs>
                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1"
                                        gradientUnits="objectBoundingBox">
                            <stop offset="0" stop-color="#ad0000"/>
                            <stop offset="1" stop-color="red"/>
                        </linearGradient>
                    </defs>
                    <g id="Component_42_2" data-name="Component 42 – 2"
                       transform="translate(50 50) rotate(180)">
                        <g id="Ellipse_437" data-name="Ellipse 437" fill="none" stroke="#222"
                           stroke-width="1">
                            <circle cx="25" cy="25" r="25" stroke="none"/>
                            <circle cx="25" cy="25" r="24.5" fill="none"/>
                        </g>
                        <circle id="Ellipse_4377" data-name="Ellipse 437" cx="25" cy="25" r="25"
                                fill="#222"/>
                        <circle className='circle' id="Ellipse_471" data-name="Ellipse 471" cx="1"
                                cy="1" r="1"
                                transform="translate(24 24)" opacity="0" fill="url(#linear-gradient)"/>
                        <g id="Group_14802" data-name="Group 14802" transform="translate(22.75 17.5)">
                            <line id="Line_3789" data-name="Line 3789" x2="7" y2="7"
                                  transform="translate(0.25 0.5)" fill="none" stroke="#FFF"
                                  stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_3790" data-name="Line 3790" y1="8" x2="7"
                                  transform="translate(0.25 7.5)" fill="none" stroke="#FFF"
                                  stroke-linecap="round" stroke-width="1"/>
                        </g>
                    </g>
                </svg>


            </div>
        );
    }

    const sliderSettings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
        speed: 900,
        autoplaySpeed: 5500,
        pauseOnHover: false,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <StyledComponent className='pt-150 pb-150 feature-product'>
            <Container>
                <Row>
                    <Col>
                        <Title margin={'0 0 40px 0'} text={'Products'}/>
                    </Col>

                </Row>
                <div className='feature-product__slider'>
                    <Slick {...sliderSettings}>
                        <Product text={'YS ≥ 500 MPa or 72,000 PSI <br> Class D: TS/YS = 1.25'}
                                 img={'https://bestinbd.com/projects/web/2206GPH/dev/admin/uploads/product/b500dwr/1666093899M3qKF.jpg'}
                                 title={'GPH Quantum B500CWR Rebar'} src={'/product/gph-quantum-b500cwr-rebar'}/>
                        <Product text={'<p>YS ≥ 500 MPa or 72,000 PSI <br> Class D: TS/YS = 1.25</p>'}
                                 title={'GPH Quantum B420DWR Rebar '} src={'/product/gph-quantum-b420dwr-rebar-'}/>
                        <Product text={'<p>YS ≥ 500 MPa or 72,000 PSI <br> Class D: TS/YS = 1.25</p>'}
                                 title={'GPH Quantum B500DWR Rebar'} src={'/product/gph-quantum-b500dwr-rebar'}/>
                    </Slick>
                </div>
            </Container>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #F9F9F9;

  .container {
    position: relative;
  }

  .left {
    position: absolute;
    display: flex;
    top: -91px;
    right: 85px;
    z-index: 3;
    cursor: pointer;

  }

  .right {
    position: absolute;
    display: flex;
    top: -91px;
    right: 15px;
    z-index: 3;
    cursor: pointer;
    transform: rotate(180deg);

  }

  .feature-product__slider {
    margin-left: -15px;
    margin-right: -15px;

    .product {
      padding: 0 15px;

      &:after {
        left: 15px;
      }

      &:hover {
        &:after {
          width: calc(100% - 30px);
        }
      }

    }
  }

  .slick-disabled {
    svg {
      line {
        stroke: #222222
      }

      #Ellipse_4377, #Ellipse_4379 {
        display: none;
      }
    }

  }

  .hover-here:hover {
    svg {
      line {
        stroke: #FFF;
      }
    }
  }

  @media (min-width: 767px) {
    .left, .right {
      display: none;
    }
  }


  @media (max-width: 768px) {
    .product__content {
      padding: 30px 20px 30px !important;

    }

    .product:after {
      width: calc(100% - 30px);

    }

    .left, .right {
      top: -80px !important
    }

    .left {
      right: 65px !important;
    }

    svg {
      height: 40px;
      width: 40px;
    }

    .slick-disabled:hover svg line {
      stroke: #222222 !important;
    }
  }

`;

export default MyComponent;
