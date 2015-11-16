import React from 'react';
import {render} from 'react-dom';
import Main from '../';
import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
import './style.scss';

const rootElement = document.querySelector('.comments');
render(
    <div data-focus='root'>
        <div data-focus='container'>
            <Main apiRootUrl='./x/comment' concept='fakeConcept' conceptId='fakeConceptId' currentUserId='me'/>
        </div>
        <div data-focus='top'>
        </div>
        <div data-focus='bottom'>
        </div>
    </div>
    , rootElement);
