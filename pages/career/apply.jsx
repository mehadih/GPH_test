import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {ParallaxProvider} from "react-scroll-parallax";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/contact-banner@2x.jpg";
import joblist from "../../public/images/dynamic/carrerjob.jpg";
import ContactAddress from "../../components/contact/ContactAddress";
import {Col, Container, Form, Row} from "react-bootstrap";
import Select from "react-select";
import Button from "../../components/Button";
import {Img} from "../../components/Img";
import {toast} from "react-toastify";
import {emailValidation, emptyNumber, emptyValidation} from "../api/config/validator";
import {ApiServices} from "../api/network/ApiServices";
import {postCareerForm, clear} from "../api/redux/career";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router';
import {ToastContainer} from "react-toastify";
import {Loader} from "../../components/loader";

const DropdownOption = [
    {value: 'HEAD OFFICE', label: 'HEAD OFFICE'},
    {value: 'SHARE DEPARTMENT', label: 'SHARE DEPARTMENT'},
    {value: 'FACTORY', label: 'FACTORY'},
    {value: 'DHAKA OFFICE', label: 'DHAKA OFFICE'},
    {value: 'SALES DEPARTMENT', label: 'SALES DEPARTMENT'},
    {value: 'UK & EUROPE CORRESPONDENCE', label: 'UK & EUROPE CORRESPONDENCE'},
    {value: 'WEB SITE', label: 'WEB SITE'}
];


const MyComponent = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const formData = useSelector(state => state.careerReducer)


//--- form submit
    const success = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        progress: undefined,

    });

    const error = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        progress: undefined,

    });

// form submit
    const [reg, setReg] = useState({
        name: "",
        department: "",
        // cv: "",
        // photo: "",
        phone: "",
        email: "",
        msg: "",
    });

    const [cv, setCv] = useState(null)
    const [photo, setPhoto] = useState(null)


