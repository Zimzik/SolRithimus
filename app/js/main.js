let news = [
  { img: 'img/news/1.png',
    title: 'Тихі тут зорі...',
    description: '',
    date: 'Додано 22 грудня, 2017 р.' },
  { img: 'img/news/1.png',
    title: 'Тихі тут зорі...',
    description: '',
    date: 'Додано 22 грудня, 2017 р.' },
  { img: 'img/news/1.png',
    title: 'Тихі тут зорі...',
    description: '',
    date: 'Додано 22 грудня, 2017 р.' },
  { img: 'img/news/1.png',
    title: 'Тихі тут зорі...',
    description: '',
    date: 'Додано 22 грудня, 2017 р.' }
];


class NewsList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const {newsList} = this.props;

    let newsTemplate = newsList.map((el, index) => {
      return (
        <li key={index}>
          <img src={el.img} />
          <div className="poem-info">
            <a href="#">{el.title}</a>
            <p className="about-poem">{el.description}</p>
            <p className="poems-date">{el.date}</p>
          </div>
        </li>
      )
    });

    return (
        <div className="news">
          <h2>Що нового:</h2>
          <ul className="newsList">
            {newsTemplate}
          </ul>
        </div>
      )
  }
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: news
    };
  }

  componentWillMount() {
    this.setState = ({
      newsList: news
    })
  }

  render() {

    const { newsList } = this.state;

    return (
      <div className="main">
        <section className="main-header">
          <video preload="auto" autoPlay="true" loop poster="img/poster.jpg" className="bgVideo">
            <source src="video/file.mp4" type="video/mp4"/>
            <source src="video/file.webm" type="video/webm"/>
          </video>
          <div className="title">
            <div className="center-block">
              <div className="centered">
                <h2>Мої вірші</h2><img src="img/pattern2.png" alt="Pattern"/>
                <div className="description">
                  <p>Даний сайт являється збірником віршів молодої християнської поетесси Пірькової Анастасії. </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="somethingNew">
          <div className="in-wrapper">
            <div className="information">
              <h2>Трішки інформації:</h2>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis nec erat et pretium. Duis eget libero ornare, aliquet neque in, pharetra ante. Suspendisse potenti. Aliquam interdum augue facilisis, lacinia erat pellentesque, interdum mi. Sed a urna neque. Curabitur nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis nec erat et pretium. Duis eget libero ornare, aliquet neque in, pharetra ante. Suspendisse potenti. Aliquam interdum augue facilisis, lacinia erat pellentesque, interdum mi. Sed a urna neque. Curabitur nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis nec erat et pretium. Duis eget libero ornare, aliquet neque in, pharetra ante. Suspendisse potenti. Aliquam interdum augue facilisis, lacinia erat pellentesque, interdum mi. Sed a urna neque. Curabitur nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis nec erat et pretium. Duis eget libero ornare, aliquet neque in, pharetra ante. Suspendisse potenti. Aliquam interdum augue facilisis, lacinia erat pellentesque, interdum mi. Sed a urna neque. Curabitur nec.  </p>
            </div>
            <NewsList newsList = {newsList}/>
          </div>
        </section>
      </div>
      )
  }
}