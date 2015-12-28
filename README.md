# Focus comments

Comments extension for the Focus solution.

![image](https://cloud.githubusercontent.com/assets/5349745/12016949/34f1f058-ad51-11e5-8990-8b4bc3fddba0.png)

## Installation

```bash
npm i -S focus-comments
```

Please note that you must you React with addons, so choose the appropriate built files to have `React.addons` defined.

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
