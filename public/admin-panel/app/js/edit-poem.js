import React from 'react';


class PoemsList extends  React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { poemsList, onPoemClick, activePoemIndex, editingPoemIndex, editingPoemClick } = this.props;
    let poemsTemplate = poemsList.map((el, index) => {
      return (
        <div key = {index}
             className={activePoemIndex === index ? 'poem activePoem' : 'poem'}
             onClick={() => onPoemClick(index)} id={index}>
          <img src={el.img} />
          <div className="poemInfo">
            <p className="poemTitle">{el.title}</p>
            <p className="poemDate">{el.date}</p>
          </div>
          <div className="editButtons">
            <i className="icon-edit" title="Редагувати" onClick={() => editingPoemClick(index)}></i>
            <i className="icon-trash" title="Видалити"></i>
          </div>
        </div>
      )
    });

    return (
      <div className="poemsList">
        <div className={editingPoemIndex == -1 ? "" : "poemBlocking"}>
        </div>
        <h2>Список віршів:</h2>
        <div className="poemsListField">
          {poemsTemplate}
        </div>

      </div>
    )
  }
}


class PoemBlock extends  React.Component {
  constructor(props) {
    super(props)
  }

   render() {
    let PoemPresentTemplate;
    const {activePoem, editingPoemIndex, editingPoem,cancelChange} = this.props;

    if (activePoem && (editingPoemIndex > -1)) {
      PoemPresentTemplate = (
        <form className="poemBlock" action="/editPoem">
          <div className="poemInfo">
            <input type="text" className="titleEdit" defaultValue={editingPoem.title}/>
            <textarea className="bodyEdit" defaultValue={editingPoem.poem}/>
            <div className="date-and-submit">
              <input type="text" className="dateEdit" defaultValue={editingPoem.date}/>
              <input type="submit" className="savePoem" value='Зберегти'/>
              <input type="button" value='Відмінити' onClick = {() => cancelChange()}/>
            </div>
          </div>
        </form>
      )
    } else {
      if (activePoem && (editingPoemIndex == -1)) {
        PoemPresentTemplate = (
          <div className="poemBlock">
            {/*<img src={activePoem.img}/>*/}
            <div className="poemInfo">
              <h2 className="title">{activePoem.title}</h2>
              <p className="poemsBody">{activePoem.poem}</p>
              <p className="poemsDate">{activePoem.date}</p>
            </div>
          </div>
        )
      } else {
        PoemPresentTemplate = (
          <div className="poemBlock">
            {/*<img src=""/>*/}
            <div className="poemInfo">
              <h2 className="title">Заголовок</h2>
              <p className="poemsBody">Вірш</p>
              <p className="poemsDate">Дата</p>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="poemPresent">
        {PoemPresentTemplate}
      </div>
    )
  }
}

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePoem: -1,
      poemsList: [],
      editingPoem: -1,
      editingPoemIndex: -1,
    };
    this.onPoemClick = this.onPoemClick.bind(this);
    this.editingPoemClick = this.editingPoemClick.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
  }

  componentWillMount() {
    // TODO: add server call to retrieve poems list
    this.setState({ poemsList: poems })
  }

  onPoemClick(poemIndex) {
    this.setState({ activePoemIndex: poemIndex});
  };

  editingPoemClick(poemIndex) {
    this.setState({editingPoemIndex: poemIndex})
  };

  cancelChange() {
    this.setState({
      editingPoemIndex: -1
    });
  }

  render() {
    const { poemsList, activePoemIndex, editingPoemIndex, cancelChange} = this.state;

    return (
      <div className="poems-show">
          <PoemBlock
            activePoem={activePoemIndex !== -1 ? poemsList[activePoemIndex] : null}
            editingPoem = {editingPoemIndex !== -1 ? poemsList[editingPoemIndex] : null}
            cancelChange={this.cancelChange}
            editingPoemIndex={editingPoemIndex}
          />
          <PoemsList
            poemsList={poemsList}
            onPoemClick={this.onPoemClick}
            editingPoemClick = {this.editingPoemClick}
            activePoemIndex={activePoemIndex}
            editingPoemIndex={editingPoemIndex}/>
      </div>
    )
  }
}