import Post from "../components/home/Post";
import {useDispatch, useSelector} from "react-redux";
import {ApiServices} from "./api/network/ApiServices";
import homeReducer, {fetchHome, postForm} from "./api/redux/home";
import {useEffect} from "react";
import {wrapper} from "./api/store";
import styled from "styled-components";
import {title, title_ms12, title_ms40, title_ms60} from "../styles/globalStyleVars";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeStyle from "../styles/scrollBehavior";
import {motion} from 'framer-motion';
import "lightgallery.js/dist/css/lightgallery.css";
import BannerVideo from "../components/home/BannerVideo";
import Quantum from "../components/home/Quantum";
import FeatureProduct from "../components/home/FeatureProduct";
import Sustainability from "../components/home/Sustainability";
import NewsEventsSlider from "../components/home/NewsEventsSlider";
import WhyGph from "../components/home/whyGph";
import {ApiParamKey} from "./api/network/ApiParamKey";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../components/PageAnimation";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    // animation
    ScrollTrigger.refresh();
    const dispatch = useDispatch();
    const homeData = useSelector(state => state.homeReducer);

    const bannerData = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'bannar');
    const quantumData = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'gph-quantum');
    const whyGph = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'why-gph-quantum');
    const sustainability = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === "sustainability");

    // useEffect(() => {
    //     let param = {
    //         [ApiParamKey.page_id]: '1',
    //         [ApiParamKey.get_section]: 'true'
    //     }
    //     let api_services = ApiServices.SECTIONS
    //     dispatch(fetchHome([api_services, param]))
    // }, [])

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
    }, [homeData])

    return (
        <motion.div exit="exit" animate="show" variants={PageAnimation} initial="hidden">
            <StyledHome className='home'>
                <HomeStyle/>
                <BannerVideo data={bannerData}/>
                <Quantum data={quantumData}/>
                <FeatureProduct/>
                <WhyGph data={whyGph}/>
                <Sustainability data={sustainability}/>
                <NewsEventsSlider/>
            </StyledHome>
        </motion.div>
    )


}


const StyledHome = styled.section`
  h1 {
    font-family: ${title};
  }

  .box_global {
    min-width: 100% !important;
  }

  .asNewsOnly {
    .dc-btn {
      display: none;
    }

    @media (max-width: 767px) {
      .swiper-container {
        padding-right: 100px;
      }

      .dc-btn {
        display: block;
      }
    }
  }

`;

Home.getInitialProps = wrapper.getInitialPageProps(
    (store) =>
        async () => {
            let param = {
                [ApiParamKey.page_id]: '1',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            await store.dispatch(fetchHome([api_services, param]))
        }
);

export default Home;



