import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import MyAccount from './Pages/Configuration/MyAccount';
import Employees from './Pages/Configuration/Employees';
import Customers from './Pages/Configuration/Customers';
import Services from './Pages/Configuration/Services';
import Configuration from './Pages/Configuration/Configurations';

import Home from './Pages/Home';

export default function Routes() {
   return(
      <BrowserRouter>
         <Switch>
            <Route exact component={Home} path="/" />
            <Route component={Dashboard} path="/dashboard" />
            <Route component={Login} path="/login" />
            <Route component={MyAccount} path="/settings/my-account" />
            <Route component={Employees} path="/settings/employees" />
            <Route component={Customers} path="/settings/customers" />
            <Route component={Services} path="/settings/services" />
            <Route component={Configuration} path="/settings/configuration" />
         </Switch>
      </BrowserRouter>
   );
}