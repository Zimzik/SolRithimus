export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {

  }

  render() {
    return (
      <div className="poem-creating">
        <form action="/newPoem" className="new-poem">
          <input type="text" className="poem-title" name="poem-title" placeholder="Title"/>
          <textarea name="poem" className="poem-body" cols="30" rows="10" placeholder="Enter your poem here"></textarea>
          <div className="date-and-submit">
            <input type="date" className="poem-date" name='poem-date'/>
            <input type="submit" className="submit" value="Save" onClick={() => onSubmit()}/>
          </div>
        </form>
        <div className="message">Poem has been successfully saved on db.</div>
      </div>
    )
  }
}