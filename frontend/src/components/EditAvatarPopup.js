import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input
                ref={avatarRef}
                type="url"
                className="popup__input popup__input_type_avatar"
                id="avatar-input"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="popup__input-error avatar-input-error"></span>
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;