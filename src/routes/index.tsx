import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import NotFound from '../pages/NotFound';

const publicRoute = [
  { path: '/', component: Home, Layout: DefaultLayout },
  { path: '/sign-in', component: SignIn, Layout: null },
  { path: '/sign-up', component: SignUp, Layout: null },

  { path: '*', component: NotFound, Layout: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
