import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput'
export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
      poemTitleValue: '',
      poemBodyValue: '',
      poemDateValue: ''
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

  dateChangeHandler(e) {
    this.setState({
      poemDateValue: e.target.value
    })
  }

  onSubmit() {
    let {poemTitleValue, poemBodyValue, poemDateValue} = this.state;
    let poemDate = new Date();
    poemDate.setTime(Date.parse(poemDateValue.split('/').reverse().join('/')));
    poems.push({
      title: poemTitleValue,
      date: poemDate,
      img: '',
      poem: poemBodyValue
    });
    console.log(poems[poems.length-1]);
  }

  render() {
    const DAY_FORMAT = 'DD/MM/YYYY';
    let {poemTitleValue, poemBodyValue, poemDateValue} = this.state;
    return (
      <div className="poem-creating">
        <form action="/newPoem" className="new-poem">
          <input type="text"
                 className="poem-title"
                 name="poem-title"
                 value={poemTitleValue}
                 onChange={this.titleChangeHandler}
                 placeholder="Title"/>
          <textarea name="poem"
                    className="poem-body"
                    cols="30" rows="10"
                    value={poemBodyValue}
                    onChange={this.poembodyChangeHandler}
                    placeholder="Enter your poem here"></textarea>
          <div className="date-and-submit">
            <DayPickerInput placeholder="Date"
                            format={DAY_FORMAT}
                            value={poemDateValue}
                            onChange={this.dateChangeHandler}
                            />
            <input type="button" className="submit" value="Save" onClick={() => this.onSubmit()}/>
          </div>
        </form>
        <div className="message">Poem has been successfully saved on db.</div>
      </div>
    )
  }
}