import React from 'react';
import ChangePass from './change-pass';
import NewUser from './new-user';

// User menu

export default class UserMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userMenuClicked: false,
			changePassVisible: false,
			newUserVisible: false
		}
		this.userMenuClick = this.userMenuClick.bind(this);
		this.changePass = this.changePass.bind(this);
		this.changePassCancel = this.changePassCancel.bind(this);
		this.newUser = this.newUser.bind(this);
		this.newUserCancel = this.newUserCancel.bind(this);
	}

	userMenuClick() {
		let userMenuClicked = this.state.userMenuClicked ? false : true
		this.setState({
			userMenuClicked: userMenuClicked
		})
	}

	changePass() {
		this.setState({
			userMenuClicked: false,
			changePassVisible: true
		})
	}

	changePassCancel() {
		this.setState({
			changePassVisible: false
		})
	}

	newUser() {
		this.setState({
			userMenuClicked: false,
			newUserVisible: true
		})
	}

	newUserCancel() {
		this.setState({
			newUserVisible: false
		})
	}

	render() {
		const {userMenuClass, logOff, changePass, newUser, userName} = this.props;
		const {userMenuClicked, newUserVisible, changePassVisible} = this.state;
		return (
			<div className="active-user">
				<div className="active-user-name">{userName}</div>
				<i className={userMenuClicked ? "icon-gear icon-gear-clicked" : "icon-gear"} onClick={this.userMenuClick}></i>
				<ul className={userMenuClicked ? "user-menu" : "invisible"}>
					<li onClick={this.changePass}><i className="icon-key"></i>Змінити пароль</li>
					<li onClick={this.newUser}><i className="icon-user"></i>Створити нового користувача</li>
					<li onClick={logOff}><i className="icon-sign-out"></i>Вийти</li>
				</ul>
				<ChangePass changePassClass={changePassVisible ? "change-pass" : "invisible"} changePassCancel={this.changePassCancel}/>
				<NewUser newUserClass={newUserVisible ? "new-user": "invisible"} newUserCancel={this.newUserCancel}/>
			</div>
		)
	}
}


