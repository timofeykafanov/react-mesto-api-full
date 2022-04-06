import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameRef = useRef();
    const linkRef = useRef();

    

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="add"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input
                ref={nameRef}
                type="text"
                className="popup__input popup__input_type_place"
                id="place-input"
                name="place"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
            />
            <span className="popup__input-error place-input-error"></span>
            <input
                ref={linkRef}
                type="url"
                className="popup__input popup__input_type_link"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;