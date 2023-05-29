import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./ListTable.css"

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
                        <button className="btn btn-danger"
                            onClick={e => {
                                this.props.service.delete(element.id);
                                this.props.history.push(`/refresh${this.props.location.pathname}`);
                            }}>
                            Excluir
                        </button>
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
