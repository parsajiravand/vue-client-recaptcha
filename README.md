
# vue-client-recaptcha
Build simple recaptcha for vuejs without need server

## Installation
```bash
npm install vue-client-recaptcha --save
```
```bash
yarn add vue-client-recaptcha
```
## Usage
1. You can import globally in your vue-3 project (main.js)

```javascript
import { createApp } from 'vue'
import VueClientRecaptcha from 'vue-client-recaptcha/dist/vue-client-recaptcha.es'

const app= createApp(App)
app.component("VueClientRecaptcha", VueClientRecaptcha);  
```
2. You can import localy in your vue-3 component
```javascript
import VueClientRecaptcha from 'vue-client-recaptcha/dist/vue-client-recaptcha.es'

export default {
  components: {
    VueClientRecaptcha,
  },
}
```
## Props

| Name                  | Description                                                   | Type       | Default               |
| --------------------  | -------------------------------------------------------------------------------------------------------------------- | --------   | ------------------------|
| val                   | width of captcha image.                               | `string`   | ``                                                                |
| numbers               | height of captcha image.                              | `string[]` | `0123456789`                                                                
| capitalCaseLetters    | fontSize of captcha characters.                       | `string[]` | `ABCDEFGHIJKLMNOPQRSTUVWXYZ`                                                                 |
| lowerCaseLetters      | fontFamily of captcha characters.                     | `string[]` | `abcdefghijklmnopqrstuvwxyz`                                                   
| showNumbers           | fontColor of captcha characters.                      | `boolean`  | `true`                                                             
| showCapitalCaseLetters| characters that captcha should be made with.          | `boolean`  | `true` 
| showLowerCaseLetters  | count of characters that captcha should be made with. | `boolean`  | `true`     
| count  | number of character | `number`  | `5`   
| hideLines  | hide dirty line and make captcha simple | `boolean`  | `false`   
| customTextColor  | set text color for characters | `string`  | ``   
| width  | width of captcha | `any`  | `count * 30`
| height  | width of captcha | `number`  | `50`
| canvasClass  | can set custom class for canvas | `string`  | ``
                                                                                                          
## Events

| Event            | Value  | Description                                    |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@isValid` | Boolean | can listen to payload , if your value and captcha code same return True otherwise return False |
## slots

| Name    | Description |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`  | can set your custom template for icon  or changed to text (default icon is 'refresh' from fontawsome also you can change it with props  |      
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)