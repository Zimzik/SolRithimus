import New from './new-poem';
import Edit from './edit-poem';
import Trash from './trash';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    };
    this.changeTab = this.changeTab().bind(this);
  }

  changeTab(index) {
    this.setState({
      activeTab: index
    })
  }

  render() {
    const {changeTab} = this.state;
    return (
      <div className="container">
        <div className="active-user">
          <div className="active-user-name">admin</div>
          <i className="icon-user"></i>
        </div>
        <div className="workspace">
          <ul className="menu">
            <li className="active">
              New poem
              <i className="icon-circle-plus"></i>
            </li>
            <li>Poems list
              <i className="icon-list"></i>
            </li>
            <li>Recycle
              <i className="icon-trash"></i>
            </li>
          </ul>
          <div className="poem-editing">
            <form action="/newPoem" className="new-poem">
              <input type="text" className="poem-title" name="poem-title" placeholder="Title"/>
                <textarea name="poem" className="poem-body" cols="30" rows="10" placeholder="Enter your poem here"></textarea>
                <div className="date-and-submit">
                  <input type="date" className="poem-date" name='poem-date'/>
                    <input type="submit" className="submit" value="Save"/>
                </div>
            </form>
          </div>
        </div>
        <div className="poem-list">

        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.querySelector('#root'));