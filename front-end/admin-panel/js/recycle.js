import React from 'react';
import moment from 'moment';
moment.updateLocale('en', {
  months: ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"]
});

class RecycledPoemsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { poemsList, onPoemClick, activePoemIndex, deletePoemClick, restorePoemClick } = this.props;

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
	          	<i className="icon-forward" title="Відновити" onClick={() => restorePoemClick(index)}></i>
	            <i className="icon-trash" title="Видалити" onClick={() => deletePoemClick(index)}></i>
	          </div>
	        </div>
	      )
	    });

	    return (
		<div className="poemsList">
	        <h2>Список віршів:</h2>
	        <div className="poemsListField">
	          {poemsTemplate}
	        </div>
      	</div>
	    )
	}
};

class PoemBlock extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {activePoem} = this.props;
        let PoemPresentTemplate;
		if (activePoem) {
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
        
        return (
            <div className="poemPresent">
                {PoemPresentTemplate}
            </div>
        )
	}
}


export default class Recycle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	poemsList: [],
    	activePoemIndex: -1
    }
    this.getRecycledList = this.getRecycledList.bind(this);
    this.onPoemClick = this.onPoemClick.bind(this);
    this.restorePoemClick = this.restorePoemClick.bind(this);
    this.deletePoemClick = this.deletePoemClick.bind(this);
  }

	getRecycledList() {
		// TODO: add server call to retrieve poems list
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/recycledPoemsList', true);
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
		this.getRecycledList();
	}

	onPoemClick(poemIndex) {
   		this.setState({ activePoemIndex: poemIndex});
  	};

  	deletePoemClick(index) {
  		const {poemsList} = this.state;
  		let willDelete = confirm(`Даний вірш буде повністю видалено з бази даних! Продовжити?`);
	    if (willDelete) {
	      let xhr = new XMLHttpRequest();
	      let data = JSON.stringify({
	        id: poemsList[index]._id,
	      });
            xhr.open('DELETE', '/api/delete', true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.send(data);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.response);
                    this.getRecycledList();
                    console.log(json.msg);
                } else {
                    console.error("There are some problem with moving this poems to recycle!");
                }

                xhr.onerror = function(error) {
                    console.error(error);
                };
            }
        } 
    }

    restorePoemClick(index) {
    const {poemsList} = this.state;
    let willRestore = confirm(`Даний вірш буде відновлено в основний список! Продовжити?`);
    if (willRestore) {
      let xhr = new XMLHttpRequest();
      let data = JSON.stringify({
        id: poemsList[index]._id,
        title: poemsList[index].title,
        body: poemsList[index].body,
        date: poemsList[index].date
      });
      xhr.open('POST', '/api/restore', true);
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.send(data);
      xhr.onload = () => {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.response);
          this.setState({
            dbmessage: json.msg,
            activePoemIndex: -1,
          });
          this.getRecycledList();
          console.log(json.msg);
        } else {
          console.error("There are some problem with moving this poems to main list!");
        };

        xhr.onerror = function(error) {
          console.error(error);
        };
      }
    }
    }

	render() {
		const {poemsList, activePoemIndex} = this.state;
        return (
              <div className="poems-show">
                <PoemBlock
                    activePoem={activePoemIndex !== -1 ? poemsList[activePoemIndex] : null}/>
                <RecycledPoemsList
                    poemsList={poemsList}
                    onPoemClick={this.onPoemClick}
                    activePoemIndex={activePoemIndex}
                    deletePoemClick={this.deletePoemClick}
                    restorePoemClick={this.restorePoemClick}/>
              </div>
            )
	}
}