import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>We go high</h1>


      </header>
      <body>
          <p>정보를 원하는 기사의 URL을<br/>입력해 보세요.</p>
          <div className="Search">
              <input id="search-input" placeholder="뉴스 URL을 입력하세요."/>
          </div>
      </body>
    </div>
  );
}

export default App;
