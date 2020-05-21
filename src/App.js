import React ,{useEffect}from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history'
//toast notifications provider

//component import
import{ Home }from './pages/Home';
import{ Login }from './pages/Login';
import{ Register} from './pages/Register';
//import {Blogs} from './pages/Blogs';
import {Authors }from './pages/Authors';
import {Editor} from './pages/Editor';

//custom routes
import {AuthRoute,PrivateRoute} from './utils/myRoutes'
import {Layout} from './Layout/Layout'

import './App.css';
import { SinglePost } from './pages/SinglePost';
import { Author } from './pages/Author';
import { loadUserData } from './redux/actions/auth';


function App() {
  const dispatch = useDispatch()
  const history = createBrowserHistory()
  const loading = useSelector(state =>state.auth.loading)
  useEffect(() => {
    dispatch(loadUserData())
  
  }, [])
  return ( <Router history={history}>
  
  {!loading && ( <Layout>
     <Switch>
        <Route exact path='/' component={Home}/>
        <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <PrivateRoute exact path='/editor' component={Editor}/>
          <PrivateRoute exact path='/edit/:id' component={Editor}/>
          <Route exact path='/authors' component={Authors}/>
          <Route exact path ='/authors/:id' component ={Author}/>
          <Route exact path ='/post/:id' component = {SinglePost}/>
          <Route path='*'><div>you are lost</div></Route>
       
        </Switch>
   
 </Layout>)}

    </Router>
  );
}

export default App;
