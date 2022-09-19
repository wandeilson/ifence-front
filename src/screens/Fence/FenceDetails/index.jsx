import { Wrapper } from '@googlemaps/react-wrapper';
import GoBack from 'components/GoBack';
import { GoogleMap } from 'components/GoogleMap';
import ListMin from 'components/ListMin';
import PageNotFound from 'components/PageNotFound';
import { showErrorMessage } from 'components/Toastr';
import React, { Component, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FenceApiService } from 'services';

import Card from '../../../components/Card';

//import BraceletProfile from '../../Bracelet/BraceletProfile/BraceletProfile';

var latitude = 0;
var longitude = 0;

class FenceDetails extends Component {

    constructor(props) {
        super(props);
        this.service = new FenceApiService();
        this.state = {
            fence: {
                id: 0,
                name: '',
                coordinate: {
                    latitude: null,
                    longitude: null
                },
                startTime: null,
                finishTime: null,
                active: false,
                radius: 1,
                bracelets: [],
                tempCoordinates: {
                    lat: 0,
                    lng: 0
                },
                show: false,
            },
            status: '',
            found: false
        }

        this.changeActive = this.changeActive.bind(this);
    }

    async componentDidMount() {
        await this.service.findById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    fence: response.data,
                    found: true
                })
            })
            .catch(()=>{
                this.setState({found: false});
            });
    }

    closeModal = () => {
        this.setState({ show: false });
    }
    showModal = () => {
        this.setState({ show: true });
    }

    async changeActive() {
        const fence = this.state.fence;

        await this.service.patch(`/${fence.id}/setStatus`,{},
            {
                params:{
                    'active': !fence.active
                }
            }
        )
        .then(response=>this.setState({fence:response.data}))
        .catch(error =>{
            const errors = error.response.data.errors;
            
            errors.forEach(err=>showErrorMessage('', err.messageUser, {timeOut: 10000}))
            
        });
    }

    render() {
        if(!this.state.found){
            return <>
                <PageNotFound/>
            </>;
        }
        return (
            <>
                <div className="container container-fluid flex profile-wrapper"
                    style={
                        {
                            width: "100%",
                            paddingBlock: "2.5rem",
                            alignItems: "flex-start",
                            flexGrow: "1",
                            flexBasis: "1",
                            flexShrink: "0"
                        }
                    }
                >
                    <Card className="fence-profile" title="Detalhes da Cerca">
                        <table className="table table-primary table-hover user-info"
                            style={
                                {
                                    width: "100%",
                                    tableLayout: 'fixed'
                                }
                            }
                        >
                            <thead className="table-header table-primary"
                                style={
                                    {
                                        textAlign: "center"
                                    }
                                }
                            >
                                <tr>
                                    <td colSpan="2">
                                        <h5>Informações</h5>
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="table-info">
                                <tr>
                                    <td>
                                        Nome:
                                    </td>
                                    <td>
                                        {this.state.fence.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Inicial:
                                    </td>
                                    <td>
                                        {this.state.fence.startTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Horário Final:
                                    </td>
                                    <td>
                                        {this.state.fence.finishTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Status:
                                    </td>
                                    <td>
                                        {this.state.fence.active ? 'ATIVADA' : 'DESATIVADA'}
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        Raio:
                                    </td>
                                    <td>
                                        {this.state.fence.radius}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex"
                            style={
                                {
                                    display: 'grid',
                                    gridAutoFlow: 'column',
                                    gridAutoColumns: '1fr'
                                }
                            }
                        >
                            <GoBack />
                            <Link to={`/fences/update/${this.props.match.params.id}`} 
                                className="btn btn-primary d-flex align-items-center justify-content-center">
                                Editar
                            </Link>
                            <Link to={`${this.props.location.pathname}/bracelets`}
                                className="btn btn-info d-flex align-items-center justify-content-center">
                                Pulseiras
                            </Link>
                            <div key={this.state.fence.id}
                                style={
                                    {
                                        display: "flex",
                                        gap: "1rem",
                                        flexDirection: 'column',
                                        alignItems:'flex-end'
                                    }
                                }
                                className="form-check form-switch"
                            >
                            <input key={this.state.fence.id}
                                id={`activate-fence-${this.state.fence.id}`}
                                checked={this.state.fence.active}
                                name={`activate-fence-${this.state.fence.id}`}
                                type="checkbox"
                                onChange={this.changeActive}
                                value={this.state.fence.active}
                                label="Ativar"
                                role="switch"
                                className="form-check-input"

                                style={
                                    {
                                        float: 'unset',
                                        marginLeft: 'unset'
                                    }
                                }
                                />
                            <label htmlFor={`activate-fence-${this.state.fence.id}`}>{this.state.fence.active? 'DESATIVAR' : 'ATIVAR'}</label>
                            </div>
                        </div>
                    </Card>
                    <Card title="Pulseiras">
                        <div className="bracelet profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="bracelet-profile">
                                <h4>Pulseiras</h4>
                                <ListMin
                                    data={this.state.fence.bracelets}
                                    entity="Pulseiras"
                                    list="/bracelets"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="container container-fluid flex profile-wrapper"
                    tyle={
                        {
                            width: "100%",
                            paddingBlock: "2.5rem",
                            alignItems: "flex-start",
                            flexGrow: "1",
                            flexBasis: "1",
                            flexShrink: "0"
                        }
                    }
                >
                    <Card title="Localização no mapa"
                        style={
                            {
                                height: '100vh',
                                width: '100%',
                                marginBottom: '2.5rem'
                            }
                        }
                    >
                        <GoogleMap
                            coordinates={this.state.fence.coordinate}
                            name={this.state.fence.name} radius={this.state.fence.radius}/>
                    </Card>
                </div>
            </>
        );
    }
}

export default withRouter(FenceDetails);
