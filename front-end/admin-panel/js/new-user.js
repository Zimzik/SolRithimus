import React from 'react';

// Change password window

export default class NewUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			login: '',
			pass: '',
			secondPass: '',
			errorMessage: ''
		}
		this.loginChangeHandler = this.loginChangeHandler.bind(this);
		this.firstPassChangeHandler = this.firstPassChangeHandler.bind(this);
		this.secondPassChangeHandler = this.secondPassChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.cancelHandler = this.cancelHandler.bind(this);
	}
	
	loginChangeHandler(e) {
		this.setState({
			login: e.target.value
		})
	}
	
	firstPassChangeHandler(e) {
		this.setState({
			pass: e.target.value
		})
	}
	
	secondPassChangeHandler(e) {
		this.setState({
			secondPass: e.target.value
		})
	}
	
	submitHandler() {
		const {login, pass, secondPass, errorMessage} = this.state;
		if (!login || !pass || !secondPass) {
			this.setState({
				errorMessage: 'Будь ласка, заповніть всі поля для створення нового користувача!'
			})
		} else {
			if (pass !== secondPass) {
				this.setState({
					errorMessage: 'Паролі не співпадають!'
				})
			} else {
				console.log("OK");
			}
		}
	}
	
	cancelHandler() {
		this.setState({
			login: '',
			pass: '',
			secondPass: '',
			errorMessage: ''
		});
		this.props.newUserCancel();
	}
	
	render() {
		const {newUserClass, newUserCancel} = this.props;
		const {login, pass, secondPass, errorMessage} = this.state;
		return (
			<div className={newUserClass}>
				<i className="icon-user"></i>
				<label>
					Введіть логін нового користувача
					<input type="text" onChange={this.loginChangeHandler} value={login}/>
				</label>
				<label>
					Введіть пароль користувача
					<input type="password" onChange={this.firstPassChangeHandler} value={pass}/>
				</label>
				<label>
					Повторіть введений пароль
					<input type="password" onChange={this.secondPassChangeHandler} value={secondPass}/>
				</label>
				<div>
					<input type="button" value="OK" onClick={this.submitHandler}/>
					<input type="button" value="Відміна" onClick={this.cancelHandler}/>
				</div>
				<p>{errorMessage}</p>
			</div>
		)
	}
	
}