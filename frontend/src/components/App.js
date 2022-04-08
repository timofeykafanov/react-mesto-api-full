import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [sucсess, setSuccess] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false)
    };

    function handleUpdateUser(inputValues) {
        api.setUserInfo(inputValues)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(inputValue) {
        api.setUserAvatar(inputValue)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(inputValues) {
        api.setCard(inputValues)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser.data.user._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
            .then(() => {
                setCards(cards.filter((elem) => elem !== card));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRegistration(email, password) {
        auth.register(email, password)
            .then((res) => {
                setSuccess(true)
                setIsInfoTooltipOpen(true)
                navigate("/sign-in");
            })
            .catch((err) => {
                console.log(err)
                setIsInfoTooltipOpen(true)
                setSuccess(false)
            })
    }

    function handleLogin(email, password) {
        auth.login(email, password)
            .then(() => {
                setLoggedIn(true)
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    function handleLogout() {
        auth.logout()
        navigate('/sign-in')
        setLoggedIn(false)
    }

    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                if (res.data.email) {
                    navigate('/');
                }
                setCurrentUser(res);
                setCurrentEmail(res.data.user.email);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [navigate]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setLoggedIn(true);
                setCurrentUser(user);
                setCurrentEmail(user.data.user.email);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={currentEmail} handleLogout={handleLogout} sucсess={sucсess} />
            
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Main
                            onAddPlace={handleAddPlaceClick}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            onCardClick={handleCardClick}
                        />
                    </ProtectedRoute>} >
                </Route>

                <Route path="/sign-up" element={<Register handleRegistration={handleRegistration} />} />

                <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            </Routes>

            <Footer />

            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} sucсess={sucсess} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;