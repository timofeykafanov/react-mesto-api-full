function InfoTooltip({isOpen, onClose, sucсess}) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <button className="popup__close" onClick={onClose} type="button"></button>
                <div className={`popup__icon ${sucсess ? "popup__icon_type_confirm" : "popup__icon_type_error"}`}></div>
                <p className="popup__text">{
                    sucсess
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip;