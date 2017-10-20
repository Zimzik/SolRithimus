import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import moment from 'moment';
import Dialog from './dialog';
import xhr from './xhr';

// Set local settings for displaying a current ukrainian date

moment.updateLocale('en', {
  months: [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопада",
    "Грудня"
  ]
});

// Poems list component

class PoemsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {
      poemsList,
      onPoemClick,
      activePoemIndex,
      editingPoemIndex,
      editingPoemClick,
      deletingPoemClick
    } = this.props;
    let poemsTemplate = poemsList.map((el, index) => {
      let transDate = moment(el.date).format('D MMMM, YYYY');
      return (
        <div key={index} className={activePoemIndex === index
          ? 'poem activePoem'
          : 'poem'} onClick={() => onPoemClick(index)} id={el._id}>
          <img src={el.img}/>
          <div className="poemInfo">
            <p className="poemTitle">{el.title}</p>
            <p className="poemDate">{transDate}</p>
          </div>
          <div className="editButtons">
            <i className="icon-edit" title="Редагувати" onClick={() => editingPoemClick(index)}></i>
            <i className="icon-trash" title="Видалити" onClick={() => deletingPoemClick(index)}></i>
          </div>
        </div>
      )
    });

    return (
      <div className="poemsList">
        <div className={editingPoemIndex == -1
          ? ""
          : "poemBlocking"}></div>
        <h2>Список віршів:</h2>
        <div className="poemsListField">
          {poemsTemplate}
        </div>

      </div>
    )
  }
}

// Poem block component, that shows full information of a current poem or gives opportunity to change this poem.

class PoemBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingDate: '',
      editingTitle: '',
      editingBody: ''
    };
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
  }

  dateChangeHandler(selectedDay, modifiers) {
    this.setState({editingDate: selectedDay._d, isDisabled: modifiers.disabled});
  }

  titleChangeHandler(e) {
    this.setState({editingTitle: e.target.value})
  }

  bodyChangeHandler(e) {
    this.setState({editingBody: e.target.value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({editingDate: nextProps.editingPoem.date, editingTitle: nextProps.editingPoem.title, editingBody: nextProps.editingPoem.body});
  };

  render() {
    let PoemPresentTemplate;
    const {activePoem, editingPoemIndex, editingPoem, cancelChange, saveEditingPoem} = this.props;
    const {editingDate, editingTitle, editingBody} = this.state;

    if (activePoem && (editingPoemIndex > -1)) {
      const DAY_FORMAT = 'DD/MM/YYYY';
      const formattedDay = moment(editingDate).format(DAY_FORMAT);
      PoemPresentTemplate = (
        <form className="poemBlock">
          <div className="poemInfo">
            <input type="text" className="titleEdit" value={editingTitle} onChange={this.titleChangeHandler}/>
            <textarea className="bodyEdit" cols="30" rows="10" value={editingBody} onChange={this.bodyChangeHandler}/>
            <div className="date-and-submit">
              <DayPickerInput format={DAY_FORMAT} value={formattedDay} onDayChange={this.dateChangeHandler}/>
              <input type="button" className="save-poem" value='Зберегти' onClick= {() => saveEditingPoem(editingPoem._id, editingTitle, editingBody, editingDate)}/>
              <input type="button" className="cancel-poem" value='Відмінити' onClick= {() => cancelChange()}/>
            </div>
          </div>
        </form>
      )
    } else {
      if (activePoem && (editingPoemIndex == -1)) {
        let transDate = moment(activePoem.date).format('D MMMM, YYYY');
        PoemPresentTemplate = (
          <div className="poemBlock">
            {/*<img src={activePoem.img}/>*/}
            <div className="poemInfo">
              <h2 className="title">{activePoem.title}</h2>
              <p className="poemsBody">{activePoem.body}</p>
              <p className="poemsDate">{transDate}</p>
            </div>
          </div>
        )
      } else {
        PoemPresentTemplate = (
          <div className="poemBlock">
            {/*<img src=""/>*/}
            <div className="poemInfo">
              <div className="title">
                <h2>Заголовок</h2>
              </div>
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

// Edit tabs component. Include poem list and poem showing block.

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePoem: -1,
      poemsList: [],
      editingPoem: -1,
      editingPoemIndex: -1,
      editingPoemDate: '',
      deletingPoemIndex: -1,
      dbmessage: '',
      showDialog: false
    };
    this.onPoemClick = this.onPoemClick.bind(this);
    this.editingPoemClick = this.editingPoemClick.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.saveEditingPoem = this.saveEditingPoem.bind(this);
    this.getPoemsList = this.getPoemsList.bind(this);
    this.deletingPoemClick = this.deletingPoemClick.bind(this);
    this.showDialogWindow = this.showDialogWindow.bind(this);
    this.dialogClickedOK = this.dialogClickedOK.bind(this);
    this.dialogClickedCancel = this.dialogClickedCancel.bind(this);

  }

  getPoemsList() {
    // TODO: add server call to retrieve poems list

    xhr('POST', '/auth/poemsList', '', (msg, data) => {
      let poemsList = data;
      this.setState({poemsList: poemsList});
    }, (err) => {
      console.error(err);
    }, (err) => {
      console.error(err);
    });
  }

  componentWillMount() {
    this.getPoemsList();
  }

  onPoemClick(poemIndex) {
    this.setState({activePoemIndex: poemIndex});
  };

  editingPoemClick(poemIndex) {
    this.setState({editingPoemIndex: poemIndex, editingPoemDate: this.state.poemsList[poemIndex].date});
  };

  showDialogWindow() {
    this.setState({showDialog: true})
  }

  dialogClickedOK() {
    this.setState({showDialog: false})
    const {poemsList, deletingPoemIndex} = this.state;
    let data = JSON.stringify({id: poemsList[deletingPoemIndex]._id, title: poemsList[deletingPoemIndex].title, body: poemsList[deletingPoemIndex].body, date: poemsList[deletingPoemIndex].date});

    xhr('DELETE', '/auth/recycle', data, (msg) => {
      this.setState({dbmessage: msg, deletingPoemIndex: -1});
      this.getPoemsList();
      console.log(msg);
    }, (err) => {
      console.error(err);
    }, (err) => {
      console.error(err)
    });
  }

  dialogClickedCancel() {
    this.setState({showDialog: false})
    return true;
  }

  deletingPoemClick(index) {
    const {showDialogWindow} = this.props
    this.setState({deletingPoemIndex: index})
    this.showDialogWindow();
  }

  cancelChange() {
    this.setState({editingPoemIndex: -1});
  }

  saveEditingPoem(id, title, body, date) {
    let data = JSON.stringify({id: id, title: title, body: body, date: date});
    xhr('PUT', '/auth/editPoem', data, (msg) => {
      this.setState({dbmessage: msg, editingPoemIndex: -1});
      this.getPoemsList();
      console.log(msg);
    }, (err) => {
      console.log(err);
    }, (err) => {
      console.log(err);
    })
  }

  render() {
    const {poemsList, activePoemIndex, editingPoemIndex, editingPoemDate, showDialog} = this.state;
    let dialogMessage = "Вірш буде видалено в корзину! Продовжити?";
    return (
      <div className="poems-show">
        <div className={showDialog
          ? "blocking-wrapper"
          : "invisible"}></div>
        <Dialog message={dialogMessage} dialogClass={showDialog
          ? "dialog-window"
          : "invisible"} clickedOK={this.dialogClickedOK} clickedCancel={this.dialogClickedCancel}/>
        <PoemBlock activePoem={activePoemIndex !== -1
          ? poemsList[activePoemIndex]
          : null} editingPoem= {editingPoemIndex !== -1 ? poemsList[editingPoemIndex] : ''} cancelChange={this.cancelChange} saveEditingPoem={this.saveEditingPoem} editingPoemIndex={editingPoemIndex}/>
        <PoemsList poemsList={poemsList} onPoemClick={this.onPoemClick} editingPoemClick={this.editingPoemClick} activePoemIndex={activePoemIndex} editingPoemIndex={editingPoemIndex} deletingPoemClick={this.deletingPoemClick}/>
      </div>
    )
  }
}
