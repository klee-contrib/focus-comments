import React from 'react';
import {render} from 'react-dom';
import Main from '../';
import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min';
import './style.scss';

const rootElement = document.querySelector('.comments');
render(<Main apiRootUrl='./x/comment' concept='fakeConcept' conceptId='fakeConceptId' currentUserId='me'/>, rootElement);
