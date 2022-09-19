import GoBack from 'components/GoBack';
import PageNotFound from 'components/PageNotFound';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BraceletApiService } from 'services';

import Card from '../../../components/Card';
import ListMin from '../../../components/ListMin';


class BraceletProfile extends Component {

    constructor(props) {
        super(props);
        this.serviceBracelet = new BraceletApiService();
        this.state = {
            bracelet: {
                id: 0,
                name: '',  
                fences:[]
            },
            found: false
        }
    }

    async componentDidMount() {
        await this.serviceBracelet.findById(this.props.match.params.id)
        .then(response => {
            this.setState({
                bracelet: response.data,
                found: true
            })
        })
        .catch(()=>{
            this.setState({
                found: false
            })
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
                    <Card className="bracelet-profile" title="Detalhes da Pulseira">
                        <table className="table table-primary table-hover user-info"
                            style={
                                {
                                    width: "100%"
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
                                    <td id={this.state.bracelet.id} class="bracelet-name">
                                        {this.state.bracelet.name}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex"
                            style={
                                {
                                    justifyContent: "space-between"
                                }
                            }
                        >
                            <GoBack/>
                            <Link to={`/updateBracelet/${this.props.match.params.id}`} className="btn btn-primary">Editar</Link>
                        </div>
                    </Card>
                    <Card title="Cercas">
                        <div className="fence-profiles flex"
                            style={
                                {
                                    flexDirection: "column"
                                }
                            }
                        >
                            <div className="fence-profile">
                                <h4>Cercas</h4>
                                <ListMin 
                                    data={this.state.bracelet.fences} 
                                    entity="Cercas" 
                                    list="/fences"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

export default withRouter(BraceletProfile);
