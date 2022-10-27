import {configureStore} from "@reduxjs/toolkit";

import homeReducer from '../redux/home'
import backgroundReducer from '../redux/about/background'
import directorsReducer from '../redux/about/directors'
import missionReducer from '../redux/about/mission-vission-values'
import corporateinfoReducer from '../redux/about/corporate-info'
import directorscommitteReducer from '../redux/about/directors-committe'
import sisterconcernReducer from '../redux/about/sister-concern'
import researchdevelopmentReducer from '../redux/about/research-and-development'
import globalreachReducer from '../redux/about/global-reach'
import smartFutureReducer from '../redux/smarterFuture/smarterFuture'
import smartOpportunityReducer from '../redux/smarterFuture/opportunity-of-smart'
import gphsustainabilityReducer from '../redux/sustainability/gphSustainability'
import governancesustainabilityReducer from '../redux/sustainability/ourGovernance'
import performancesustainabilityReducer from '../redux/sustainability/ourPerformance'
import stakeholderReducer from '../redux/sustainability/ourStakeholders'
import materialReducer from '../redux/sustainability/ourMaterial'
import economicSustainabilityReducer from '../redux/sustainability/economicSustainability'
import environmentalSustainabilityReducer from '../redux/sustainability/environmentalSustainability'
import socialSustainabilityReducer from '../redux/sustainability/socialSustainability'
import energyReducer from '../redux/smarterFuture/energy-consumption'
import whygphReducer from '../redux/career/why-gph'
import hrpolicyReducer from '../redux/career/hr-policy'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "@reduxjs/toolkit";
import eafReducer from '../redux/product/eaf'
import serviceReducer from '../redux/product/service'
import qualityServiceReducer from '../redux/product/quality-service'
import contactReducer from '../redux/contact'
import careerReducer from '../redux/career/index'
import searchReducer from '../redux/search'
import productReducer from '../redux/product/product'
import pressReleaseReducer from '../redux/mediaEvents/pressRelease'
import newsEventsReducer from '../redux/mediaEvents/newsEvents'
import newsEventsDetailReducer from '../redux/mediaEvents/newsEvents/detail'
import orderReducer from '../redux/product/order'
import investorReducer from '../redux/investor-matters/index'
import brochureReducer from '../redux/mediaEvents/gphBrochure'
import tvcReducer from '../redux/mediaEvents/tvc/index'

import economicSustainability from "../redux/sustainability/economicSustainability";

// combined all reducers
const combinedReducer = combineReducers({
    homeReducer,
    backgroundReducer,
    smartOpportunityReducer,
    energyReducer,
    gphsustainabilityReducer,
    governancesustainabilityReducer,
    performancesustainabilityReducer,
    stakeholderReducer,
    materialReducer,
    economicSustainabilityReducer,
    environmentalSustainabilityReducer,
    socialSustainabilityReducer,
    contactReducer,
    directorsReducer,
    missionReducer,
    corporateinfoReducer,
    directorscommitteReducer,
    sisterconcernReducer,
    researchdevelopmentReducer,
    globalreachReducer,
    whygphReducer,
    hrpolicyReducer,
    economicSustainability,
    careerReducer,
    smartFutureReducer,
    eafReducer,
    serviceReducer,
    qualityServiceReducer,
    searchReducer,
    productReducer,
    pressReleaseReducer,
    newsEventsReducer,
    orderReducer,
    newsEventsDetailReducer,
    tvcReducer,
    brochureReducer,
    investorReducer
})

// master reducer
const masterReducer = (state, actions) => {
    if (actions.type === HYDRATE) {
        return {...state, ...actions.payload}
    } else {
        return combinedReducer(state, actions)
    }
}

// main store
export const store = () => configureStore({
    reducer: masterReducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(store) //,{debug: true} -- if need debug

