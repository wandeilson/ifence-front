import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./ListTable.css"
import { showSuccessMessage } from "./Toastr"; 
class ListTable extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }



    createRow(element) {
        return (
            <tr key={element.id}>
                <td>
                    <Link id={`${this.props.entity}-${element.id}`} className={`text-reset text-decoration-none ${this.props.entity}`} to={`/${this.props.entity}/${element.id}`}>{element.name}</Link>
                </td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example"
                        style={
                            {
                                display: "flex",
                            }
                        }>
                        <Link className="btn btn-secondary" to={`/${this.props.entity}/update/${element.id}`}>Editar</Link>
                        <button className="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        > Excluir
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color: 'black'}} >Por favor, confirme a exclusão.</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                        
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {
                                            e.preventDefault();                                  
                                            this.props.service.delete(element.id);
                                            this.props.history.push(`/refresh${this.props.location.pathname}`);
                                            showSuccessMessage('', `Exclusão realizada com sucesso.`);
                                        }} >Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover table-info" style={
                {
                    tableLayout: 'fixed',
                    marginBlock: "1rem"
                }
            }>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {this.props.data.map(element => this.createRow(element))}
                </tbody>
            </table>
        );
    }

}

export default withRouter(ListTable);
