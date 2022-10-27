import React, {useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Title from "../components/Title";
import InnerBanner from "../components/InnerBanner";
import {useRouter} from 'next/router'
import {title_ms30} from "../styles/globalStyleVars";
import {wrapper} from "./api/store";
import {ApiServices} from "./api/network/ApiServices";
import {ApiParamKey} from "./api/network/ApiParamKey";
import {fetchData} from "./api/redux/search";
// import {fetchData}
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../components/loader";

const MyComponent = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    let getSearchData = useSelector(state => state.searchReducer);

    // api call
    useEffect(() => {

        let api_services = ApiServices.SEARCH;
        let param = {
            [ApiParamKey.keyword]: router.query?.keyword,
        }
        dispatch(fetchData([api_services, param]))

    }, [router])

// data
    const filterProduct = getSearchData?.data?.data?.filter(f => f?.type === 'product');

    return (
        <StyledComponent className={'search pt-150 pb-150'}>
            {getSearchData?.loading && <Loader/>}
            <Container>
                <Row>
                    <Col>
                        <Title varient={title_ms30}
                               text={`${router.query?.keyword && router.query?.keyword !== '' ? router.query?.keyword + `(${filterProduct?.length})` : 'Search Result(0)'}`}/>
                    </Col>
                </Row>

                <Row className={'search__result'}>
                    <Col sm={8}>
                        <ul className={'list'}>
                            {filterProduct?.length > 0 ? filterProduct?.map(item => (
                                <li><Link href={`/product/${item?.slug}`}><a>{item?.title}</a></Link></li>
                            )) : <p>It seems we can’t find what you’re looking for. Perhaps searching can help.</p>}


                        </ul>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};


const StyledComponent = styled.section`
  .search__result {
    margin-top: 80px;

    ul.list li {
      &:before {
        content: counter(count, number);
      }

      a {
        display: block;
      }
    }
  }

  @media (max-width: 767px) {
    margin-top: 80px;
    .search__result {
      margin-top: 30px;

      .col-sm-8 {
        min-width: 100%;
      }
    }
  }

`;


export default MyComponent;
