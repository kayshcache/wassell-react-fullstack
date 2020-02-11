import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import NotFound404Page from './pages/404Page';
import './App.css';

function App() {
  return (
<Router>
    <div className="App">
	<NavBar />
	  {/* Switch will stop matching routes when it matches */}
	<Switch>
	<Route path="/" component={ HomePage } exact />	  
	<Route path="/article/:name" component={ ArticlePage } />	  
	<Route path="/about" component={ AboutPage } />	  
	<Route path="/article-list" component={ ArticleListPage } />	  
	<Route component={ NotFound404Page } />
	</Switch>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
</Router>
  );
}

export default App;
