export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onMenuItemClick, activeMenuItem} = this.props;
    let menuItems = ["Головна","Вірші","Про мене"];
    let menuItemsTemplate = menuItems.map((el, index) => {
      return (
        <li key={index}>
          <a className={activeMenuItem === index ? "active" : ""}
             onClick={() => {onMenuItemClick(index)}}
          >{el}</a>
        </li>
      )
    });
    return (
      <header>
        <div className="topShadow"></div>
        <div className="in-wrapper">
          <nav>
            <div className="logo">
              <a href="#">
                <img src="img/main-logo.png" alt="Logo"/>
              </a>
            </div>
            <ul>
              {menuItemsTemplate}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}


