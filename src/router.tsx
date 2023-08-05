import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
// import Loader from './content/spinner';
import Protected from './content/protected';
import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const UserView = Loader(lazy(() => import(`src/content/user/view`)));

const Overview = Loader(lazy(() => import('src/content/overview/Login')));

const Forgetpassword = Loader(lazy(() => import('src/content/overview/forgetpassword/forgetpassword')))

const Reset = Loader(lazy(() => import('src/content/overview/reset/reset')))

const Dashboard = Loader(lazy(() => import('src/content/dashboards/Crypto')));

const Userlist = Loader(lazy(() => import('src/content/applications/UserList')));

const User = Loader(lazy(() => import('src/content/user')));

const UserBlock = Loader(lazy(() => import('src/content/block')));

const Setting = Loader(lazy(() => import('src/content/setAPI')));

const Premium = Loader(lazy(() => import('src/content/Premium')))

const ApplicationsUser = Loader(lazy(() => import('src/content/Report/AppUser')))

const RequestSend = Loader(lazy(() => import('src/content/Report/RequestSend')));

const RequestReceive = Loader(lazy(() => import('src/content/Report/RequestReceive')));

const PremiumAppUser = Loader(lazy(() => import('src/content/Report/PremiumAppUser')));

const SystemBlockedUsers = Loader(lazy(() => import('src/content/Report/SystemBlockedUsers')));

const ReportSend = Loader(lazy(() => import('src/content/ReportsMonthWise/requestSendReport')));

const ReportAccept = Loader(lazy(() => import('src/content/ReportsMonthWise/requestAcceptReport')));

const ReportReject = Loader(lazy(() => import('src/content/ReportsMonthWise/requestRejectReport')));

const ReportReceiveUser = Loader(lazy(() => import('src/content/ReportsMonthWise/requestReceiveUser')));

const ReportRejectUser = Loader(lazy(() => import('src/content/ReportsMonthWise/requestRejectUser')));

const ReportSendUser = Loader(lazy(() => import('src/content/ReportsMonthWise/requestSendUser')));

const Religion = Loader(lazy(() => import('src/content/applications/Religion')));

const Community = Loader(lazy(() => import('src/content/applications/Community')));

const Subcommunity = Loader(lazy(() => import('src/content/applications/Subcommunity')));

const Marital = Loader(lazy(() => import('src/content/applications/Marital')));

const Occupation = Loader(lazy(() => import('src/content/occupation')));

const Education = Loader(lazy(() => import('src/content/education')));

const Diet = Loader(lazy(() => import('src/content/diet')));

const Height = Loader(lazy(() => import('src/content/height')));

const Income = Loader(lazy(() => import('src/content/income')));

const Employment = Loader(lazy(() => import('src/content/applications/Employment')))

const Feedback = Loader(lazy(() => import('src/content/FeedBack/feedback')))

const SuccessStory = Loader(lazy(() => import('src/content/successStory')))

const TimeDuration = Loader(lazy(() => import('src/content/timeDuration')))

const PremiumAccount = Loader(lazy(() => import('src/content/PremiumAccount')))



const Question = Loader(lazy(() => import('src/content/question')))

var isLoggedIn = localStorage.getItem("SessionToken");
// element: <Protected exact Component={isLoggedIn ? Dashboard : Overview} />

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
        // element: {!isLoggedIn ? <Overview /> : Dashboard}
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
        // element: <Protected exact Component={!isLoggedIn ? <Navigate to="/" replace /> : Dashboard} />
      },
    ]
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'forgotpassword',
        element: <Forgetpassword />
        // element: {!isLoggedIn ? <Overview /> : Dashboard}
      },
      {
        path: 'forgotpassword',
        element: <Navigate to="/forgotpassword" replace />
        // element: <Protected exact Component={!isLoggedIn ? <Navigate to="/" replace /> : Dashboard} />
      },
    ]
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'reset-password/:token',
        element: <Reset />
        // element: {!isLoggedIn ? <Overview /> : Dashboard}
      },
      {
        path: 'reset-password/:token',
        element: <Navigate to="/reset-password/:token" replace />
        // element: <Protected exact Component={!isLoggedIn ? <Navigate to="/" replace /> : Dashboard} />
      },
    ]
  },
  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Protected Component={Dashboard} />
      },
      {
        path: 'appuser',
        element: <Protected Component={User} />
      },
      {
        path: 'appuser/view/:id',
        element: <Protected Component={UserView} />
      },
      {
        path: 'blockuser',
        element: <Protected Component={UserBlock} />
      },
      {
        path: 'setting',
        element: <Protected Component={Setting} />
      },
      {
        path: 'premiumfacility',
        element: <Protected Component={Premium} />
      },
      {
        path: 'timeduration',
        element: <Protected Component={TimeDuration} />
      },
      {
        path: 'FAQs',
        element: <Protected Component={Question} />
      },
      {
        path: 'applicationuser',
        element: <Protected Component={ApplicationsUser} auth={true} />
      },
      {
        path: 'requestsend',
        element: <Protected Component={RequestSend} />
      },
      {
        path: 'requestreceive',
        element: <Protected Component={RequestReceive} />
      },
      {
        path: 'requestAcceptReport',
        element: <Protected Component={ReportAccept} />
      },
      {
        path: 'requestRejectReport',
        element: <Protected Component={ReportReject} />
      },
      {
        path: 'requestSendReport',
        element: <Protected Component={ReportSend} />
      },
      {
        path: 'requestReceiveUser',
        element: <Protected Component={ReportReceiveUser} />
      },
      {
        path: 'requestRejectUser',
        element: <Protected Component={ReportRejectUser} />
      },
      {
        path: 'requestSendUser',
        element: <Protected Component={ReportSendUser} />
      },
      {
        path: 'premiumAppUser',
        element: <Protected Component={PremiumAppUser} />
      },
      {
        path: 'systemBlockedUser',
        element: <Protected Component={SystemBlockedUsers} />
      },
      {
        path: 'religion',
        element: <Protected Component={Religion} />
      },
      {
        path: 'community',
        element: <Protected Component={Community} />
      },
      {
        path: 'subcommunity',
        element: <Protected Component={Subcommunity} />
      },
      {
        path: 'maritalstatus',
        element: <Protected Component={Marital} />
      },
      {
        path: 'employment',
        element: <Protected Component={Employment} />
      },
      {
        path: 'users',
        element: <Protected Component={Userlist} />
      },
      {
        path: 'occupation',
        element: <Protected Component={Occupation} />
      },
      {
        path: 'education',
        element: <Protected Component={Education} />
      },
      {
        path: 'diet',
        element: <Protected Component={Diet} />
      },
      {
        path: 'height',
        element: <Protected Component={Height} />
      },
      {
        path: 'income',
        element: <Protected Component={Income} />
      },
      {
        path: 'successStory',
        element: <Protected Component={SuccessStory} />
      },
      {
        path: 'feedback',
        element: <Protected Component={Feedback} />
      },
      {
        path: 'premiumaccount',
        element: <Protected Component={PremiumAccount} />
      },
    ]
  },
];

export default routes;