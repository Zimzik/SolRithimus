import New from './new-poem';
import Edit from './edit-poem';
import Trash from './trash';

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