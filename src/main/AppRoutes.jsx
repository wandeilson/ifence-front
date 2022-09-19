import Navbar from 'components/Navbar';
import { AuthConsumer } from 'main/SessionProvider';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory, useParams } from 'react-router-dom';

import RestrictedRoute from './RestrictedRoute';
import HomePage from '../screens/HomePage';
import PageNotFound from '../components/PageNotFound';
// BRACELET
import { BraceletCreate, BraceletDetails, BraceletList, BraceletUpdate } from '../screens/Bracelet';
// FENCE
import { FenceBraceletRegister, FenceCreate, FenceDetails, FenceList, FenceUpdate } from '../screens/Fence';
// USER
import { UserCreate, UserLogin, UserProfile, UserUpdate } from '../screens/User';

function AppRoutes(props){
    const isAuthenticated = props.isAuthenticated;

    return (
        <>
        <BrowserRouter>
            <Navbar {...props} />
            <Switch>
                <Route path={["/home", "/"]} exact>
                    <HomePage/>
                </Route>
                <RestrictedRoute show={!isAuthenticated} path={["/signIn","/createUser", "/users/create"]} redirectTo="/profile">
                    <UserCreate/>
                </RestrictedRoute>
                <RestrictedRoute show={!isAuthenticated} path={ "/login"} exact redirectTo="/profile">
                    <UserLogin />
                </RestrictedRoute>
                <RestrictedRoute show={isAuthenticated} path={["/profile", "/user"]} exact >
                    <UserProfile />
                </RestrictedRoute>
                <RestrictedRoute show={isAuthenticated} path={["/updateUser", "/users/update"]} exact >
                    <UserUpdate />
                </RestrictedRoute>

                <RestrictedRoute show={isAuthenticated} path={["/createBracelet", "/bracelets/create"]} exact >
                    <BraceletCreate />
                </RestrictedRoute>
                <RestrictedRoute show={isAuthenticated} path={["/updateBracelet/:id(\\d+)", "/bracelets/update/:id(\\d+)"]} exact >
                    <BraceletUpdate />
                </RestrictedRoute>
                <RestrictedRoute show={isAuthenticated} path={"/bracelets"} exact >
                    <BraceletList />
                </RestrictedRoute>
                <RestrictedRoute show={isAuthenticated} path={"/bracelets/:id(\\d+)"} exact >
                    <BraceletDetails />
                </RestrictedRoute>


                <RestrictedRoute show={isAuthenticated} path={["/createFence", "/fences/create"]} exact >
                    <FenceCreate />
                </RestrictedRoute>

                <RestrictedRoute show={isAuthenticated} path={["/updateFence/:id(\\d+)", "/fences/update/:id(\\d+)"]} exact >
                    <FenceUpdate />
                </RestrictedRoute>

                <RestrictedRoute show={isAuthenticated} path={"/fences"} exact >
                    <FenceList />
                </RestrictedRoute>

                <RestrictedRoute show={isAuthenticated} path={"/fences/:id(\\d+)"} exact >
                    <FenceDetails />
                </RestrictedRoute>

                <RestrictedRoute show={isAuthenticated} path={"/fences/:id(\\d+)/bracelets"} exact >
                    <FenceBraceletRegister />
                </RestrictedRoute>


                <Route
                    path="/refresh/**"
                    exact
                >
                    <Refresh/>
                </Route>
                <Route
                    path="**"
                >
                    <PageNotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default ()=>{
    return <AuthConsumer>
        {
            (context) => (<AppRoutes {...context} />)
        }
    </AuthConsumer>
}

function Refresh() {
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        history.replace(`/${params[0]}`);
    }, [history, params]);
    return <></>;
}
export {Refresh};

