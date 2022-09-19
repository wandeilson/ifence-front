import { Redirect, Route } from 'react-router';


const RestrictedRoute = ({children, show, path, redirectTo}) => {
    let to = "/refresh/login";
    if(redirectTo) {
        to = redirectTo;
    }

    if(!show) {
        return <Redirect to={to}/>
    }
    return (
        <Route exact path={path} >
            {children}
        </Route>
    )
}
export default RestrictedRoute;
