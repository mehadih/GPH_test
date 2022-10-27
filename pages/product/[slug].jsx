import React from 'react';
import styled from "styled-components";
import ListWithImage from "../../components/about/ListWithImage";
import ImageOne from "../../public/images/dynamic/about/image_one.jpg";
import ListWithGrid from "../../components/ListWithGrid";
import Table from "../../components/Table";
import {Col, Container, Row} from "react-bootstrap";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {fetchDetailData} from "../api/redux/product/product";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {useSelector} from "react-redux";
import Product from "../../components/Product";
import ReactHtmlParser from "react-html-parser";
import {gradient} from "../../styles/globalStyleVars";
import ListWithImageProduct from "../../components/product/ListWithImageProduct";
import {useRouter} from "next/router";

function Ro() {
    return null;
}

const MyComponent = () => {

    const getData = useSelector(state => state.productReducer.detail);
    const filterTitle = getData?.posts?.list?.find(f => f?.data?.type === '');
    const filterTable = getData?.posts?.list?.filter(f => f?.data?.type === '5');


    return (
        <StyledComponent>
            <div className="pt-150 pb-150">
                <ListWithImageProduct product_details={filterTitle?.data?.description} info={filterTitle && filterTitle}
                                      background="#F9F9F9"
                                      img={getData?.images?.list?.[0]?.full_path} filterTitle={filterTitle}/>

                <Container>
                    <Row>
                     <Col>
                         {
                             filterTable?.map(item => (
                                 ReactHtmlParser(item?.data?.description)
                             ))
                         }
                     </Col>
                    </Row>
                </Container>
            </div>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background: #F9F9F9;

  h3 {
    margin: 0 0 40px !important;
  }

  h4 {
    color: rgba(34, 34, 34, 0.5);
    line-height: 30px;
    font-weight: 600;
    margin: 0 0 25px;
    font-size: 20px;
    text-transform: uppercase;
  }

  p {
    margin: 0 0 25px;
  }

  .list_with_grid_section {
    .col-md-12 {
      padding: 0;
    }

    ul.grid_2 li {
      flex: 0 0 calc(50% - 15px) !important;
      padding: 0px;
    }
    ul.grid_1 li {
      flex: 0 0 100% !important;
      padding: 0px;
    }
    @media(max-width: 767px){
      ul.grid_2 li {
        flex: 0 0 100% !important;
        padding: 0px;
      }
   
    }
  }
  table{
    tr{
      &:first-child{
        th{
          display: none;
        }
        ${gradient} !important;
        width: 100%;
        display: flex;
        padding: 0;
        border: none;

        td {
          color: white;
          border-right: 1px solid white;

          &:last-child {
            border-right: none;
          }

        }

      }          
    }
  }
  .list_with_grid_section{
    ul{
      margin: 0 0 20px;
    }
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, query}) => {
        let api_services = ApiServices.PRODUCT_DETAIL;
        let param = {
            [ApiParamKey.project_slug]: query.slug
        }
        await store.dispatch(fetchDetailData([api_services, param]))
    })

export default MyComponent;
