import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BraceletApiService } from 'services';
import { switchValidation } from 'services/ValidationService';

import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';
import GoBack from '../../../components/GoBack';
import { showErrorMessage, showSuccessMessage } from '../../../components/Toastr';


class BraceletCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bracelet: {
                name: ""
            }
        }
        this.service = new BraceletApiService();
    }

    create = async() => {
        await this.service.create( 
            this.state.bracelet
        ).then(() => {
            showSuccessMessage('', 'Pulseira criada com sucesso!');
            this.props.history.push("/bracelets");
        }).catch(error => {
            error.response.data.errors.forEach(responseError => {showErrorMessage('', responseError.messageUser)});
        });
    }

    render(){
        return(
            <>
                <div className="container container-fluid">
                    <div className="col-md-6 braceletRegister" 
                        style={
                            {
                                width: "100%",
                                paddingBlock: "2.5rem"
                            }
                        }
                    >
                        <Card className="braceletFormCard" title="Cadastro de Pulseira"
                            style={
                                {
                                    width: '50%',
                                    margin: "0 auto"
                                }
                            }
                        >
                            <form className="form braceletForm" 
                                onSubmit={
                                    event=>
                                        {
                                            event.preventDefault();
                                            this.create()
                                        }
                                }
                                style={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem"
                                    }
                                }
                            >
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
                                </fieldset>
                                <div className="buttons-wrapper"
                                    style={
                                        {
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }
                                    }
                                >
                                    <GoBack/>
                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(BraceletCreate);

