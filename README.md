
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
| val                   |  value in input.                                      | `string`   | ``                                                                |
| numbers               |  bind your custom numbers.                            | `string[]` | `0123456789`                                                                
| capitalCaseLetters    |  bind your custom capitalCaseLetters.                 | `string[]` | `ABCDEFGHIJKLMNOPQRSTUVWXYZ`                                                                 |
| lowerCaseLetters      |  bind your custom lowerCaseLetters.                   | `string[]` | `abcdefghijklmnopqrstuvwxyz`                                                   
| showNumbers           |  hide numbers input                                   | `boolean`  | `true`                                                             
| showCapitalCaseLetters|  hide numbers showCapitalCaseLetters                  | `boolean`  | `true` 
| showLowerCaseLetters  |  hide numbers showLowerCaseLetters                    | `boolean`  | `true`                                                                                                                     
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)