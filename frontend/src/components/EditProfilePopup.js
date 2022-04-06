import { useContext, useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="edit"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input
                type="text"
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                minLength="2"
                maxLength="40"
                required
                placeholder='Имя'
                onChange={handleNameChange}
                value={name || ''}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                type="text"
                className="popup__input popup__input_type_about"
                id="about-input"
                name="about"
                minLength="2"
                maxLength="200"
                required
                placeholder='Описание'
                onChange={handleDescriptionChange}
                value={description || ''}
            />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;