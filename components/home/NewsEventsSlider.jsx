import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Title from "../Title";
import 'swiper/css/swiper.min.css';
import Swiper from 'react-id-swiper';
import NewsEvents from "../NewsEvents";
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import img1 from "../../public/images/dynamic/news&events/event1.jpg";
import img2 from "../../public/images/dynamic/news&events/event2.jpg";
import img3 from "../../public/images/dynamic/news&events/event3.jpg";
import img4 from "../../public/images/dynamic/news&events/event4.jpg";
import img5 from "../../public/images/dynamic/news&events/event5.jpg";


import {text} from "../../styles/globalStyleVars";
import Button from "../Button";

const MyComponent = () => {
    let leftRef = useRef();
    let leftRefM = useRef();
    let rightRef = useRef();
    let rightRefM = useRef();
    let mLeftRef = useRef();
    let mRightRef = useRef();
    let containerRef = useRef();
    let sliderRef2 = useRef();

    let [offset, setOffset] = useState(90)
    let [theWidth, SetTheWidth] = useState(0)
    let [activeNumber, setActiveNumber] = useState(1)
    let [totalNumber, setTotalNumber] = useState(1)
    let [innerWidth, setInnerWidth] = useState(0)


    // slider next prev action
    useEffect(() => {

        leftRef.current.addEventListener('click', () => {
            if (document.querySelector('.asNewsOnly .swiper-button-prev')) {
                document.querySelector('.asNewsOnly .swiper-button-prev').click()
            }
        });
        rightRef.current.addEventListener('click', () => {
            if (document.querySelector('.asNewsOnly .swiper-button-next')) {
                document.querySelector('.asNewsOnly .swiper-button-next').click()
            }
        });


    }, [sliderRef2, leftRef, rightRef]) // slider next prev action
    useEffect(() => {

        leftRefM.current.addEventListener('click', () => {
            if (document.querySelector('.asNewsOnly .swiper-button-prev')) {
                document.querySelector('.asNewsOnly .swiper-button-prev').click()
            }
        });
        rightRefM.current.addEventListener('click', () => {
            if (document.querySelector('.asNewsOnly .swiper-button-next')) {
                document.querySelector('.asNewsOnly .swiper-button-next').click()
            }
        });

    }, [leftRefM, rightRefM])

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
        slidesPerView: 1, spaceBetween: 20, // observer: true,
        loop: true,
        // autoplay: {
        //     delay: 5000, // disableOnInteraction: true,
        //     autoplay: false
        // },
        autoplay: false,
        pagination: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
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


    // news demodata

    const data1 = {
        title: 'Inauguration of GPH-CJKS Premier Football LeagueInauguration of GPH-CJKS Premier Football League',
        slug: 'inauguration-of-gph-cjks-premier-football-leagueinauguration-of-gph-cjks-premier-football-league'
    }
    const data2 = {
        title: 'GPH Family Night held',
        slug: 'media-events/gph-family-night-held'
    }
    const data3 = {
        title: 'GPH Steel-Prothom-alo held in-genius',
        slug: 'gph-steel-prothom-alo-held-in-genius'
    }


    return (
        <StyledComponent offset={offset} className='media-event-slider asNewsOnly pt-150 pb-150'>

            <Container ref={containerRef}>
                <Row>
                    <Col>
                        <Title margin={'0 0 40px 0'} text={'News & Events'}/>

                        <div className="slider-nav top">
                            <ul>
                                <li className='hover' ref={leftRef}><BsChevronLeft/></li>
                                <li className='hover' ref={rightRef}><BsChevronRight/></li>
                            </ul>
                        </div>


                    </Col>
                </Row>


            </Container>

            <Swiper {...sliderParams} ref={sliderRef2}>
                <div>
                    <NewsEvents
                        data={data1}
                        src={'https://bestinbd.com/projects/web/2206GPH/dev/admin/uploads/page/news--events/1666094396H06vs.jpg'}/>
                </div>
                <div>
                    <NewsEvents data={data2}
                                src={'https://bestinbd.com/projects/web/2206GPH/dev/admin/uploads/page/news--events/16660944455Azb3.jpg'}/>
                </div>
                <div>
                    <NewsEvents data={data3} src={img3}/>
                </div>

            </Swiper>

            <Container className='bottom-button'>
                <Button margin={'30px 0 0 0'} text={'Explore All'} src={'/media-events/news-events'}/>
                <div className="slider-nav">
                    <ul>
                        <li className='hover' ref={leftRefM}><BsChevronLeft/></li>
                        <li className='hover' ref={rightRefM}><BsChevronRight/></li>
                    </ul>
                </div>

            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #F9F9F9;


  .slider-nav {
    position: absolute;
    top: 7px;
    right: 15px;

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
        color: #ffffff;
        z-index: 2;
        font-size: 20px;
      }
    }
  }

  @media (min-width: 600px) {
    .swiper-container {
      margin-left: ${props => props.offset + 15}px;
      padding-right: ${props => props.offset + 15}px;
    }
  }


  .bottom-button {
    position: relative;
    @media (min-width: 768px) {
      .slider-nav {
        display: none;
      }
    }

    .slider-nav {
      top: auto;
      bottom: 10px;
      right: 15px;

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

  @media (max-width: 767px) {
    .top {
      display: none;
    }

  }

  @media (max-width: 599px) {
    .swiper-container {
      margin-left: 15px;
      padding-right: 15px;
    }

    .presslist__single__content {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  // @media (max-width: 767px) {
  //   .swiper-container {
    //     padding-right: ${props => props.offset + 20}px;
  //   }
  // }

`;

export default MyComponent;
