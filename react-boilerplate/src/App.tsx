import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch'

const searchClient = algoliasearch('YOUR APP ID', 'YOUR SEARCH API KEY')

const App = () => {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="YOUR INDEX NAME">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-center mb-8">
              👋 Welcome to this assignement
            </h1>
            <ul>
              <li>This boilerplate is providing:</li>
              <li>- React</li>
              <li>- Tailwind</li>
              <li>- Typescript</li>
              <li>- React Instant Search from Algolia</li>
            </ul>
            <p>Feel free to use it or build something from scratch</p>
            <p>
              Every information you need should be found in the
              <a
                target="_blank"
                href="https://github.com/algolia/Demo-engineers-assignement"
                className="text-indigo-800"
              >
                readMe
              </a>
            </p>
            <p>
              There is no time limit but you should aim around 4 hours to
              complete it
            </p>
            <p>Happy coding 🥷</p>
          </div>
        </div>
      </InstantSearch>
    </>
  )
}

export default App
