import './App.css';
import React,{Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Switch,
  Route,
Routes,
  useParams,
} from "react-router-dom";
//import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import Navbar from './components/Navbar/Navbar';


//components
import InputEvent from './components/Event/InputEvent';
import ListEvent from './components/Event/ListEvent';
import EventPage from './Pages/EventPage';
import ParticipantPage from './Pages/ParticipantPage';
import CompetesPage from './Pages/CompetesPage';
import WinnerPage from './Pages/WinnerPage';
import LoginPage from './Pages/LoginPage';
import MedalCountryPage from './Pages/MedalCountryPage';
import ViewPlayerPage from './Pages/ViewPlayerPage';
import VenuePage from './Pages/VenuePage';
import HeldAtPage from './Pages/HeldAtPage';
import PenaltyPage from './Pages/PenaltyPage';
import AudiencePage from './Pages/AudiencePage';
import EquipmentPage from './Pages/EquipmentPage';
import VenueEvent from './components/VenueEvent/VenueEvent';


function App() {
  return (
    // <Fragment>
    //   <div className="container">
    //   <InputEvent/>
    //   <ListEvent/>
    //     </div>
    // </Fragment>

<Fragment>
<BrowserRouter>
 <Navbar /> 
  <Routes>
  {/* <Route exact path="/">
        <InputEvent />
      </Route> */}
      <Route exact path='/' element={<LoginPage/>}/>
     <Route exact path="/events" element={<EventPage/>}/>
     <Route exact path="/winner" element={<WinnerPage/>}/>
     <Route exact path="/participants" element={<ParticipantPage/>}/>
     <Route exact path="/competes" element={<CompetesPage/>}/>
     <Route exact path="/medalcountry" element={<MedalCountryPage/>}/>
     <Route exact path="/viewplayer" element={<ViewPlayerPage/>}/>
     <Route exact path="/venue" element={<VenuePage/>}/>
     <Route exact path="/heldat" element={<HeldAtPage/>}/>
     <Route exact path="/penalty" element={<PenaltyPage/>}/>
     <Route exact path="/audience" element={<AudiencePage/>}/>
     <Route exact path="/equipment" element={<EquipmentPage/>}/>
     <Route exact path="/venueevent" element={<VenueEvent/>}/>




            {/* <EventPage />
          </Route> */}
          </Routes>

         </BrowserRouter>
          </Fragment>

    // <Router>
    //   <Navbar />
    //   <Routes>
    //     {/* <Route path='/' exact component={Home} /> */}
    //     {/* <Route path='/' exact element={EventPage} /> */}

    //     {/* <Route path='/about' component={About} />
    //     <Route path='/services' component={Services} />
    //     <Route path='/contact-us' component={Contact} />
    //     <Route path='/sign-up' component={SignUp} /> */}
    //   </Routes>
    // </Router>
  );
}

export default App;
