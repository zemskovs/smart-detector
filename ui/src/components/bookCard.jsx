// import React from "react";
// import { Link } from "react-router-dom";
// import { Card, Icon, Image, Button } from "semantic-ui-react";

// const BookCard = book => {
// 	const { title, author, price, image, addToCart, addedCount } = book;
// 	return (
// 		<Card>
// 			<Link to={`/${book.id}`} title={title}>
// 				<Image src={image} wrapped ui={false} />
// 			</Link>
// 			<Card.Content>
// 				<Card.Header>{title}</Card.Header>
// 				<Card.Meta>
// 					<span className="date">{author}</span>
// 				</Card.Meta>
// 			</Card.Content>
// 			<Card.Content extra>
// 				<a>
// 					<Icon name="rub" />
// 					{price}
// 				</a>
// 			</Card.Content>
// 			<Button onClick={addToCart.bind(this, book)}>
// 				Добавить в корзину {addedCount > 0 && `(${addedCount})`}
// 			</Button>
// 		</Card>
// 	);
// };

// export default BookCard;
