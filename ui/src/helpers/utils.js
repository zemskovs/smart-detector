import { url } from "./constants";

export function sendForm(urlPage, body, onSuccess) {
	return fetch(url + urlPage, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "follow",
		referrer: "no-referrer",

		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(answer => onSuccess(answer));
}
