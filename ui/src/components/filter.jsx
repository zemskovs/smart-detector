import React from "react";
import { Menu, Input } from "semantic-ui-react";

export const filterNames = {
	all: "Все",
	hightPrice: "Цена (дорогие)",
	lowPrice: "Цена (дешевые)",
	author: "Автор"
};

export default ({ setFilter, filterBy, searchQuery, setSearchQuery }) => {
	return (
		<Menu secondary>
			<Menu.Item
				name={filterNames.all}
				active={filterBy === filterNames.all}
				onClick={setFilter.bind(this, filterNames.all)}
			/>
			<Menu.Item
				name={filterNames.hightPrice}
				active={filterBy === filterNames.hightPrice}
				onClick={setFilter.bind(this, filterNames.hightPrice)}
			/>
			<Menu.Item
				name={filterNames.lowPrice}
				active={filterBy === filterNames.lowPrice}
				onClick={setFilter.bind(this, filterNames.lowPrice)}
			/>
			<Menu.Item
				name={filterNames.author}
				active={filterBy === filterNames.author}
				onClick={setFilter.bind(this, filterNames.author)}
			/>
			<Menu.Item>
				<Input
					value={searchQuery}
					icon="search"
					placeholder="Введите запрос"
					onChange={e => {
						setSearchQuery(e.target.value).bind(this);
					}}
				></Input>
			</Menu.Item>
		</Menu>
	);
};
