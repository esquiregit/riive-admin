import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

const SMS               = React.lazy(() => import('./Components/Internal/Message/SMS/SMS'));
const Email             = React.lazy(() => import('./Components/Internal/Message/Email/Email'));
const Login             = React.lazy(() => import('./Components/External/Login/Login'));
const Parents           = React.lazy(() => import('./Components/Internal/Parents/Parents'));
const Pickups           = React.lazy(() => import('./Components/Internal/Pickups/Pickups'));
const Profile           = React.lazy(() => import('./Components/Internal/Profile/Profile'));
const Error404          = React.lazy(() => import('./Components/Extras/FourZeroFour/FourZeroFour'));
const Recovery          = React.lazy(() => import('./Components/External/Recovery/Recovery'));
const Security          = React.lazy(() => import('./Components/Internal/Security/ManageSecurity'));
const Students          = React.lazy(() => import('./Components/Internal/Students/ManageStudents'));
const Teachers          = React.lazy(() => import('./Components/Internal/Teachers/ManageTeachers'));
const Visitors          = React.lazy(() => import('./Components/Internal/Visitors/Visitors'));
const Dashboard         = React.lazy(() => import('./Components/Internal/Dashboard/Dashboard'));
const Attendance        = React.lazy(() => import('./Components/Internal/Attendance/Attendance'));
const AuditTrail        = React.lazy(() => import('./Components/Internal/AuditTrail'));
const ManageAdmin       = React.lazy(() => import('./Components/Internal/Admins/ManageAdmins'));
const ManageSchools     = React.lazy(() => import('./Components/Internal/School/ManageSchool'));
const ManagePayments    = React.lazy(() => import('./Components/Internal/Payment/ManagePayments'));
const ManageCountries   = React.lazy(() => import('./Components/Internal/Countries/ManageCountries'));
const ViewApprovals     = React.lazy(() => import('./Components/Internal/Security/ViewApprovals'));
const PasswordChange    = React.lazy(() => import('./Components/External/PasswordChange/PasswordChange'));

function App() {
    return (
        <React.Suspense fallback={<div className="loading-div"><CircularProgress color="secondary" /></div>}>
            <BrowserRouter>
                <Switch>
                    <Route path='/'                                      component={ Login }           exact />
                    <Route path='/sms/'                                  component={ SMS }             exact />
                    <Route path='/admins/'                               component={ ManageAdmin }     exact />
                    <Route path='/login/'                                component={ Login }           exact />
                    <Route path='/email/'                                component={ Email }           exact />
                    <Route path='/parents/'                              component={ Parents }         exact />
                    <Route path='/pickups/'                              component={ Pickups }         exact />
                    <Route path='/profile/'                              component={ Profile }         exact />
                    <Route path='/schools/'                              component={ ManageSchools }   exact />
                    <Route path='/payments/'                             component={ ManagePayments }  exact />
                    <Route path='/security/'                             component={ Security }        exact />
                    <Route path='/students/'                             component={ Students }        exact />
                    <Route path='/teachers/'                             component={ Teachers }        exact />
                    <Route path='/visitors/'                             component={ Visitors }        exact />
                    <Route path='/countries/'                            component={ ManageCountries } exact />
                    <Route path='/dashboard/'                            component={ Dashboard }       exact />
                    <Route path='/attendance/'                           component={ Attendance }      exact />
                    <Route path='/activity-log/'                         component={ AuditTrail }      exact />
                    <Route path='/password-recovery/'                    component={ Recovery }        exact />
                    <Route path='/view-security-approvals/'              component={ ViewApprovals }   exact />
                    <Route path='/password-change/:id/:code/:type/:sid/' component={ PasswordChange }  exact />
                    <Route path='*'                                      component={ Error404 } />
                </Switch>
            </BrowserRouter>
        </React.Suspense>
    );
}

export default App;
