import React from 'react';
import {render} from 'react-dom';
import Main from '../';

const rootElement = document.querySelector('.comments');
render(<Main apiRootUrl='http://localhost:9090/x/comment' concept='fakeConcept' conceptId='fakeConceptId'/>, rootElement);
