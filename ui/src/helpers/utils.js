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

export const findIdByName = (items, name) =>
	items.find(
		c =>
			c.name === name.split(" ")[1] &&
			c.surname === name.split(" ")[0] &&
			c.middleName === name.split(" ")[2]
	).id;

export const findById = (items, id) => {
	return items.find(i => i.id == id);
};

export const findByCategory = (items, name) =>
	items.find(c => c.name == name).id;

export const getDate = date =>
	`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
