export default class About extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<section className="author">
				<div className="in-wrapper">
					<div className="info">
						<h2>Про мене</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet magna lorem, sit amet mattis augue lobortis vel. Nulla cursus rhoncus nisl at tempor. Nam porta massa vel convallis elementum. Aliquam tincidunt, nunc a lobortis accumsan, libero felis laoreet est, sit amet sagittis elit mauris ut metus. Fusce laoreet eleifend arcu id sollicitudin. Ut at nibh dignissim, viverra arcu eget, dictum neque. Vestibulum volutpat vel dolor nec maximus. Morbi vehicula placerat turpis eget placerat. Praesent nunc nulla, consectetur ac viverra et, viverra sed nulla. Nulla tempus vel lorem eget porttitor. Fusce venenatis, quam vitae congue porta, nunc odio interdum sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet magna lorem, sit amet mattis augue lobortis vel. Nulla cursus rhoncus nisl at tempor. Nam porta massa vel convallis elementum. Aliquam tincidunt, nunc a lobortis accumsan, libero felis laoreet est, sit amet sagittis elit mauris ut metus. Fusce laoreet eleifend arcu id sollicitudin. Ut at nibh dignissim, viverra arcu eget, dictum neque. Vestibulum volutpat vel dolor nec maximus. Morbi vehicula placerat turpis eget placerat. Praesent nunc nulla, consectetur ac viverra et, viverra sed nulla. Nulla tempus vel lorem eget porttitor. Fusce venenatis, quam vitae congue porta, nunc odio interdum sem. </p>
					</div>
					<div className="photo">
						<img src="img/author-photo.png" alt="Author"/>
					</div>
				</div>
			</section>)
	}
}