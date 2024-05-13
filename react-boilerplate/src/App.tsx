import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch';
import { Navbar } from './components/layout/Navbar';
import { ImageSwitcher } from './components/ImageSwitcher';
import { useLocalStorage } from './useLocalStorage';
import { CustomInfiniteHits } from './components/CustomInfiniteHits';
import { CustomRefinementList } from './components/CustomRefinementList';
import { RangeSlider } from './components/RangeSlider';

const searchClient = algoliasearch('U946D7MO9Z', 'cde579fe8dcf400a140921608390b7ac');

const App = () => {
  // Retrieve language, language setter, image switch state, and toggle function from custom hook.
  const { language, setLanguage, imageSwitchEnabled, toggleImageSwitching } = useLocalStorage();

  return (
    <div className="font-mono bg-custom-bg">
      {/* Algolia InstantSearch component */}
      <InstantSearch searchClient={searchClient} indexName="pokemon" insights>
        {/* Configure InstantSearch settings */}
        <Configure hitsPerPage={12} />

        {/* Navbar component */}
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4 pr-8 pb-8 w-fit-content">
              <div className="text-lg">
                {/* Image switcher */}
                <div className="pt-4 font-semibold">
                  <ImageSwitcher initialEnabled={imageSwitchEnabled} onChange={toggleImageSwitching} />
                </div>
                {/* Refinement lists */}
                <p className="pt-5 pb-2 font-semibold"> Type </p>
                <CustomRefinementList attribute="type" showMore showMoreLimit={20} />
                <p className="pt-5 pb-2 font-semibold"> Game versions </p>
                <CustomRefinementList attribute="game_versions" showMore showMoreLimit={20} />
                {/* Sliders */}
                <p className="pt-5 pb-2 font-semibold"> Stats </p>
                <div className="py-2 slider-container">
                  <p>HP</p>
                  <RangeSlider attribute="base.HP" label="" />
                </div>
                <div className="py-2 mt-2 slider-container">
                  <p>Attack</p>
                  <RangeSlider attribute="base.Attack" label="" />
                </div>
                <div className="py-2 mt-2 slider-container">
                  <p>Defense</p>
                  <RangeSlider attribute="base.Defense" label="" />
                </div>
                <div className="py-2 mt-2 slider-container">
                  <p>Speed</p>
                  <RangeSlider attribute="base.Speed" label="" />
                </div>
              </div>
            </div>

            {/* Search results */}
            <div className="lg:w-3/4">
              <div className="my-4">
                <div className="flex justify-center">
                  {/* Custom Infinite Hits component */}
                  <CustomInfiniteHits language={language} imageSwitchEnabled={imageSwitchEnabled} toggleImageSwitching={toggleImageSwitching} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default App;



