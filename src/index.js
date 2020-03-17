import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

//react는 app.js component를 element에 넣으려고 한다
//페이지의 소스 코드 보기에서는 app.js 내용을 볼수없다 > react는 소스코드에 처음부터 html을 넣지 않고, 
//html에서 html을 추가하거나 제거하는법을 알고있다.
//virtual이고 존재하지 않기 때문에 react가 빠르다
//react는 component와 동작한다.
//react는 component를 사용해서 html처럼 작성하려는 경우에 필요
//jsx : js와 html사이의 조합. javascript안의 html
////ReactDOM.render(<Potato />, document.getElementById('potato')); >> react application이 하나의 component만을 rendering한다.
// App.js 에서 다른 component를 import하여 사용. App.js 참조
// ***react app은 한번에 하나!의 component만 rendering할 수 있다