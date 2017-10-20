import React from 'react';
import xhr from './xhr';

// Enter component (login form)

export default class Enter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			serverMessage: '',
			loginError: false,
			passError: false
		};

		this.loginEnterHandler = this.loginEnterHandler.bind(this);
		this.passwordEnterHandler = this.passwordEnterHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	loginEnterHandler(e) {
		this.setState({
			login: e.target.value
		})
	}

	passwordEnterHandler(e) {
		this.setState({
			password: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({
			loginError: false,
			passError: false,
			serverMessage: ""
		});
		const {login, password} = this.state;
		const {logOn, userName} = this.props;
		if (!login || !password) {
			if (!login) {
				this.setState({
					loginError: true
				})
			} 
			if (!password) {
				this.setState({
					passError: true
				})
			}
		} else {

		
			let data = JSON.stringify({
              name: login,
              password: password
            });
			xhr('POST', '/open/auth', data, (msg, token) => {
						window.localStorage.JWToken = token;
						logOn(login);
					}, (msg) => {
						this.setState({
		        			serverMessage: msg
		        		})
					}, (err) => {
						this.setState({
		        		serverMessage: err
		        	})
					});
		}
	}

	render() {
		const {login, password, serverMessage, loginError, passError} = this.state;
		return (
			<div className='container'>
				<form className="enter-form">
					<label>Логін:<input type="text" className={loginError === true ? "error-login" : ""} value={login} onChange={this.loginEnterHandler}/></label>
					<p className={loginError === true ? "enter-message" : "enter-message-invisible"}>Потрібно ввести логін</p>
					<label>Пароль:<input type="password" className={passError === true ? "error-pass" : ""} value={password} onChange={this.passwordEnterHandler}/></label>
					<p className={passError === true ? "enter-message" : "enter-message-invisible"}>Потрібно ввести пароль</p>
					<button id="submit-enter" onClick={this.onSubmit}>Вхід</button>
					<p>{serverMessage}</p>
				</form>
			</div>
		)
	}
}