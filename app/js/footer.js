export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let creator = 'Designed and developed by ' + '\u00A9' + ' Zimzik'
    return (
      <footer>
        <div className="in-wrapper">
          <section className="adress">
            <h2>Інформація для зв'язку</h2>
            <p>e-mail: pirkovaap@gmail.com</p>
            <p>Facebook:</p>
            <p>Twitter:</p>
          </section>
          <section className="subscribe">
            <label htmlFor="#email" className="enter-block">
              <img src="img/envelope.png" />
              <input id="email" type="text" placeholder="Введіть вашу електронну адресу"/>
            </label>
            <button>Підписатись</button>
          </section>
        </div>
        <section className="credits">
          <p>{creator}</p>
          <img src="img/main-logo.png" />
        </section>
      </footer>
    )
  }
}