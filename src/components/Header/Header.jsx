import React from 'react'
import s from'./Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return <header className={s.header}>
		<img src = 'https://im0-tub-ru.yandex.net/i?id=f1e912c8313b50f62e92a7cf4cc15064&n=13&exp=1'/>
		<div className={s.loginBlock}>
			{props.isAuth
				? <div>{props.login}  <button onClick={props.logout}>Log out</button></div>
				: <NavLink to={'/login'}>Login</NavLink> }
		</div>
	    </header>
}

export default Header;