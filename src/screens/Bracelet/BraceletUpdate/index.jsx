import PageNotFound from 'components/PageNotFound';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BraceletApiService } from 'services';
import { switchValidation } from 'services/ValidationService';

import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import GoBack from '../../../components/GoBack';
import { showErrorMessage, showSuccessMessage } from '../../../components/Toastr';

class BraceletUpdate extends React.Component {

    constructor(){
        super();

        this.state = {
            bracelet:{
                name: ''
            },
            found: false
        }
        this.service = new BraceletApiService();
    }

    async componentDidMount(){
        await this.service.findById(this.props.match.params.id)
        .then(response => {
            this.setState({
                bracelet:{name: response.data.name},
                found: true
            });
        }).catch(error => {
            this.setState({found:false});
            if(error.response.data){
                error.response.data.errors.map(errorResponse => showErrorMessage('', errorResponse.messageUser));
            }
        });
    }

    async update () {
        await this.service.update(this.props.match.params.id, this.state.bracelet)
        .then(() => {
            showSuccessMessage('', 'Pulseira atualizada com sucesso!');
            this.props.history.push("/bracelets");
        }).catch(error => {
            if(error.response.data){
                error.response.data?.errors.forEach((responseError) => {
                    showErrorMessage('', responseError.messageUser);
                });
            }else {
                showErrorMessage('', error.response);
            }
            
        });
    }

    render() {
        if(!this.state.found){
            return <PageNotFound/>;
        }

        return (
            <>
                <div className='conteiner'>
                    <div className='row'>
                        <div className='col-md-6 braceletUpdated'
                            style={
                                {
                                    margin: "0 auto",
                                    paddingBlock: "2.5rem"
                                }
                            }
                        >
                            <div className='bs-docs-section'>
                                <Card title='Atualizar Pulseira'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='bs-component'>
                                                <form onSubmit={event => {
                                                    event.preventDefault();
                                                    this.update()
                                                }
                                                }>
                                                    <fieldset>
                                                        <FormGroup htmlFor={"braceletFormName"} label={"Nome da Pulseira"}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="braceletFormName"
                                                                name="braceletFormName"
                                                                placeholder="Nome da Pulseira"
                                                                value={this.state.bracelet.name}
                                                                data-bs-toggle="tooltip" data-bs-placement="left"
                                                                title="Nome da pulseira entre 1 e 50 caracteres, todo caractere espaço de será substituído por espaço simples."
                                                                onChange={(e) =>{ 
                                                                        if(e.target.value.length >= 1 && e.target.value.length <= 50 && e.target.value.match(/.*\S.*/)){
                                                                            switchValidation(e.target, true);
                                                                        } else{
                                                                            switchValidation(e.target, false);
                                                                        }
                                                                        this.setState({ bracelet: { name: e.target.value } });
                                                                    }
                                                                }
                                                            />
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
                                                            <GoBack />
                                                            <button type="submit" className='btn btn-success'>Atualizar</button>
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

export default withRouter(BraceletUpdate);
