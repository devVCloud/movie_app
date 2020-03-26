import React from 'react';
//import Potato from './potato';
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

/*
const foodIlike = [
  {
    id:1,
    name : "kimchi",
    image : "https://i.ytimg.com/vi/yP1Gk7IlhwU/maxresdefault.jpg",
    rating : 4.7
  },
  {
    id:2,
    name : "icecream",
    image : "https://sugarspunrun.com/wp-content/uploads/2018/07/Ice-Cream-Cone-Cupcakes-Recipe-1-of-1-6.jpg",
    rating : 4.1
  },
  {
    id:3,
    name : "macaron",
    image : "http://cafenoli605.hgodo.com/data/goods/14/08/29/1890/1409271403337m0.jpg",
    rating : 4.3
  }
];

//function Food(props) {
  //console.log(props.fav)
function Food({name, picture, rating}){ //object 내부를 얻는방법 
  return <div>
    I LOVE {name}
    <h4>{rating}/5.0</h4>
    <img src={picture} alt={name}/>
    </div>
}

Food.propTypes ={
  name : PropTypes.string.isRequired,
  picture:PropTypes.string.isRequired,
  rating:PropTypes.number.isRequired
}
/ *
function renderFood(dish){
  return <Food name = {dish.name} picture={dish.image}></Food>
}
* /
function App() {
  return (
    <div>
      {foodIlike.map(dish =>  //dish 는 object이며 현재 처리상태이다
        <Food 
          key={dish.id} 
          name={dish.name} 
          picture={dish.image} 
          rating={dish.rating} />
        )}
    </div>
  );
  / *
 return (
  <div>
    {foodIlike.map(renderFood)}
  </div>
 );
 * /
}
*/
/* state 제어와 lifecycle
class App extends React.Component{
  constructor(props){
    super(props);
    console.log("constructor hello"); //render()의 console.log보다 먼저 호출됨
  }
  state = {
    count : 0
  };
  add = () => {
    //this.setState({ count : this.state.count + 1 });
    this.setState(current => ({count : current.count + 1}));  //이 방법이 state를 set 할때, react에서 외부 상태에 의존하지않는 가장 좋은방법
  };
  minus = () => {
    this.setState(current => ({ count : current.count - 1 }));
  };
  componentDidMount() {
    console.log("component rendered");
  }
  componentDidUpdate(){
    console.log("i just updated");
  }
  componentWillUnmount(){
    console.log("good bye");  //실행되는게 보이지는 않지만 실행되는거 맞음
  }
  render(){
    console.log("rendering");
    return <div>
        <h1>Number {this.state.count}</h1>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
  }
}

export default App;
*/
// 2 1 Reusable Components with JSX
/*
   Component 에서 Component로, children component로 정보 보내기 
   props 를 사용. 
*/

/*
  const friends = ["dal", "mark","lynn"]
  friends.map(friend => {  console.log(friend);return friend+"♥"; })
  ====>["dal♥", "mark♥", "lynn♥"]
  friend로 지칭해도 되고 어떤 이름을 붙혀도 된다. 내부 item들에 접근하기 위함일뿐
*/

/*
  state는 우리가 동적 데이터와 함께 작업할때 생성된다.
*/

/*
  function component는 function 이고 뭔가를 return 하며 screen에 표시된다.
  class component는 class 이며 react component로 부터 확장되고, screen에 표시된다.
  class는 state 가지며, state는 object이다.
  state는 직접 변경해서는 안된다. 렌더할 수 없다. this.state.count = 1 (x)
  대신 setState function을 호출하면 언제 setState를 호출할지, view를 새로고침하길 원하는지 알고
  render function이 refresh된다.
  >>setState를 호출하면 새 state와 render function 이 호출된다.
  * state는 object이므로, setState는 새로운 state를 받아야한다.
  react 는 virtual Dom을 이용하기 때문에 변한 부분만 바꾸면서, 매우빠르게, 깜박거림도 없당
*/

/* 
  life cycle method 기본적으로 react가 component를 생성하고 없애는 방법
  component가 render될때 호출되는 다른 function들이 있다.
  mounting : component가 생성되는것
    - constructor() : constructor는 시작전에 호출된다.
    - staticgetDerivedStateFromProps() : 범위넘어가서 생략
    - render()
    - componentDidMount() : render 하면 제일 먼저 실행되는  method
  Updating : update
    - static getDerivedStateFromProps()
    - shouldComponentUpdate() : 업데이트 할말 결정
    - render()
    - getSnapshotBeforeUpdate()
    - componentDidUpdate()
    - setState를 호출하면 component를 호출하고 먼저 render를 호출한다음 업데이트가 완료되었을때 componentDidUpdate가 실행됨
  Unmounting : component가 죽는것(페이지가 바뀔때)
    - componentWillUnmount() 
*/

class App extends React.Component {
  state = {
    isLoading: true,  
    movies : []
  };  
  getMovies = async () => {
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    //console.log(movies.data.data.movies);
    const {data: {data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading : false}); //this.setState({movies : movies}); 와 같다
  };
  componentDidMount(){  //componentDidMount에서 data를 fetch해야한다
  //async componentDidMount()
    /* 
    setTimeout(()=> {
      this.setState({isLoading : false, book : true});
      //미래에 쓰고자 하는 state를 선언하는 것은 필수가 아니다.
    }, 6000);
    */

    //4.0 fetching Movies from Api
    //const movies =  axios.get("https://yts-proxy.now.sh/list_movies.json");
    //axios 가 시간이 걸릴수도 있기 때문에 이를 기다리게 하기 위해 componentDidMount 앞에 async를 붙히거나, 
    //새로 function getMovies을 생성하여 그 내부에서 axios를 호출한다.
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">
              Loading..
            </span>
          </div>
          ) : (
            <div className="movies">
              {movies.map(movie =>  (
                <Movie 
                  key={movie.id} 
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  poster={movie.medium_cover_image} 
                  genres={movie.genres}
                />
              ))}
            </div>
          )
        }
      </section>
    )
  }
}

export default App;
//https://yts-proxy.now.sh/list_movies.json