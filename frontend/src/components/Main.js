import { useContext } from "react";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser)

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__person">
                <div
                    className="profile__avatar"
                    onClick={props.onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.data.user.avatar})` }}
                ></div>
                <div className="profile__info">
                    <div className="profile__row">
                        <p className="profile__name">{currentUser.data.user.name}</p>
                        <button
                            className="profile__edit-button"
                            onClick={props.onEditProfile}
                            type="button"
                        ></button>
                    </div>
                    <p className="profile__about">{currentUser.data.user.about}</p>
                </div>
            </div>
                <button
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                    type="button"
                ></button>
        </section>

        <section className="elements">
            {props.cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} />
            ))}
        </section>
        </main>
    );
}

export default Main;