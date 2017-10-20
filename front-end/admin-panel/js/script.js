import React from 'react';
import ReactDOM from 'react-dom';
import Enter from './enter';
import New from './new-poem';
import Edit from './edit-poem';
import Recycle from './recycle';
import UserMenu from './user-menu';


// Tabs component

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    userName: '',
    password: '',
    JWToken: '',
    authorized: ''}
  }

  render() {
    const {activeTab, changeTab} = this.props;
    const tabs = [
      {title: "Новий вірш", tabsClass: "icon-circle-plus"},
      {title: "Список віршів", tabsClass: "icon-list"},
      {title: "Корзина", tabsClass: "icon-trash"}
    ];
    let tabsTemplate = tabs.map((el, index) => {
      return (
        <li className={activeTab === index ? "active" : ""}
            onClick={() => {changeTab(index)}}
            key = {index}>
          {el.title}
          <i className={el.tabsClass}></i>
        </li>
      )
    });

    return (
      <ul className="menu">
        {tabsTemplate}
      </ul>
    )
  }
}

// Main component, entry point of this app

class Main extends React.Component {
  constructor(props) {
    super(props);
		this.dialogMessage = '';
    this.state = {
      activeTab: 0,
			userName: '',
			isAuthorized: true,
    };
    this.changeTab = this.changeTab.bind(this);
		this.logOn = this.logOn.bind(this);
		this.logOff = this.logOff.bind(this);
  }

  changeTab(index) {
    this.setState({
      activeTab: index
    })
  }

	logOn(userName) {
		this.setState({
			isAuthorized: true,
			userName: userName
		})
	}

	logOff() {
		this.setState({
			isAuthorized: false,
			userName: ''
		});
		window.localStorage.JWToken = '';
	}

  userMenuClick() {
    
  }

	componentWillMount() {
		if (!window.localStorage.JWToken) {
			console.log('Token no exist');
      this.setState({
				isAuthorized: false
			})
    } else {
			let token = window.localStorage.JWToken
			let xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/userinfo', true);
        xhr.setRequestHeader("x-access-token", window.localStorage.JWToken);
        xhr.send();
        xhr.onload = () => {
					if (xhr.status === 200) {
						let json = JSON.parse(xhr.response);
						this.setState({
							isAuthorized: true,
							userName: json.name
						})
					} else {
						console.log(`Status: ${xhr.status}, message: ${xhr.responseText}`);
						this.setState({
							isAuthorized: false
						})
					}
				}
		}
	}

  render() {
    const {activeTab, userName, isAuthorized, userMenuClass, showDialog, userMenuVisible} = this.state;
    let RenderingTab;
    switch (activeTab) {
      case 0: RenderingTab = New;
              break;
      case 1: RenderingTab = Edit;
              break;
      case 2: RenderingTab = Recycle;
              break;
    };

    let EnterForm = <Enter logOn={this.logOn}/>;
    let WorkSpace = (
				<div className="wrapper">
					<div className="container">
              <UserMenu userName={userName} logOff={this.logOff}/>
							<div className="workspace">
								<Tabs changeTab = {this.changeTab} activeTab = {activeTab}/>
								<div className="workfield">
									<RenderingTab />
								</div>
							</div>
						</div>
				</div>
              );

		if (isAuthorized) {
					return WorkSpace;
		} else {
				return EnterForm;
		}
  }
}

ReactDOM.render(<Main />, document.querySelector('#root'));
