
# vue-client-recaptcha
Build simple recaptcha for vuejs without need server

## Installation
```bash
npm install vue-client-recaptcha --save
```
```bash
yarn add vue-client-recaptcha
```

## Props

| Name                  | Description                                           | Type       | Default                                                              |
| --------------------  | ----------------------------------------------------- | --------   | ------------------------|
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
| icon  | set icon name for change captcha code source:font-awsome-4.7  | `string`  | `refresh`                                                                                                                 
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)