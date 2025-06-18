import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Setting from '../pages/Setting';

const publicRoute = [
  { path: '/', component: Home, Layout: DefaultLayout },
  { path: '/sign-in', component: SignIn, Layout: null },
  { path: '/sign-up', component: SignUp, Layout: null },
  { path: '/setting', component: Setting, Layout: DefaultLayout },

  { path: '*', component: NotFound, Layout: null },
];

const privateRoute = [{ path: '/profile', component: Profile, Layout: DefaultLayout }];

export { publicRoute, privateRoute };
