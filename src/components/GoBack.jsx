import {useHistory} from "react-router-dom";


export default function GoBack(){
    const history = useHistory();

    return (
        <button type="button" className="btn btn-secondary" onClick={event=>
                {
                history.goBack();
                }
            }
        > Cancelar </button>);
}