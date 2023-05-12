import React, { Suspense } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUp from "./pages/Admin/SignUp/SignUp";
import { Form } from "./templates/AdminTemplate/Form/Form";
import SignIn from "./pages/Admin/SignIn/SignIn";
import Template from "./templates/AdminTemplate/Template/Template";
import Home from "./pages/Admin/Home/Home";
import User from "./pages/Admin/User/User";
import UserEdit from "./pages/Admin/User/Edit/UserEdit";
import UserCreate from "./pages/Admin/User/Create/UserCreate";
import Film from "./pages/Admin/Film/Film";
import FilmCreate from "./pages/Admin/Film/Create/FilmCreate";
import FilmEdit from "./pages/Admin/Film/Edit/FilmEdit";
import GroupCinema from "./pages/Admin/GroupCinema/GroupCinema";
import GroupCinemaCreate from "./pages/Admin/GroupCinema/Create/GroupCinemaCreate";
import GroupCinemaEdit from "./pages/Admin/GroupCinema/Edit/GroupCinemaEdit";
import Cinema from "./pages/Admin/Cinema/Cinema";
import CinemaCreate from "./pages/Admin/Cinema/Create/CinemaCreate";
import CinemaEdit from "./pages/Admin/Cinema/Edit/CinemaEdit";
import Room from "./pages/Admin/Room/Room";
import RoomCreate from "./pages/Admin/Room/Create/RoomCreate";
import RoomEdit from "./pages/Admin/Room/Edit/RoomEdit";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import ShowTimeCreate from "./pages/Admin/ShowTime/Create/ShowTimeCreate";
import ShowTimeEdit from "./pages/Admin/ShowTime/Edit/ShowTimeEdit";
import TypeUser from "./pages/Admin/TypeUser/TypeUser";
import TypeUserCreate from "./pages/Admin/TypeUser/Create/TypeUserCreate";
import TypeUserEdit from "./pages/Admin/TypeUser/Edit/TypeUserEdit";
import { UserTemplate } from "./templates/ClientTemplate/Template/Template";
import HomeClient from "./pages/Client/Home/HomeClient";
import DetailsFilm from "./pages/Client/DetailsFilm/DetailsFilm";
import Checkout from "./pages/Client/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import ModalTrailer from "./components/Modal/ModalTrailer";
import Profile from "./pages/Client/Profile/Profile";
import GroupCinemaClient from "./pages/Client/GroupCinemaClient/GroupCinema";
import SystemCinema from "./pages/Client/SystemCinema/SystemCinema";
import DetailsCinema from "./pages/Client/DetailsCinema/DetailsCinema";
import Ticket from "./pages/Admin/Ticket/Ticket";
import UserWithShowTime from "./pages/Admin/ShowTime/UserWithShowTime/UserWithShowTime";
import Checkout_Success from "./components/Success_Error/Checkout_Success";
import Checkout_Error from "./components/Success_Error/Checkout_Error";
import Loading from "./components/Loading/Loading";
import io from "socket.io-client";
import { DOMAIN_STATIC_FILE } from "./utils/Settings/config";
const socket = io.connect(`${DOMAIN_STATIC_FILE}`);
export const history = createBrowserHistory();
export default function App() {
  return (
    <Router history={history}>
      <Loading />
      <ModalTrailer />
      <Switch>
        <Route path="/success" exact component={Checkout_Success} />
        <Route path="/error" exact component={Checkout_Error} />
        <Form path="/signUp" exact Component={SignUp} />
        <Form path="/signIn" exact Component={SignIn} />
        {/* admin */}
        <Template path="/Admin/Home" exact Component={Home} />
        {/* User */}
        <Template path="/Admin/Users" exact Component={User} />
        <Template path="/Admin/Users/Edit/:id" exact Component={UserEdit} />
        <Template path="/Admin/Users/Create" exact Component={UserCreate} />
        {/* Film */}
        <Template path="/Admin/Films" exact Component={Film} />
        <Template path="/Admin/Films/Create" exact Component={FilmCreate} />
        <Template path="/Admin/Films/Edit/:id" exact Component={FilmEdit} />
        {/* Group Cinema */}
        <Template path="/Admin/GroupCinemas" exact Component={GroupCinema} />
        <Template
          path="/Admin/GroupCinemas/Create"
          exact
          Component={GroupCinemaCreate}
        />
        <Template
          path="/Admin/GroupCinemas/Edit/:id"
          exact
          Component={GroupCinemaEdit}
        />
        {/* Cinemas */}
        <Template path="/Admin/Cinemas" exact Component={Cinema} />
        <Template path="/Admin/Cinemas/Create" exact Component={CinemaCreate} />
        <Template path="/Admin/Cinemas/Edit/:id" exact Component={CinemaEdit} />
        {/* Room */}
        <Template path="/Admin/Rooms" exact Component={Room} />
        <Template path="/Admin/Rooms/Create" exact Component={RoomCreate} />
        <Template path="/Admin/Rooms/Edit/:id" exact Component={RoomEdit} />
        {/* ShowTime */}
        <Template path="/Admin/ShowTimes" exact Component={ShowTime} />
        <Template
          path="/Admin/ShowTimes/Create"
          exact
          Component={ShowTimeCreate}
        />
        <Template
          path="/Admin/ShowTimes/Edit/:id"
          exact
          Component={ShowTimeEdit}
        />
        <Template
          path="/Admin/ShowTimes/userWithShowTime/:id"
          exact
          Component={UserWithShowTime}
        />
        {/* TypeUser */}
        <Template path="/Admin/TypeUsers" exact Component={TypeUser} />
        <Template
          path="/Admin/TypeUsers/Create"
          exact
          Component={TypeUserCreate}
        />
        <Template
          path="/Admin/TypeUsers/Edit/:id"
          exact
          Component={TypeUserEdit}
        />
        <Template path="/Admin/Tickets/:id" exact Component={Ticket} />

        <UserTemplate path="/DetailsFilm/:id" exact Component={DetailsFilm} />
        <UserTemplate path="/Home" exact Component={HomeClient} />
        <UserTemplate path="/Profile" exact Component={Profile} />
        <UserTemplate path="/GroupCinema" exact Component={GroupCinemaClient} />
        <UserTemplate path="/SystemCinema/:id" exact Component={SystemCinema} />
        <UserTemplate
          path="/DetailsCinema/:id"
          exact
          Component={DetailsCinema}
        />

        <CheckoutTemplate
          path="/Checkout/:id"
          exact
          Component={Checkout}
          socket={socket}
        />

        <UserTemplate path="/" Component={HomeClient} />
      </Switch>
    </Router>
  );
}
