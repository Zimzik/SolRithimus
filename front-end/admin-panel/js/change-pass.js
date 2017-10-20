import React from 'react';

// Change password window

export default class ChangePass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstPass: '',
			secondPass: '',
			oldPass: '',
			passErrorMessage: '',
			passOkMessage: ''
		}
		this.firstPassHandler = this.firstPassHandler.bind(this);
		this.secondPassHandler = this.secondPassHandler.bind(this);
		this.oldPassHandler = this.oldPassHandler.bind(this);
		this.changePassOK = this.changePassOK.bind(this);
		this.changePassCancel = this.changePassCancel.bind(this);
	}
	
	firstPassHandler(e) {
		this.setState({
			firstPass: e.target.value
		})
	}
	
	secondPassHandler(e) {
		this.setState({
			secondPass: e.target.value
		})
	}
	
	oldPassHandler(e) {
		this.setState({
			oldPass: e.target.value
		})
	}
	
	changePassCancel() {
		this.setState({
			passErrorMessage: '',
			passOkMessage: '',
			oldPass: '',
			firstPass: '',
			secondPass: ''
		})
		this.props.changePassCancel();
	}
	
	changePassOK() {
		const {firstPass, secondPass, oldPass, passErrorMessage, passOkMessage} = this.state;
		if (!oldPass || !firstPass || !secondPass) {
				this.setState({
					passErrorMessage: "Заповніть будь ласка всі поля для зміни паролю!",
					passOkMessage: ''
				})
		} else {
			if (firstPass !== secondPass) {
				this.setState({
					passErrorMessage: "Новий пароль і підтвердження не співпадають!",
					passOkMessage: ''
				})
			} else {
				let data = JSON.stringify({
					oldPass: oldPass,
					newPass: firstPass
				});
				let xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/changepass', true);
				xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.setRequestHeader("x-access-token", window.localStorage.JWToken);
        xhr.send(data);
        xhr.onload = () => {
					if (xhr.status === 200) {
						let json = JSON.parse(xhr.response);
						if (json.success) {
							this.setState({
								oldPass: '',
								firstPass: '',
								secondPass: '',
								passErrorMessage: '',
								passOkMessage: json.msg
							});
							window.localStorage.JWToken = json.token;
						} else {
							this.setState({
								passErrorMessage: json.msg,
								passOkMessage: ''
							})
						}
					} else {
						console.log("Bad");
					}
				}
			}
		}
	}
	
	render() {
		const {changePassClass, changePassCancel} = this.props;
		const {firstPass, secondPass, oldPass, passErrorMessage, passOkMessage} = this.state;
		return (
			<div className={changePassClass}>
				<label>
					Введіть поточний пароль:
					<input type="password" onChange={this.oldPassHandler} value={oldPass}/>
				</label>
				<label>
					Введіть новий пароль:
					<input type="password" onChange={this.firstPassHandler} value={firstPass}/>
				</label>
				<label>
					Повторіть новий пароль:
					<input type="password" onChange={this.secondPassHandler} value={secondPass}/>
				</label>
				<div>
					<input type="button" value="OK" onClick={this.changePassOK}/>
					<input type="button" value="Відмінити" onClick={this.changePassCancel}/>
				</div>
				<p className={passErrorMessage === '' ? "passOkMessage" : "passErrorMessage"}>{passErrorMessage}{passOkMessage}</p>
			</div>
		)
	}
}
