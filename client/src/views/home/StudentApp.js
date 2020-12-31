/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import logo from "./book.png";

function Header() {
  return (
    <header className="masthead text-white text-center">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <h1 className="mb-5">
              Build a landing page for your business or project and generate
              more leads!
            </h1>
          </div>
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Enter your email..."
                  ></input>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn btn-primary btn-block btn-lg"
                    type="submit"
                  >
                    Sign up!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

function Icons() {
  return (
    <section className="features-icons bg-light text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div className="d-flex features-icons-icon">
                <i
                  className="icon-screen-desktop m-auto text-primary"
                  data-bs-hover-animate="pulse"
                ></i>
              </div>
              <h3>Fully Responsive</h3>
              <p className="lead mb-0">
                This theme will look great on any device, no matter the size!
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div className="d-flex features-icons-icon">
                <i
                  className="icon-layers m-auto text-primary"
                  data-bs-hover-animate="pulse"
                ></i>
              </div>
              <h3>Bootstrap 4 Ready</h3>
              <p className="lead mb-0">
                Featuring the latest build of the new Bootstrap 4 framework!
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
              <div className="d-flex features-icons-icon">
                <i
                  className="icon-check m-auto text-primary"
                  data-bs-hover-animate="pulse"
                ></i>
              </div>
              <h3>Easy to Use</h3>
              <p className="lead mb-0">
                Ready to use with your own content, or customize the source
                files!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 my-auto h-100 text-center text-lg-left">
            <ul className="list-inline mb-2">
              <li className="list-inline-item">
                <h6 to="#">INF552</h6>
              </li>
              <li className="list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item">
                <h6 to="#">SEM 2-2020</h6>
              </li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">
              © Caricari Torrejón Pedro Luis.
            </p>
          </div>
          <div className="col-lg-6 my-auto h-100 text-center text-lg-right">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="https://github.com/cartory" target="_blank">
                  <i className="fa fa-github fa-2x fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div>
      <Header></Header>
      <Icons></Icons>
    </div>
  );
}

function Books() {
  return <h1>BOOKS WORKS!!</h1>;
}

function Request(params) {
  return <h1>Request works!!</h1>;
}

function StudentApp() {
  const [tab, setTab] = useState(<Home />);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/" onClick={() => setTab(<Home />)}>
          <img src={logo} height="45" alt="img"></img>
          UNISIB
        </Link>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" onClick={() => setTab(<Books />)}>
                LIBROS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={() => setTab(<Request />)}>
                SOLICITUDES
              </Link>
            </li>
          </ul>

          <button className="btn btn-outline-primary">Sign In</button>
        </div>
      </nav>
      {tab}
      <Footer></Footer>
    </div>
  );
}

export default StudentApp;
