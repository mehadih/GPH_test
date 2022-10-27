import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col, Form} from "react-bootstrap";
import Title from "../../components/Title";
import {body_ms14, body_ms16, hover, title_ms30} from "../../styles/globalStyleVars";
import Button from "../../components/Button";
import Select from "react-select";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const MyComponent = () => {

    // drop down
    const DropDownName = [
        {value: 'Deformed Bar (GPH Quantum B500CWR)', label: 'Deformed Bar (GPH Quantum B500CWR)'},
        {value: 'Deformed Bar (GPH Quantum B500DWR)', label: 'Deformed Bar (GPH Quantum B500DWR )'},
    ];
    const DropDownSize = [
        {value: '8mm', label: '8mm'},
        {value: '10mm', label: '10mm'},
        {value: '16mm', label: '16mm'},
        {value: '20mm', label: '20mm'},
        {value: '22mm', label: '22mm'},
    ];
    const DropdownOption = [
        {value: '8mm', label: '8mm'},
        {value: '10mm', label: '10mm'},
        {value: '16mm', label: '16mm'},
        {value: '20mm', label: '20mm'},
        {value: '22mm', label: '22mm'},
    ];

    // repeated form action
    const [form, setForm] = useState([
        {
            'product_name': '',
            'product_size': '',
            'product_qty': '',
        },
    ]);

    useEffect(() => {
        console.log('form submit', form)
    }, [form])

    const handleFromIncrement = () => {
        setForm([...form, {'product': ''}])
    };

    const handleFormDecrement = (e) => {
        const formList = [...form]
        formList.splice(form.length - 1, 1)
        setForm(formList)
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const formList = [...form]
        formList[index][name] = value;
        setForm(formList)
    }

    // dropdown on change
    const [targetedName, setTargetedName] = useState('')
    const handleName = (e) => {
        setTargetedName(e)
    }
    const [targetedSize, setTargeteSize] = useState('')
    const handleSize = (e) => {
        setTargeteSize(e)
    }

    const handleFormSubmit = (e) => {
        // e.preventDefault()
        console.log('clicked')
        // handleChange()
        error('Validation error')
    }

    const error = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        progress: undefined,

    });

    return (
        <StyledComponent>
            <ToastContainer position="top-right" autoClose={4000} closeOnClick hideProgressBar={true}/>
            <section className="form_section">
                <Container>
                    <Row>
                        <Col md={12} className="d-flex justify-content-between backbutton">
                            <div className="content">
                                <Title margin="0 0 40px" text="Order now"/>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br/> industry.
                                    Lorem Ipsum has been the industry’s standard dummy <br/> text ever since the 1500s,
                                </p>
                            </div>
                            <Button text="back"/>
                        </Col>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col md={6} className="from_wrapper formContact incremental">
                                    <h3>01. Product information</h3>
                                    {form.map((form, index) => (
                                        <Row key={index} className={'m-0'}>

                                            <Form.Group className="col-md-12 pb-30">
                                                <Form.Label>Product Name</Form.Label>
                                                <Select name={'product_name'}
                                                        onChange={oc => handleName(oc.value)}
                                                        placeholder={'Select Department'}
                                                        styles={{
                                                            dropdownIndicator: (provided, state) => ({
                                                                ...provided,
                                                                transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                                                            })
                                                        }}
                                                        classNamePrefix={'react-select'}
                                                        className={'form-select'}
                                                        options={DropDownName}
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
                                            </Form.Group>


                                            {/*<select onChange={oc => handleChange(oc, index)} name={'product_name'}*/}
                                            {/*        id="">*/}
                                            {/*    <option value="1">1</option>*/}
                                            {/*    <option value="2">2</option>*/}
                                            {/*    <option value="3">3</option>*/}
                                            {/*</select>*/}


                                            {/*<Form.Group className="col-md-12 pb-30">*/}
                                            {/*    <Form.Control name={'product_name'} value={form.product_name}*/}
                                            {/*                  onBlur={oc => handleChange(oc, index)}*/}
                                            {/*                  onChange={oc => handleChange(oc, index)}*/}
                                            {/*                  className="form-control-lg" type="text"*/}
                                            {/*                  placeholder="Enter name"/>*/}
                                            {/*</Form.Group>*/}


                                            <Form.Group className="col-md-12 pb-30">
                                                <Form.Label>Size (mm)</Form.Label>
                                                <Select name={'product_size'}
                                                        onChange={(oc) => handleSize(oc.value)}
                                                        placeholder={'Select Department'}
                                                        styles={{
                                                            dropdownIndicator: (provided, state) => ({
                                                                ...provided,
                                                                transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                                                            })
                                                        }}
                                                        classNamePrefix={'react-select'}
                                                        className={'form-select'}
                                                        options={DropDownSize}
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
                                            </Form.Group>


                                            {/*<select onChange={oc => handleChange(oc, index)} name={'product_size'}*/}
                                            {/*        id="">*/}
                                            {/*    <option value="1">1</option>*/}
                                            {/*    <option value="2">2</option>*/}
                                            {/*    <option value="3">3</option>*/}
                                            {/*</select>*/}

                                            {/*<Form.Group className="col-md-12 pb-30 ">*/}
                                            {/*    <Form.Control name={'product_size'} value={form.product_size}*/}
                                            {/*                  onChange={oc => handleChange(oc, index)}*/}
                                            {/*                  className="form-control-lg" type="text"*/}
                                            {/*                  placeholder="Enter size"/>*/}
                                            {/*</Form.Group>*/}


                                            <Form.Group className="col-md-12 pb-30">
                                                <Form.Label>Quantity (Ton)</Form.Label>
                                                <Form.Control name={'product_qty'} value={form.product_qty}
                                                              onChange={oc => handleChange(oc, index)}
                                                              className="form-control-lg" type="number"
                                                              placeholder="Enter Pcs."/>
                                            </Form.Group>


                                        </Row>
                                    ))}

                                    <div className="d-flex padding justify-content-between">
                                        <p onClick={handleFromIncrement}>Add More Product</p>
                                        {form.length > 1 && <p onClick={handleFormDecrement}>Remove</p>}
                                    </div>

                                </Col>
                                <Col md={6} className="from_wrapper formContact">
                                    <h3>02. Contact Information</h3>

                                    <Row className={'m-0'}>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Business Name</Form.Label>
                                            <Form.Control className="form-control-lg" type="number"
                                                          placeholder="Business Name"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control className="form-control-lg" type="number"
                                                          placeholder="Full Name"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control className="form-control-lg" type="number"
                                                          placeholder="Enter your email address"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control className="form-control-lg" type="number"
                                                          placeholder="Enter your full Name"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-12 pb-30">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control className="form-control-lg" type="number"
                                                          placeholder="Enter your address here"/>
                                        </Form.Group>

                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Product Name</Form.Label>
                                            <Select
                                                placeholder={'Select Department'}
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
                                        </Form.Group>
                                        <Form.Group className="col-md-6 pb-30">
                                            <Form.Label>Size (mm)</Form.Label>
                                            <Select
                                                placeholder={'Select Department'}
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
                                        </Form.Group>


                                        <Form.Group className="col-md-12 pb-30">
                                            <Form.Label>Cover Letter</Form.Label>
                                            <Form.Control className="form-control-lg" as="textarea" rows={3}
                                                          aria-label="With textarea" placeholder="Enter your message"/>
                                        </Form.Group>
                                        <Form.Group className="col-md-12">
                                            <div onClick={handleFormSubmit}>
                                                <Button text={'Submit Order'} classname={'col-md-6'}/>
                                            </div>

                                        </Form.Group>


                                    </Row>
                                </Col>
                            </Row>

                        </Form>
                    </Row>
                </Container>
            </section>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .form_section {
    padding-top: 180px;
    padding-bottom: 150px;

    .title {
      ${title_ms30};
      font-weight: 500;
    }

    .backbutton {
      .dc-btn {
        a {
          margin: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-color: #222222;
        }

        span {
          margin: 0;
        }

        svg {
          display: none;
        }
      }

      @media (max-width: 767px) {
        flex-direction: column-reverse;
        .dc-btn {
          margin-bottom: 40px;
        }
      }
    }

    .from_wrapper {
      margin-top: 60px;

      &.incremental {
        p {
          ${body_ms14};
          font-weight: 500;
          cursor: pointer;
          transition: color .4s ease;

          &:hover {
            color: ${hover};
          }
        }

        .row {
          //border-bottom: 1px solid #DDD;
          padding-bottom: 20px;

          &:after {
            content: '';
            position: absolute;
            left: 15px;
            right: 15px;
            bottom: 18px;
            height: 1px;
            background-color: #DDD;
          }

          &:nth-last-of-type(2) {
            padding-bottom: 0;

            &:after {
              display: none;
            }
          }
        }
      }


      .padding {
        padding: 0 15px;
      }

      .dc-link {
        a {
          background-image: none;

          &:hover {
            background-image: linear-gradient(currentColor, currentColor);
          }
        }
      }

      .dc-btn {
        min-width: 300px;
      }

      h3 {
        padding: 30px 12px;
        background: #F9F9F9;
        ${body_ms16};
        font-weight: 500;
        margin: 0 15px 50px;
      }
    }
  }

  .this-hide {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    z-index: -99;
  }
`;

export default MyComponent;
