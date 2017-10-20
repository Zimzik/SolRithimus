import React from 'react';

export default class deleteDialogWindow extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {message, clickedOK, clickedCancel, dialogClass} = this.props;
		return (
			<div className={dialogClass}>
				<p>{message}</p>
				<div className="button-block">
					<input type="button" value="OK" onClick={clickedOK}/>
					<input type="button" value="Відміна" onClick={clickedCancel}/>
				</div>
			</div>
		)
	}
}