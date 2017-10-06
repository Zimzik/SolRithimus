import React from 'react';
import ReactDOM from 'react-dom';
import New from './new-poem';
import Edit from './edit-poem';
import Recycle from './recycle';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    userName: ''
  }

  render() {
    const {activeTab, changeTab} = this.props;
    const tabs = [
      {title: "New poem", tabsClass: "icon-circle-plus"},
      {title: "Poems list", tabsClass: "icon-list"},
      {title: "Recycle", tabsClass: "icon-trash"}
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(index) {
    this.setState({
      activeTab: index
    })
  }

  render() {
    const {activeTab, userName} = this.state;
    let RenderingTab;
    switch (activeTab) {
      case 0: RenderingTab = New;
              break;
      case 1: RenderingTab = Edit;
              break;
      case 2: RenderingTab = Recycle;
              break;
    }
    return (
      <div className="container">
        <div className="active-user">
          <div className="active-user-name">{userName}</div>
          <i className="icon-user"></i>
        </div>
        <div className="workspace">
          <Tabs changeTab = {this.changeTab} activeTab = {activeTab}/>
          <div className="workfield">
            <RenderingTab/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.querySelector('#root'));