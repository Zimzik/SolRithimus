import React from 'react';
import moment from 'moment';
import xhr from './xhr';
import DayPickerInput from 'react-day-picker/DayPickerInput';

// New poem component(tab "New" in workspace)

export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poemTitleValue: '',
      poemBodyValue: '',
      poemDateValue: '',
      isDisabled: false,
      dbmessage: '',
      titleMessage: '',
      bodyMessage: '',
      dateMessage: '',
      titleClass: '',
      bodyClass: '',
      dateClass: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.poembodyChangeHandler = this.poembodyChangeHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
  }

  titleChangeHandler(e) {
    this.setState({
      poemTitleValue: e.target.value
    })
  }

  poembodyChangeHandler(e) {
    this.setState({
      poemBodyValue: e.target.value
    })
  }

  dateChangeHandler(selectedDay, modifiers) {
    this.setState({
      poemDateValue: selectedDay._d,
      isDisabled: modifiers.disabled
    });
  }

  onSubmit() {
    let {poemTitleValue, poemBodyValue, poemDateValue, dbmessage, titleMessage, bodyMessage, dateMessage} = this.state;
    if (!poemTitleValue || !poemBodyValue || !poemDateValue) {
      this.setState({
        titleMessage: '',
        bodyMessage: '',
        dateMessage: '',
        dbmessage: '',
        titleClass: '',
        bodyClass: '',
        dateClass: '',
        showTitleMessage: false,
        showBodyMessage: false,
        showDateMessage: false
      });
        if (!poemTitleValue) {
          this.setState({
            titleClass: "red-border",
            showTitleMessage: true
          });
        }
        if (!poemBodyValue) {
          this.setState({
            bodyClass: "red-border",
            showBodyMessage: true
          })
        }
        if (!poemDateValue) {
          this.setState({
            dateClass: "red-border",
            showDateMessage: true
          })
        }
    } else {
      let data = JSON.stringify({
              title: poemTitleValue,
              body: poemBodyValue,
              date: poemDateValue
            });
			xhr('POST', '/auth/savePoem', data, (msg) => {
				this.setState({
            dbmessage: msg,
            poemTitleValue: '',
            poemBodyValue: '',
            poemDateValue: '',
            titleClass: '',
            bodyClass: '',
            dateClass: '',
            showTitleMessage: false,
            showBodyMessage: false,
            showDateMessage: false
          });
          console.log(msg);
			}, (error) => {
				console.log(error);
			}, (error) => {
				console.log(error);
			})
    }
  }

  render() {
    const DAY_FORMAT = 'DD/MM/YYYY';
    let {poemTitleValue, poemBodyValue, poemDateValue, dbmessage, titleClass, bodyClass, dateClass, showTitleMessage, showBodyMessage, showDateMessage} = this.state;
    const formattedDay = poemDateValue ? moment(poemDateValue).format(DAY_FORMAT) : '';
    return (
      <div className="poem-creating">
        <form className="new-poem">
          <input type="text"
                 className={"poem-title " + titleClass}
                 name="poem-title"
                 value={poemTitleValue}
                 onChange={this.titleChangeHandler}
                 placeholder="Назва"/>
          <p className={showTitleMessage  ? 'title-smart-message' : 'smart-message-invisible'}>Будь ласка, введіть назву вірша!</p>
          <textarea name="poem"
                    className={"poem-body " + bodyClass}
                    cols="30" rows="10"
                    value={poemBodyValue}
                    onChange={this.poembodyChangeHandler}
                    placeholder="Введіть сюди вірш"></textarea>
          <p className={showBodyMessage  ? 'body-smart-message' : 'smart-message-invisible'}>Вірш в цьому полі не був написаний, треба щось з цим робити:)!</p>
          <div className="date-and-submit">
            <p className={showDateMessage  ? 'date-smart-message' : 'smart-message-invisible'}>Потрібно ввести дату написання вірша!</p>
            <DayPickerInput className={"DayPickerInput " + dateClass}
                            placeholder="Дата"
                            format={DAY_FORMAT}
                            value={formattedDay}
                            onDayChange={this.dateChangeHandler}
                            />
            <input type="button" className="submit-button" value="Зберегти" onClick={() => this.onSubmit()}/>
          </div>
        </form>
        <div className="messages">
          <div className="message">{dbmessage}</div>
        </div>
      </div>
    )
  }
}