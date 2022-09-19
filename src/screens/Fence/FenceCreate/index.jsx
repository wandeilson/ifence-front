import { Wrapper } from '@googlemaps/react-wrapper';
import { isAfter, isEqual } from 'date-fns';
import React, { Component, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FenceApiService } from 'services';
import { switchValidation } from 'services/ValidationService';

import Card from '../../../components/Card';
import { GoogleMap } from 'components/GoogleMap';
import FormGroup from '../../../components/FormGroup';
import GoBack from '../../../components/GoBack';
import { showErrorMessage, showSuccessMessage } from '../../../components/Toastr';

class FenceCreate extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            radius: 1,
            coordinate :{
                latitude: null,
                longitude: null
            },
            startTime: null,
            finishTime: null,
            show: false
        }
        this.service = new FenceApiService();

        this.setCoordinate = this.setCoordinate.bind(this);
        this.hasCoordinates = this.hasCoordinates.bind(this);
    }

    hasCoordinates() {
        return this.state.coordinate.latitude && this.state.coordinate.longitude;
    }

    setCoordinate(coordinate) {
        this.setState({coordinate});
    }

    getFence(){
        return {
            name: this.state.name,
            radius: this.state.radius && !isNaN(this.state.radius) ? this.state.radius : null,
            coordinate :{
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
            },
            startTime: this.state.startTime,
            finishTime: this.state.finishTime
        }
    }

    closeModal = () => {
        this.setState({show: false});
    }
    showModal = () => {
        this.setState({show: true});
    }

    async create() {
        const fence = this.getFence();

        await this.service.create(fence)
        .then(response => {
            showSuccessMessage('', 'Fence criada com sucesso!');
            this.props.history.push('/profile');
        }).catch(error => {
            error.response.data.errors.forEach(error => {showErrorMessage('', error.messageUser)});
        });
    }

    validateCoordinate(){
        const latitude = this.state.coordinate.latitude;
        const longitude = this.state.coordinate.longitude;
        
        var latitudeElement = document.querySelector('#latitude');
        var longitudeElement = document.querySelector('#longitude');

        if(latitude >= -90 && latitude <= 90){
            switchValidation(latitudeElement, true);
        } else{
            switchValidation(latitudeElement, false);
        }
        if(longitude >= -180 && longitude <= 180){
            switchValidation(longitudeElement, true);
        } else{
            switchValidation(longitudeElement, false);
        }
    }

    getDate(time){
        if(!time) return;

        var date = new Date()
        var[hour, minute] = time.split(':');
        date.setHours(hour);
        date.setMinutes(minute);

        return date;
    }

    validateTime(startTime, finishTime){
        if(!startTime && !finishTime) return;

        const startTimeElement = document.querySelector('#startTime');
        const finishTimeElement = document.querySelector('#finishTime');

        if(startTime){
            const startDate = this.getDate(startTime);
            if(finishTime){
                const finishDate = this.getDate(finishTime);

                if(isAfter(startDate, finishDate) || isEqual(startDate, finishDate)){
                    switchValidation(startTimeElement, false);
                    switchValidation(finishTimeElement, false);
                    return;
                }
            }
        }
        switchValidation(startTimeElement, true);
        switchValidation(finishTimeElement, true);
    }

    render() {
        return (
            <>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 userRegister'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Cadastro de Cerca'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event=>{
                                                            event.preventDefault();
                                                            this.create()
                                                        }
                                                    }
                                                >
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Nome da Cerca'
                                                                value={this.state.name} onChange={(e) =>{
                                                                        if(e.target.value.length >= 1 && e.target.value.length <= 50){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ name: e.target.value })
                                                                    }
                                                                } 
                                                                data-bs-toggle="tooltip" data-bs-placement="left"
                                                                title="Nome da cerca entre 1 e 50 caracteres, todo caractere espaço de será substituído por espaço simples."
                                                            />
                                                        </FormGroup>
                                                        <div className="beside flex"
                                                        >
                                                            <FormGroup label="Localização: " htmlFor="coordenada">
                                                                <Button name="coordenada" variant="info" onClick={this.showModal}
                                                                    style={
                                                                        {
                                                                            whiteSpace: "nowrap",
                                                                        }
                                                                    }
                                                                >
                                                                    Selecionar Localização
                                                                </Button>
                                                                <Modal size="lg" fullscreen show={this.state.show} >
                                                                    <Modal.Header>
                                                                        <Modal.Title>Selecione a localização | RAIO: {this.state.radius}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <GoogleMap 
                                                                            setCoordinate={this.setCoordinate}
                                                                            editable
                                                                            coordinates={this.hasCoordinates()? this.state.coordinate : null}
                                                                        name={this.state.name} radius={this.state.radius}/>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={this.closeModal}> Fechar </Button>
                                                                        <Button variant="primary" onClick={()=>{
                                                                            this.validateCoordinate();
                                                                            this.closeModal();
                                                                        }}> Continuar </Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </FormGroup>
                                                            <div className="coordinates flex">
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinate.latitude? this.state.coordinate.latitude:null} type="text" className="form-control" id="latitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label="Latitude: " htmlFor="latitude">
                                                                    <input value={this.state.coordinate.longitude?this.state.coordinate.longitude:null} type="text" className="form-control" id="longitude" disabled/>
                                                                </FormGroup>
                                                                <FormGroup label='Raio: *' htmlFor='radius'>
                                                                    <input type='number' className='form-control' id='radius' min="1"
                                                                        placeholder='Raio da Cerca'
                                                                        value={this.state.radius} 
                                                                        onChange={(e) =>{
                                                                                if(e.target.value >= 1){
                                                                                    switchValidation(e.target, true);
                                                                                } else{
                                                                                    switchValidation(e.target, false);
                                                                                }
                                                                                this.setState({ radius: parseInt(e.target.value) });
                                                                            }
                                                                        }
                                                                        />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="flex times">
                                                            <FormGroup label="Horário Inicial: " htmlFor="startTime">
                                                                <input type="time" className="form-control" id="startTime" 
                                                                    step="60000"
                                                                    value={this.state.startTime} onChange={(e) =>{
                                                                            this.validateTime(e.target.value, this.state.finishTime);
                                                                            
                                                                            this.setState({ startTime: e.target.value })
                                                                        }
                                                                    } 
                                                                />
                                                            </FormGroup>
                                                            <FormGroup label="Horário Final: " htmlFor="finishTime">
                                                                <input type="time" className="form-control" id="finishTime"
                                                                    step="60000"
                                                                    value={this.state.finishTime} onChange={(e) =>{
                                                                            this.validateTime(this.state.startTime, e.target.value);
                                                                            
                                                                            this.setState({ finishTime: e.target.value })
                                                                        }
                                                                    }
                                                                    
                                                                    />
                                                            </FormGroup>
                                                        </div>
                                                        <br />
                                                        <div className="buttons-wrapper"
                                                            style={
                                                                {
                                                                    display: "flex",
                                                                    justifyContent: "space-between"
                                                                }
                                                            }
                                                        >
                                                            <GoBack/>
                                                            <button type="submit" className='btn btn-success'>Cadastrar</button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(FenceCreate);