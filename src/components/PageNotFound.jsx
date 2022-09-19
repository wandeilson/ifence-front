import {Component} from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {

    render () {
        return <div style={
            {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%)',
                width: "max-content"
            }
        }
        >PÁGINA NAO ENCONTRADA, voltar a <Link to="/home">HOME</Link></div>;
    }
}

export default withRouter(PageNotFound);