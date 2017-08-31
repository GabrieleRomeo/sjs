​                           <img src="assets/img/hero_m.png" />
  <img src="assets/img/logo.png" />

## sjs - Safety Javascript - Utility Library

Hello and Welcome to this repository.

*Sjs* is a collection of algorithms and functions wrote during my studies at [Bov Academy](https://www.bovacademy.com).



Unlike many other js libraries, Sjs aims to be **strongly-typed**. The main benefit to being *strongly-type* is that 

when you pass an argument to a function, the Library checks if it belongs to an expected *data type*. 

If this is not the case, the System throws a *TypeError* Exception.



Functions are collected and categorized under various *namespaces* using dedicated tags:



| Namespace | Description              | Access    |
| :-------: | ------------------------ | --------- |
|     A     | Animations               | sjs.A     |
|    DOM    | Access to the DOM        | sjs.DOM   |
|     E     | Extra Functions          | sjs.E     |
|     F     | Functional Programming   | sjs.F     |
|     U     | Utility functions        | sjs.U     |
|     V     | Validator Functions      | sjs.V     |
|   types   | Collection of Data Types | sjs.types |



### Build from source

To clone this repository to your local machine run the following command(s):

```shell
git clone git@github.com:GabrieleRomeo/sjs.git
cd path/to/repository
```

#### Install dependencies

To install all of *sjs*' required software dependencies, run the following command:

```shell
npm install
```

 #### Build

After you've been installed all the dependencies, you can build the library with the following command(s):

```shell
# Development
npm run dev 

# Production 
npm run prod
```

### Unit testing

The following commands are used to run Mocha tests:

```shell
# Run each test directly into the shell
npm run test:mocha 

# Run each test within the browser
npm run test:mocha:watch
# enter the 'test' directory by clicking on it
```

### 