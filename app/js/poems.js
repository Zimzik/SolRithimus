let poems = [
  {title: 'Sol rithimius',
    date: '22 грудня, 2017',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Viridi ligno',
    date: '11 червня, 2017',
    img: 'img/pics/poem2.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Igens papiliomen',
    date: '6 вересня, 2017',
    img: 'img/pics/poem3.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Bruin ursi',
    date: '19 жовтня, 2017',
    img: 'img/pics/poem4.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Holey medius soccus',
    date: '1 квітня, 2017',
    img: 'img/pics/poem5.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Puer laetanem',
    date: '20 січня, 2017',
    img: 'img/pics/poem6.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Delecamenti popon',
    date: '9 вересня, 2017',
    img: 'img/pics/poem7.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Palmam lingo',
    date: '15 липня, 2017',
    img: 'img/pics/poem8.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Solis occasum',
    date: '30 червня, 2017',
    img: 'img/pics/poem9.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22.12.1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22.12.1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22.12.1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22.12.1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'},
  {title: 'Poem1',
    date: '22.12.1988',
    img: 'img/pics/poem1.png',
    poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n'}
];

let activePoem = null;

/*Create poems list pannel*/
class PoemsList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { poemsList, onPoemClick, activePoemIndex } = this.props;

    let poemsTemplate = poemsList.map((el, index) => {
      return (
        <div
          key={index}
          className={activePoemIndex === index ? 'poem activePoem' : 'poem'}
          onClick={() => onPoemClick(index)} id={index}>
          <img src={el.img} />
          <div className="poemInfo">
            <p className="poemTitle">{el.title}</p>
            <p className="poemDate">{el.date}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="poemsList">
        <h2>Список віршів:</h2>
        <div className="poemsListField">
          {poemsTemplate}
        </div>
      </div>
    );
  }
}


class PoemBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let PoemPresentTemplate;
    const { activePoem } = this.props;

    if (activePoem) {
      PoemPresentTemplate = (
        <div>
          <img src={activePoem.img}/>
          <div className="poemInfo">
            <h2 className = "title">{activePoem.title}</h2>
            <p className = "poemsDate">{activePoem.date}</p>
          </div>
          <p className = "poemsBody">{activePoem.poem}</p>
        </div>
      )
    } else {
      PoemPresentTemplate = (
        <div>
          <p className = "message" > Виберіть будь ласка вірш для читання у списку правіше! </p>
        </div>
      )
    }
    return (
      <div className="poemPresent">
        {PoemPresentTemplate}
      </div>
    )
  }
};

export default class PoemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poemsList: [],
      activePoemIndex: -1
    };
    this.onPoemClick = this.onPoemClick.bind(this);
  }

  componentWillMount() {
    // TODO: add server call to retrieve poems list
    this.setState({ poemsList: poems })
  }

  onPoemClick(poemIndex) {
    this.setState({ activePoemIndex: poemIndex });
  }

  render() {
    const { poemsList, activePoemIndex } = this.state;

    return (
      <div className="poems-show">
        <div className="poems">
          <PoemBlock activePoem={activePoemIndex !== -1 ? poemsList[activePoemIndex] : null}/>
          <PoemsList
            poemsList={poemsList}
            onPoemClick={this.onPoemClick}
            activePoemIndex={activePoemIndex} />
        </div>
      </div>
    )
  }
}


