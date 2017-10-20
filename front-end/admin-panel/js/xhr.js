module.exports = function(method, url, data, cb1, cb2, cb3) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.setRequestHeader("x-access-token", window.localStorage.JWToken);
	xhr.send(data);
	xhr.onload = () => {
		if (xhr.status === 200) {
			let json = JSON.parse(xhr.response);
			if (json.success) {
				cb1(json.msg, json.data);
			} else {
				cb2(json.msg);
			}
		} else {
			let err = xhr.status;
			cb3(`Status: ${xhr.status}, Error: ${xhr.responseText}`);
		}
	}
	xhr.onerror = function(error) {
		console.error(error);
	};
}