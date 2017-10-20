import React from 'react';
import Dialog from './dialog';
import xhr from './xhr';
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
    	activePoemIndex: -1,
			showDialog: false,
			dialogMessage: '',
			whatClicked: '',
			activeIndex: -1
    }
    this.getRecycledList = this.getRecycledList.bind(this);
    this.onPoemClick = this.onPoemClick.bind(this);
    this.restorePoemClick = this.restorePoemClick.bind(this);
    this.deletePoemClick = this.deletePoemClick.bind(this);
		this.showDialogWindow = this.showDialogWindow.bind(this);
		this.dialogClickedOK = this.dialogClickedOK.bind(this);
		this.dialogClickedCancel = this.dialogClickedCancel.bind(this);
  }

	getRecycledList() {
		// TODO: add server call to retrieve poems list
		
		xhr('POST', '/auth/recycledPoemsList', '', (msg, data) => {
			let poemsList = data;
        this.setState({
          poemsList: poemsList
        });
		}, (err) => {
			console.error(err);
		}, (err) => {
			console.error(err);
		});
	}

	componentWillMount() {
		this.getRecycledList();
	}

	onPoemClick(poemIndex) {
   		this.setState({ activePoemIndex: poemIndex});
  	};
	
	showDialogWindow() {
		this.setState({
			showDialog: true
		})
	}
	
	dialogClickedOK() {
		this.setState({
			showDialog: false
		})
		const {whatClicked, poemsList, activeIndex} = this.state;
		if (whatClicked === 'delete') {
			let data = JSON.stringify({
				id: poemsList[activeIndex]._id,
			});
			xhr('DELETE', '/auth/delete', data, (msg) => {
					this.getRecycledList();
					console.log(msg);
			}, (err) => {
				console.log(err)
			}, (err) => {
				console.log(err);
			});
			this.setState({
				activeIndex: -1
			})
		}
		
		if (whatClicked === 'restore') {
				let data = JSON.stringify({
					id: poemsList[activeIndex]._id,
					title: poemsList[activeIndex].title,
					body: poemsList[activeIndex].body,
					date: poemsList[activeIndex].date
				});
				xhr('POST', '/auth/restore', data, (msg) => {
					this.setState({
							dbmessage: msg,
							activePoemIndex: -1,
						});
						this.getRecycledList();
						console.log(msg);
				}, (err) => {
					console.log(err);
				}, (err) => {
					console.log(err)
				});
				this.setState({
					activeIndex: -1
				})
			}
	}
	
	dialogClickedCancel() {
		this.setState({
			showDialog: false,
			activeIndex: -1
		})
	}

  deletePoemClick(index) {
			this.setState({
				whatClicked: 'delete',
				dialogMessage: "Даний вірш буде повністю видалено з бази даних! Продовжити?",
				activeIndex: index
			});
			this.showDialogWindow();
    }

    restorePoemClick(index) {
			this.setState({
				whatClicked: 'restore',
				dialogMessage: "Даний вірш буде відновлено в основний список! Продовжити?",
				activeIndex: index
			});
			this.showDialogWindow();
    }

	render() {
		const {poemsList, activePoemIndex, showDialog, dialogMessage} = this.state;
        return (
              <div className="poems-show">
								<div className={showDialog ? "blocking-wrapper" : "invisible"}></div>
								<Dialog message={dialogMessage} dialogClass={showDialog ? "dialog-window" : "invisible"} clickedOK={this.dialogClickedOK} clickedCancel={this.dialogClickedCancel}/> 
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