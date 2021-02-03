import store from './state/store-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';

//addNewPost('Sjennet in game');

let rerenderEntireTree=() => {
    ReactDOM.render(
        <MainApp />, document.getElementById('root'));
}

rerenderEntireTree();

store.subscribe (() => {
    rerenderEntireTree();
});
