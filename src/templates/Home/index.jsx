import { Component } from "react";

import "./styles.css";

//import { PostCard } from './components/PostCard';
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

// sempre que meu estado mudar no react a função render vai ser chamada novamente
// setState para mudar o estado
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate() {
    console.log(this.props['tem-uma-pro-aqui'])
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleInputChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      // passar state ou outra coisa para compenentes torna ele uma props os atributos que são passados
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search Value: {searchValue}</h1>}

          <TextInput
            inputValue={searchValue}
            handleInputChange={this.handleInputChange}
          />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && (
          <p>Não existem posts do tipo "{searchValue}" =(</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text={"Load more posts"}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

// estados -> dados que componentes utiliza
// state = {
//posts: [],
// };
// handlePClick = () => {
//   this.setState({ name: "Xavier" });
// };

// handleAClick = (event) => {
//   event.preventDefault();
//   const { counter } = this.state;
//   this.setState({ counter: counter + 1 });
//   if (counter === 5) {
//     this.setState({ name: "Gabriel" });
//   }
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Olá mundo!</p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// handlePClick = () => {
//   this.setState({ name: "Xavier" });
// };

// handleAClick = (event) => {
//   event.preventDefault();
//   const { counter } = this.state;
//   this.setState({ counter: counter + 1 });
//   if (counter === 10) {
//     this.setState({ name: "Gabriel" });
//   }
// };
