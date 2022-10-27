import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import img1 from "../../public/images/dynamic/tvc/video-1.jpg";
import img2 from "../../public/images/dynamic/tvc/video-2.jpg";
import img3 from "../../public/images/dynamic/tvc/video-3.jpg";
import img4 from "../../public/images/dynamic/tvc/video-4.jpg";
import img5 from "../../public/images/dynamic/tvc/video-5.jpg";
import img6 from "../../public/images/dynamic/tvc/video-6.jpg";
import {body_ms18} from "../../styles/globalStyleVars";
import playBtn from '../../public/icons/play-btn.svg'
import ModalVideo from "react-modal-video";
import 'react-modal-video/css/modal-video.min.css'
import {Img} from "../Img";
import indicator from "../../public/icons/indicator.svg";
import Select, {components} from "react-select";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import ListWithGrid from "../ListWithGrid";

gsap.registerPlugin(ScrollTrigger);


const VideoList = ({tvcVideoList}) => {
    let [open, setOpen] = useState(false);
    let [videoId, setVideo] = useState('');

    let handelOpen = (open, id) => {
        setOpen(open);
        setVideo(id);
    };
    const options = [
        {value: '2022', label: '2022'},
        {value: '2021', label: '2021'},
        {value: '2020', label: '2020'},
        {value: '2019', label: '2019'},
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const customStyles = {
        dropdownIndicator: (base, state) => ({
            ...base,
            transition: "all .2s ease",
            transform: state.selectProps.menuIsOpen && "rotate(180deg)"
        }),
        menu: (base) => ({
            ...base,
            zIndex: 1000
        }),
        control: (base, state) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: "#222222",
            borderRadius: 0,
            paddingLeft: 30,
            paddingRight: 30,
            height: 60,
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: "#222222",
                cursor: 'pointer'
            },
        }),
        option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isSelected ? '#221F1F' : '#FFF',
            "&:hover": {
                backgroundColor: "transparent",
                color: '#222222',
                cursor: 'pointer'
            },
        }),
        indicatorContainer: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)"
        })
    };
    const CaretDownIcon = () => {
        return <img src={indicator} style={{width: 20, height: 10}}/>;
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon/>
            </components.DropdownIndicator>
        );
    };

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

    return (
        <>
            <ModalVideo channel='youtube' isOpen={open} videoId={videoId} onClose={() => handelOpen(false, '')}/>
            <StyledVideoList className='videolist pt-150 pb-150'>
                <Container>
                    <Row className='videolist__select '>
                        <Col md={6} lg={4} xs={12} className="selector_filter">
                            <Select styles={customStyles}
                                // defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    classNamePrefix={'react-select'}
                                    components={{DropdownIndicator}}
                                    defaultValue={{label: '2022', value: '2022'}}

                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            tvcVideoList?.posts?.list && tvcVideoList?.posts?.list?.length > 0 &&
                            tvcVideoList?.posts?.list?.map((element) => {
                                return (
                                    <>
                                        {/*<ModalVideo channel='youtube' isOpen={open}*/}
                                        {/*            videoId={element?.images?.[0]?.short_title?.replaceAll('https://youtu.be/', '')}*/}
                                        {/*            onClose={() => handelOpen(false, '')}/>*/}
                                        <Col md={6} lg={4} xs={12} className='videolist__single fade-up'
                                             onClick={() => handelOpen(true, `dPZvXVhPVSc`)} key={element?.data?.id}>
                                            <div className='videolist__single__box'>
                                                <div className='videolist__single__box__img'>
                                                    <Img src={element?.images?.[0]?.full_path}/>
                                                    <div className='play-btn'>
                                                        <div href="" className="playBtn">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='videolist__single__box__content'>
                                                    <h1>{element?.data?.title}</h1>
                                                </div>
                                            </div>
                                        </Col>
                                    </>

                                );
                            })
                        }

                    </Row>
                    <Row>
                        <Col lg={12} >
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121" viewBox="0 0 9.811 18.121">
                                                 <path id="Path_253" data-name="Path 253" d="M-1260.242,634.779l8,8,8-8" transform="translate(643.529 1261.303) rotate(90)" fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                            </svg>
                                        </span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item active"><a className="page-link " href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121" viewBox="0 0 9.811 18.121">
                                                  <path id="Path_254" data-name="Path 254" d="M-1260.242,634.779l8,8,8-8" transform="translate(-633.718 -1243.182) rotate(-90)" fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>

                                        </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </Col>
                    </Row>

                </Container>

            </StyledVideoList>
        </>

    );
};
const StyledVideoList = styled.section`
  .pagination {
    margin-top: 30px;

    li{
      &.page-item:first-child{
        .page-link{
          border: 0px solid transparent !important;
          :hover{
            background-color: transparent;
          }
        }
      }
      &.page-item:last-child{
        .page-link{
          border: 0px solid transparent !important;
          :hover{
            background-color: transparent;
          }
        }
      }
    }

    .page-item {
      margin: 10px;

      &:hover {
        svg {
          path {
            stroke: #EE1B24;
          }
        }
      }

      .page-link {
        position: relative;
        display: block;
        padding: 0.5rem 0.75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #EE1B24;
        background-color: transparent;
        border: 1px solid #dee2e6;
        border-radius: 3px;
        &:hover {
          color: white !important;
          background-color: #EE1B24;
        }
        :focus{
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
  background-color: #f9f9f9;

  .videolist__select {
    margin: 0 0 40px;

    .selector_filter {
      padding: 0;
    }
  }

  .videolist {

    &__single {
      margin-bottom: 30px;
      cursor: pointer;
      @media (max-width: 767px) {
        :last-child {
          margin-bottom: 0px;
        }
      }

      &__box {
        height: 100%;
        background-color: #FFFFFF;
        border: 1px solid transparent;

        &__content {
          padding: 30px 25px 30px 25px;

          h1 {
            ${body_ms18};
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }

        &__img {
          position: relative;
          padding-top: calc(250 / 370 * 100%);

          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .play-btn {
            margin: 0;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;

            display: flex;
            justify-content: center;
            align-items: center;

            div.playBtn {
              width: 40px;
              height: 40px;
              background-color: #FB030C;
              border-radius: 100%;
              //border: #fff solid 2px;
              position: relative;
              animation-name: ringPulse;
              animation-timing-function: ease-out;
              animation-direction: alternate;
              animation-iteration-count: infinite;
              animation-play-state: running;

              &:before {
                position: absolute;
                content: '';
                border-top: transparent 8px solid;
                border-bottom: transparent 8px solid;
                border-left: #fff 10px solid;
                top: 50%;
                left: 50%;
                transform: translate(-40%, -50%);
              }

              &:after {
                position: absolute;
                content: '';
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                //border: #fff solid 2px;
                border-radius: 100%;
                animation: ringPulse 1s infinite backwards;

              }

              &:hover {

              }
            }

            svg {
              width: 40px;
              height: 40px;
              z-index: 1;
              position: unset !important;
              top: unset;
              object-fit: unset;
            }
          }
        }

        &:hover {
          border: 1px solid #EE1B24;
          -webkit-transition: 1s ease-in-out;
          transition: 1s ease-in-out;
          -webkit-transition: all 0.2s ease-in-out;
          box-shadow: 0 5px 30px rgb(238 27 36 / 8%);
          border-radius: unset;

          div.playBtn {
            animation: shadowPulse 1s infinite linear;
            @keyframes shadowPulse {
              0% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 0 transparent,
                0 0 0 0 transparent;

              }

              10% {
                box-shadow: 0 0 8px 6px #FB030C,
                0 0 12px 10px transparent,
                0 0 12px 5px #FB030C;
              }

              80%, 100% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 40px transparent,
                0 0 0 40px transparent;
              }
            }
            @keyframes shadowPulse {
              0% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 0 transparent,
                0 0 0 0 transparent;
              }

              10% {
                box-shadow: 0 0 8px 6px #e1434b,
                0 0 12px 10px transparent,
                0 0 12px 5px #e1434b;
              }

              80%, 100% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 40px transparent,
                0 0 0 40px transparent;
              }
            }
          }
        }
      }
    }


  }


  &__select {
    margin-bottom: 40px;
    @media (max-width: 767px) {
      margin-bottom: 60px;
    }
  }

  .react-select {
    &__menu-list {
      padding: 10px;
    }

    &__menu {

    }

    &__control {
      padding: 18px 30px;
      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;

    }

    &__indicator {
      color: #222222;

    }

    &__option {
      background-color: white;
      color: #222222;
      font-size: 15px;

      &--is-focused {
        //color: white;
        //background-color: black;
      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent !important;
  }

  .css-yk16xz-control {
    border-radius: 0px;
  }

`
export default VideoList;
