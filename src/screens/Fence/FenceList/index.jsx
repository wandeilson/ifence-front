import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FenceApiService } from 'services';

import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import ListTable from '../../../components/ListTable';

class FenceList extends Component {

    

    constructor(){
        super();
        this.service = new FenceApiService();
        this.state = {
            fences: []
        }
    }

    async componentDidMount() {
        await this.service.find(
            {
                params: {
                    "page": 0,
                    "size": 15,
                    "sort": "id,ASC"
                }
            }
        ).then(response => {
            const fences = response.data.content;
            this.setState({ fences });
        }).catch(error => {
        });
    }

    find = async () => {
        var params = '';

        if (this.state.name !== '') {
            params = `search?name=${this.state.name}`;
        }
        await this.service.findByName(params).then(response => {
            const bracelets = response.data;
            this.setState({ bracelets });
        }).catch(error => {
        });
        
    }



    render() {
        return (
            <>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 braceletList'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Listar Cercas'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.find()
                                                }
                                                }>
                                                    <fieldset>
                                                        <FormGroup label='Nome: *' htmlFor='name'>
                                                            <input type='text' className='form-control' id='name'
                                                                placeholder='Digite o nome'
                                                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </FormGroup>
                                                        <br />
                                                        <div className="buttons-wrapper"
                                                            style={
                                                                {
                                                                    display: "flex",
                                                                    justifyContent: "space-between"
                                                                }
                                                            }
                                                        >
                                                            <button type="submit" className='btn btn-success'>Buscar</button>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='bs-component'>
                                                <ListTable entity="fences" data={this.state.fences}
                                                service = {this.service}/>
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

export default withRouter(FenceList);

