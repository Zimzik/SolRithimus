import Header from "./header";
import Main from "./main";
import About from "./about";
import Poems from "./poems";
import Footer from "./footer";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 0
    };
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  onMenuItemClick(key) {
    this.setState({
      activeMenuItem: key
    })
  }

  render() {
    const {activeMenuItem} = this.state;
    let ActivePage;
    switch (activeMenuItem) {
      case 0: ActivePage = Main;
              break;
      case 1: ActivePage = Poems;
              break;
      case 2: ActivePage = About;
              break;
    };

    return (
      <div>
        <Header onMenuItemClick = {this.onMenuItemClick}
                activeMenuItem = {activeMenuItem}/>
        <ActivePage/>
        <Footer/>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('#root'));