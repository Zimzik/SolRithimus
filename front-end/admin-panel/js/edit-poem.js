import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import moment from 'moment';
moment.updateLocale('en', {
  months: ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"]
});

class PoemsList extends  React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { poemsList, onPoemClick, activePoemIndex, editingPoemIndex, editingPoemClick, deletingPoemClick } = this.props;
    let poemsTemplate = poemsList.map((el, index) => {
      let transDate = moment(el.date).format('D MMMM, YYYY');
      return (
        <div key = {index}
             className={activePoemIndex === index ? 'poem activePoem' : 'poem'}
             onClick={() => onPoemClick(index)} id={el._id}>
          <img src={el.img} />
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
    this.setState({
      editingDate: selectedDay._d,
      isDisabled: modifiers.disabled
    });
  }

  titleChangeHandler(e) {
    this.setState({
      editingTitle: e.target.value
    })
  }

  bodyChangeHandler(e) {
    this.setState({
      editingBody: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editingDate: nextProps.editingPoem.date,
      editingTitle: nextProps.editingPoem.title,
      editingBody: nextProps.editingPoem.body
    });
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
            <input type="text"
             className="titleEdit" 
             value={editingTitle} 
             onChange={this.titleChangeHandler}/>
            <textarea className="bodyEdit" 
             cols="30" rows="10"
             value={editingBody} 
             onChange={this.bodyChangeHandler}/>
            <div className="date-and-submit">   
            <DayPickerInput format={DAY_FORMAT}
                            value={formattedDay}
                            onDayChange={this.dateChangeHandler}
            />
              <input type="button" className="savePoem" value='Зберегти' onClick = {() => saveEditingPoem(editingPoem._id, editingTitle, editingBody, editingDate)}/>
              <input type="button" value='Відмінити' onClick = {() => cancelChange()}/>
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
      editingPoemDate: '',
      dbmessage: ''
    };
    this.onPoemClick = this.onPoemClick.bind(this);
    this.editingPoemClick = this.editingPoemClick.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.saveEditingPoem = this.saveEditingPoem.bind(this);
    this.getPoemsList = this.getPoemsList.bind(this);
    this.deletingPoemClick = this.deletingPoemClick.bind(this);
  }

  getPoemsList() {
       // TODO: add server call to retrieve poems list
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/poemsList', true);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.response);
        this.setState({
          poemsList: data.poemsList
        });
      } else {
        console.error(error);
      }
    }
  }

  componentWillMount() {
    this.getPoemsList();
  }

  onPoemClick(poemIndex) {
    this.setState({ activePoemIndex: poemIndex});
  };

  editingPoemClick(poemIndex) {
    this.setState({editingPoemIndex: poemIndex,
                editingPoemDate: this.state.poemsList[poemIndex].date
      });
  };

  deletingPoemClick(index) {
    const {poemsList} = this.state;
    let willDelete = confirm(`Даний вірш буде відправлено в корзину! Продовжити?`);
    if (willDelete) {
      let xhr = new XMLHttpRequest();
      let data = JSON.stringify({
        id: poemsList[index]._id,
        title: poemsList[index].title,
        body: poemsList[index].body,
        date: poemsList[index].date
      });
      xhr.open('DELETE', '/api/recycle', true);
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.send(data);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.response);
          this.setState({
            dbmessage: json.msg
          });
          this.getPoemsList();
          console.log(json.msg);
        } else {
          console.error("There are some problem with moving this poems to recycle!");
        };

        xhr.onerror = function(error) {
          console.error(error);
        };
      }
    }
  }

  cancelChange() {
    this.setState({
      editingPoemIndex: -1
    });
  }

  saveEditingPoem(id, title, body, date) {
    let xhr = new XMLHttpRequest();
    let data = JSON.stringify({
      id: id,
      title: title,
      body: body,
      date: date
    });
    xhr.open('PUT', '/api/editPoem', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(data);
    xhr.onload = () => {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        this.setState({
          dbmessage: json.msg,
          editingPoemIndex: -1,
        });
        this.getPoemsList();
        console.log(json.msg);
      } else {
        console.error(json.err);
      };

      xhr.onerror = function(error) {
        console.error(error);
      };
    }
  }

  render() {
    const { poemsList, activePoemIndex, editingPoemIndex, editingPoemDate} = this.state;

    return (
      <div className="poems-show">
          <PoemBlock
            activePoem={activePoemIndex !== -1 ? poemsList[activePoemIndex] : null}
            editingPoem = {editingPoemIndex !== -1 ? poemsList[editingPoemIndex] : ''}
            cancelChange={this.cancelChange}
            saveEditingPoem={this.saveEditingPoem}
            editingPoemIndex={editingPoemIndex}
          />
          <PoemsList
            poemsList={poemsList}
            onPoemClick={this.onPoemClick}
            editingPoemClick = {this.editingPoemClick}
            activePoemIndex={activePoemIndex}
            editingPoemIndex={editingPoemIndex}
            deletingPoemClick={this.deletingPoemClick}/>
      </div>
    )
  }
}