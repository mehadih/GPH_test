import React from 'react';
import styled from "styled-components";
import InvestorsMatters from "../../components/investor-matters/InvestorsMatters";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {fetchData} from "../api/redux/investor-matters/index";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {useDispatch, useSelector} from "react-redux";


const MyComponent = () => {
    const dispatch = useDispatch();
    const getData = useSelector(state => state.investorReducer)
    const getPage = getData?.data?.page_data?.slug;


    return (
        <StyledComponent>
            <InvestorsMatters data={getData}/>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`

`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({query}) => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_slug]: query.slug,
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })

export default MyComponent;
