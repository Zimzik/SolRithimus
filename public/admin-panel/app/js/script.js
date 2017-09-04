import React from 'react';
import ReactDOM from 'react-dom';
import New from './new-poem';
import Edit from './edit-poem';
import Trash from './trash';

let poems = [
  {title: 'Sol rithimius',
    date: '22/12/2017',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Viridi ligno',
    date: '11/05/2017',
    img: 'img/pics/poem2.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Igens papiliomen',
    date: '06/09/2017',
    img: 'img/pics/poem3.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Bruin ursi',
    date: '19/10/2017',
    img: 'img/pics/poem4.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Holey medius soccus',
    date: '01/04/2017',
    img: 'img/pics/poem5.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Puer laetanem',
    date: '20/01/2017',
    img: 'img/pics/poem6.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Delecamenti popon',
    date: '09/09/2017',
    img: 'img/pics/poem7.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Palmam lingo',
    date: '15/06/2017',
    img: 'img/pics/poem8.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Solis occasum',
    date: '30/05/2017',
    img: 'img/pics/poem9.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22/12/1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22/12/1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22/12/1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22/12/1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22/12/1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'}
];

class Tabs extends React.Component {
  constructor(props) {
    super(props)
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
    const {activeTab} = this.state;
    let RenderingTab;
    switch (activeTab) {
      case 0: RenderingTab = New;
              break;
      case 1: RenderingTab = Edit;
              break;
      case 2: RenderingTab = Trash;
              break;
    }
    return (
      <div className="container">
        <div className="active-user">
          <div className="active-user-name">admin</div>
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