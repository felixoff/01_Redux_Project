import React, {Component} from 'react'
import Navbar from './components/Navbar/Navbar'
import {HashRouter, Route, withRouter} from "react-router-dom"
import './App.css';
import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/Header-container";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./state/app-reducer";
import Preloader from "./components/commons/Preloader/Preloader";
import store from "./state/store-redux";
import {withSuspense} from "./hoc/withSuspense";

const  DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs-container'));
const  ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
	componentDidMount() {
		this.props.initializeApp();
	}
	render () {
		if (!this.props.init){
		return <Preloader/>
		}
		return(
	<div className='app-wrapper'>
		<HeaderContainer />
		<Navbar />
		<div className='app-wrapper-content'>
			<Route path='/profile' render= {withSuspense(ProfileContainer)}/>
			<Route path='/dialogs' render= {withSuspense(DialogsContainer)}/>
			<Route path='/users' render={() => <UsersContainer />} />
			<Route path='/login' render={() => <Login />} />
		</div>
	 </div>)
}
}
const mapStateToProps=(state)=> ({
	init: state.app.init
})
let AppContatiner = compose(withRouter,
	connect(mapStateToProps,{initializeApp}))(App);

const MainApp = (props) => (
	<HashRouter basename={process.env.PUBLIC_URL}>
		<Provider store ={store}>
			<AppContatiner  />
		</Provider>
	</HashRouter>
);

export default  MainApp;