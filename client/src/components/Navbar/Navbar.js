import React from 'react';
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';

const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand ms-5" href="/">OLYMPICS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
    </ul>
    <span class="navbar-text">
      Navbar text with an inline element
    </span>
  </div>
</nav>
    
     <div class="m-5">
    <div class="btn-group m-2">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Events</button>
        <div class="dropdown-menu">
            <a href="/events" class="dropdown-item">Action</a>
            <a href="#" class="dropdown-item">Another action</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">Participant</button>
        <div class="dropdown-menu">
            <a href="/participants" class="dropdown-item">Edit Participant</a>
            <a href="#" class="dropdown-item">Another action</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">Competes</button>
        <div class="dropdown-menu">
            <a href="/competes" class="dropdown-item">Edit Competes</a>
            <a href="#" class="dropdown-item">Another action</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown">Winner</button>
        <div class="dropdown-menu">
            <a href="/winner" class="dropdown-item">Input Winner</a>
            
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">Venue</button>
        <div class="dropdown-menu">
            <a href="/venue" class="dropdown-item">Edit Venue</a>
            <a href="#" class="dropdown-item">Another action</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">Queries</button>
        <div class="dropdown-menu">
            <a href="/medalcountry" class="dropdown-item">Medals per Country</a>
            <a href="/viewplayer" class="dropdown-item">Details of a Player</a>
            <a href="/venueevent" class="dropdown-item">Get Events at Venue</a>

            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Penalty</button>
        <div class="dropdown-menu">
            <a href="/penalty" class="dropdown-item">Penalty</a>
           
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">Audience</button>
        <div class="dropdown-menu">
            <a href="/audience" class="dropdown-item">Edit Audience</a>
            
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">Equipment</button>
        <div class="dropdown-menu">
            <a href="/equipment" class="dropdown-item">Edit Equipment</a>
         
        </div>
    </div>
    {/* <div class="btn-group m-2">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown">Wsdnfksinner</button>
        <div class="dropdown-menu">
            <a href="/winner" class="dropdown-item">Input Winner</a>
            
        </div>
    </div>
    <div class="btn-group m-2">
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">Veskjdfkjsnue</button>
        <div class="dropdown-menu">
            <a href="/venue" class="dropdown-item">Edit Venue</a>
            <a href="#" class="dropdown-item">Another action</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div> */}
    {/* <div class="btn-group m-2">
        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">Queriskjdnfkes</button>
        <div class="dropdown-menu">
            <a href="/medalcountry" class="dropdown-item">Medals per Country</a>
            <a href="/viewplayer" class="dropdown-item">Details of a Player</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Separated link</a>
        </div>
    </div> */}
    <div class="btn-group m-2">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown">Venue Held At</button>
        <div class="dropdown-menu">
            <a href="/heldat" class="dropdown-item">Input Held At</a>
            
        </div>
    </div>
</div> 






      {/* <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logo.svg')} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        {/* </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
      {/* </Nav> */}
    </>
  );
};

export default Navbar;