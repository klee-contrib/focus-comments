# Focus comments

Comments extension for the Focus solution.

## Installation

```bash
npm i -S focus-comments
```

## Usage

```jsx
<FocusComments {...props}/>
```

## Props

- **apiRootUrl** (`string`): the API url,
- **concept** (`string`): the concept to plug the comments on,
- **conceptId** (`string | number`): the concept id,
- **userPictureResolver** (`function`): a function that takes the user id as an input, and returns the user picture url as an ouput,
- **texts** :
    - **placeholder** (`string`): placeholder for the input field,
    - **send** (`string`): send button caption,
    - **edit** (`string`): edit button caption,
    - **cancel** (`string`): cancel button caption
- **locale** (`string`): application locale (from [momentJS](http://momentjs.com/docs/#/i18n/changing-locale/))
