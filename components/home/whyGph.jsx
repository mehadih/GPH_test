import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Title from "../Title";
import 'swiper/css/swiper.min.css';
import Swiper from 'react-id-swiper';
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import {gradient, gradientColor, text} from "../../styles/globalStyleVars";
import Button from "../Button";
import Banner from '../../public/images/dynamic/home/why-gph.jpg';
import blurHover from '../../public/images/static/blurbg.svg';
import hoverBlur from '../../public/images/static/hoverblur.svg';
import {Img} from "../Img";
import Box from "../Box";
import htmlparser from "react-html-parser";
import swiper from "swiper";

const MyComponent = ({data}) => {

    let leftRef2 = useRef();
    let leftRefM2 = useRef();
    let rightRef2 = useRef();
    let rightRefM2 = useRef();
    let mLeftRef2 = useRef();
    let mRightRef2 = useRef();
    let containerRef = useRef();
    let sliderRef = useRef();

    let [offset, setOffset] = useState(90)
    let [theWidth, SetTheWidth] = useState(0)
    let [activeNumber, setActiveNumber] = useState(1)
    let [totalNumber, setTotalNumber] = useState(1)
    let [innerWidth, setInnerWidth] = useState(0)
    const [show, setShow] = useState(false);
    const [BgHeight, setBgHeight] = useState();
    const [isActiveLeft, setIsActiveLeft] = useState(false);
    const [isActiveRight, setIsActiveRight] = useState(false);``

    // slider next prev action

    useEffect(() => {
        setOffset(containerRef.current?.offsetLeft)
        setInnerWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setOffset(containerRef.current?.offsetLeft)
            SetTheWidth(window.innerWidth)
        })

    }, [])

    // slider setting
    let sliderParams = {
        slidesPerView: 1,
        spaceBetween: 20, // observer: true,
        loop: false,
        // autoplay: {
        //     delay: 5000, // disableOnInteraction: true,
        //     autoplay: false
        // },
        // autoHeight: false,
        autoplay: false,
        pagination: true,
        speed: 1000,
        navigation: {
            prevEl: '.swiper-button-next',
            nextEl: '.swiper-button-prev',
        },
        breakpoints: {
            1099: {
                spaceBetween: 30, slidesPerView: 3,
            }, 768: {
                spaceBetween: 30, slidesPerView: 2,
            }, 600: {
                spaceBetween: 30, slidesPerView: 1,
            }

        },

    };
    const goNext = () => {
        if (sliderRef.current && sliderRef.current.swiper) {
            if(sliderRef.current.swiper.slideNext() == false){
                document.getElementById('go_next').classList.add('disabled');


            }else{
                sliderRef.current.swiper.slideNext()
                document.getElementById('go_next').classList.remove('disabled');
                document.getElementById('go_prev').classList.remove('disabled');


            }
        }
    };

    const goPrev = () => {
        if (sliderRef.current && sliderRef.current.swiper) {
            if(sliderRef.current.swiper.slidePrev() == false){
                console.log('false');

                document.getElementById('go_prev').classList.add('disabled');


            }else{
                sliderRef.current.swiper.slidePrev()
                document.getElementById('go_prev').classList.remove('disabled');
                document.getElementById('go_next').classList.remove('disabled');


            }
        }
    };


    return (
        <StyledComponent blurHover={blurHover} offset={offset} className='media-event-slider as-why-gph pt-150 pb-150'>
            <Img src={data?.images?.list[0]?.full_path}/>
            <Container ref={containerRef}>
                <Row>
                    <Col>
                        <Title color={'#FFF'} margin={'0 0 40px 0'} text={data?.page_data?.subtitle}/>

                        <div className="slider-nav top">
                            <ul>
                                <li className={'hover'} id={'go_prev'} onClick={goPrev}><BsChevronLeft/></li>
                                <li className={'hover'} id={'go_next'} onClick={goNext}><BsChevronRight/></li>
                            </ul>
                        </div>
                    </Col>
                </Row>


            </Container>

            <Swiper {...sliderParams} ref={sliderRef}>
                {
                    data?.posts?.list?.length > 0 && data?.posts?.list?.map(item => (
                        <div>
                            <Box key={item?.data?.id} slider text={item?.data.short_desc}
                                 title={item?.data.subtitle}/>
                        </div>
                    ))}


            </Swiper>

            <Container className='bottom-button'>
                <Button margin={'30px 0 0 0'} text={'Explore All'} src={'/media-events/news-events'}/>
                <div className="slider-nav">
                    <ul>
                        <li className='hover' id={'go_prev_mobile'} onClick={goPrev}><BsChevronLeft/></li>
                        <li className='hover' id={'go_prev_mobile'} onClick={goNext}><BsChevronRight/></li>
                    </ul>
                </div>

            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #F9F9F9;
  position: relative;

  .hover {
    background-color: #FFFFFF !important;
    border: 1px solid white;

    &:after {
      ${gradient}
    }

    &:hover {
      svg {
        color: white !important;

      }

      border: 1px solid #FB030C;
    }
  }

  .slider-nav {
    position: absolute;
    top: 7px;
    right: 15px;
    @media(min-width: 1024px){
      top: unset;
      bottom: 45px;
    }
    ul {
      display: flex;
    }

    li {
      height: 50px;
      width: 50px;
      background-color: ${text};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;

      &:nth-of-type(1) {
        margin-right: 20px;
      }

      svg {
        color: #222222;
        z-index: 2;
        font-size: 20px;
      }
    }
  }

  .swiper-container {
    margin-left: ${props => props.offset + 15}px;
    padding-right: ${props => props.offset + 15}px;
  }

  .bottom-button {
    position: relative;

    .dc-btn {
      display: none;
    }

    @media (min-width: 768px) {
      .slider-nav {
        display: none !important;
      }
    }

    .slider-nav {
      //top: auto;
      //bottom: 10px;
      //right: 15px;

      position: relative;
      display: flex;
      justify-content: flex-end;
      right: 0;
      margin-top: 40px;
      top: unset;

      li:nth-of-type(1) {
        margin-right: 14px;
      }

      .hover {
        height: 40px;
        width: 40px;

        svg {
          font-size: 17px;
        }
      }
    }
  }

  .box_global {
    margin: 0;
    height: 100%;
    display: flex;
    .box_wrp{
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .top {
      display: none;
    }
  }

  .swiper-slide {
    height: 100%;
  }

  // @media (max-width: 767px) {
  //   .swiper-container {
    //     padding-right: ${props => props.offset + 20}px;
  //   }
  // }
  .swiper-slide {
    height: initial;
  }

  .box_global_single:after {
    background-image: url('${hoverBlur}') !important;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .box_global_single:before {
    background-image: url('${blurHover}') !important;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  @media(min-width: 1024px){
    .title{
      width: 90%;
    }
  }
  @media(max-width: 767px){
    .title br{
      display: none;
    }
  }
`;

export default MyComponent;