// validate inputs
    const [validName, setValidName] = useState(false)
    const [validPhone, setValidPhone] = useState(true)
    const [validCv, setValidCv] = useState(true)
    const [validPhoto, setValidPhoto] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validMsg, setValidMsg] = useState(false)


    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setReg({...reg, [name]: value})
        if (name === 'name') {
            emptyValidation(value) ? setValidName(true) : setValidName(false)
        }
        if (name === 'phone') {
            emptyNumber(value) ? setValidPhone(true) : setValidPhone(false)
        }
        if (name === 'email') {
            emailValidation(value) ? setValidEmail(true) : setValidEmail(false)
        }
        if (name === 'msg') {
            emptyValidation(value) ? setValidMsg(true) : setValidMsg(false)
        }
    }

    const handleInputcv = (e) => {
        setCv(e.target.files[0])
    }
    const handleInputPhoto = (e) => {
        setPhoto(e.target.files[0])
    }

    const handleDepartment = (e) => {
        setReg({...reg, department: e})
    }


    const handleSubmit = (e) => {

        let api_services = ApiServices.POST_FORM
        e.preventDefault();
        let formData = new FormData()
        formData.append('form_id', 'career-form')
        formData.append('spam_protector', '')
        formData.append('email', reg.email)
        formData.append('name', reg.name)
        formData.append('department', reg.department)
        formData.append('phone', reg.phone)
        formData.append('cv', cv)
        formData.append('photo', photo)
        if (reg.email !== '' && reg.name !== '' && reg.phone !== '' && reg.msg !== '') {
            dispatch(postCareerForm([api_services, formData]))
            setTimeout(() => {
                setReg({
                    name: "",
                    phone: "",
                    email: "",
                    msg: "",
                    cv: "",
                    photo: "",
                })
                let getSelectedData = document.querySelectorAll('.react-select__single-value');
                if (getSelectedData && getSelectedData[0]) {
                    getSelectedData[0].textContent = 'Select Department'
                }

            }, 300)
        } else {
            error('Please fill out the inputs')
            if (reg.email === '') {
                setValidEmail(false)
            }
            if (reg.name === '') {
                setValidName(true)
            }
            if (reg.phone === '') {
                setValidPhone(false)
            }
            if (reg.email === '') {
                setValidEmail(false)
            }
            if (reg.msg === '') {
                setValidMsg(true)
            }

        }
    }

    // job name using slug

    useEffect(() => {
        if (router?.query?.job && router?.query?.job !== '') {
            setReg({...reg, department: router?.query?.job})
        }
    }, [router])


    useEffect(() => {
        if (formData?.error?.message !== '') {
            error(formData?.error?.message)
            setTimeout(() => {
                dispatch(clear())
            }, 500)
        }

        // if (formData && formData?.success?.message !== '') {
        //     success(formData?.success?.message)
        //     setTimeout(() => {
        //         dispatch(clear())
        //     }, 500)
        // }

    }, [formData])

    return (
        <StyledComponent>
            {formData?.loading && <Loader/>}
            <ToastContainer position="top-right" autoClose={4000} closeOnClick hideProgressBar={true}/>
            <ParallaxProvider>
                <InnerBanner img={BannerImage}
                             des="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,"
                             title={'Career'} subtitle={'Ready to Apply'}/>
                <div className="career_form pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={6} className="formContact">
                                <Form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
                                    <Row>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Jobs Name</Form.Label>

                                            {
                                                router?.query?.job && router?.query?.job !== '' ? <Form.Control
                                                        className={'form-control-lg'}
                                                        type="text" disabled={true}
                                                        value={router?.query?.job}
                                                        placeholder="Enter your mail address"/>

                                                    :

                                                    <Select
                                                        placeholder={'Select Department'}
                                                        onChange={(e) => handleDepartment(e.value)}
                                                        styles={{
                                                            dropdownIndicator: (provided, state) => ({
                                                                ...provided,
                                                                transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                                                            })
                                                        }}
                                                        classNamePrefix={'react-select'}
                                                        className={'form-select'}
                                                        options={DropdownOption}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                                ...theme.colors,
                                                                primary25: '#e9e9e9',
                                                                primary: 'black',
                                                            },
                                                        })}
                                                    />

                                            }


                                        </Form.Group>

                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control
                                                className={validName ? 'has-error form-control-lg' : 'form-control-lg'}
                                                onChange={handleInput}
                                                onBlur={handleInput} value={reg.name} type="text" name='name'
                                                placeholder="Enter your full name"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                className={!validEmail ? 'has-error form-control-lg' : 'form-control-lg'}
                                                type="email"
                                                onChange={handleInput} name='email' onBlur={handleInput}
                                                value={reg.email}
                                                placeholder="Enter your mail address"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control
                                                className={!validPhone ? 'has-error form-control-lg' : 'form-control-lg'}
                                                onChange={handleInput} onBlur={handleInput}
                                                value={reg.phone} name='phone' type="number"
                                                placeholder="Enter your phone number"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-12 pb-30">
                                            <Form.Label>Cover Letter</Form.Label>
                                            <Form.Control
                                                className={validMsg ? 'has-error form-control-lg' : 'form-control-lg'}
                                                as="textarea"
                                                onChange={handleInput}
                                                onBlur={handleInput} value={reg.msg}
                                                name='msg' rows={3}
                                                aria-label="With textarea" placeholder="Enter your message"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Upload CV</Form.Label>
                                            <Form.Control
                                                className={!validCv ? 'has-error gph_upload' : 'gph_upload'}
                                                onChange={(e) => setCv(e.target.files[0])}
                                                value={''} name='cv' text="Upload CV" type="file"/>
                                            <p className="max_size">Max 2MB</p>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Upload Photo</Form.Label>
                                            <Form.Control
                                                className={!validPhoto ? 'has-error gph_upload' : 'gph_upload'}
                                                onChange={handleInputPhoto}
                                                value={''} name='cv' text="Upload Photo" type="file"/>
                                            <p className="max_size">Max 2MB</p>
                                        </Form.Group>
                                        <Form.Group className="col-xl-12 widthHalf" onClick={handleSubmit}>
                                            <Button text={'Submit Application'} classname={'col-md-6'}/>
                                        </Form.Group>

                                    </Row>
                                </Form>
                            </Col>
                            <Col md={{span: 5, offset: 1}}>
                                <div className="image_wrapper">
                                    <Img src={joblist}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParallaxProvider>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .image_wrapper {
    padding-top: calc(500 / 500 * 100%);
  }

  .dc-btn {
    width: 100%;
    a{
      justify-content: center !important; 
    }
  }
  @media(min-width: 1550px){
    .widthHalf{
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;

export default MyComponent;
