import algoliasearch from 'algoliasearch/lite'
import { useState, useEffect } from 'react';
import {
  InstantSearch,
  Configure,
} from 'react-instantsearch';
import { RangeSlider } from './components/RangeSlider';
import { CustomInfiniteHits } from './components/CustomInfiniteHits'; 
import { CustomRefinementList } from './components/CustomRefinementList';
import Navbar from './components/layout/Navbar';
import ImageSwitcher from './components/ImageSwitcher';

const searchClient = algoliasearch('U946D7MO9Z', 'cde579fe8dcf400a140921608390b7ac')

const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const [imageSwitchEnabled, setImageSwitchEnabled] = useState(false);

  useEffect(() => {
    const isImageSwitchEnabled = localStorage.getItem('imageSwitchEnabled') === 'true';
    setImageSwitchEnabled(isImageSwitchEnabled);
  }, [language]);

  const toggleImageSwitching = (enabled: boolean) => {
    setImageSwitchEnabled(enabled);
    localStorage.setItem('imageSwitchEnabled', enabled.toString());
  };


  return (
    <>
      <div className="font-mono bg-custom-bg">
        <InstantSearch searchClient={searchClient} indexName="pokemon">
          <Configure hitsPerPage={12}></Configure>
          <Navbar language={language} setLanguage={setLanguage} />
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row">
              <div className="lg:w-1/4 pr-8 pb-8 w-fit-content">
                <div className="text-lg">
                  <div className="pt-4 font-semibold">
                    <ImageSwitcher initialEnabled={imageSwitchEnabled} onChange={toggleImageSwitching} />
                  </div>
                  <p className="pt-5 pb-2 font-semibold"> Type </p>
                  <CustomRefinementList
                    attribute="type"
                    showMore={true}
                    showMoreLimit={20}
                  />
                  <p className="pt-5 pb-2 font-semibold"> Game versions </p>
                  <CustomRefinementList
                    attribute="game_versions"
                    showMore={true}
                    showMoreLimit={20}
                  />
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
              <div className="lg:w-3/4">
                <div className="my-4">
                  <div className='flex justify-center'>
                    <CustomInfiniteHits language={language} imageSwitchEnabled={imageSwitchEnabled} toggleImageSwitching={toggleImageSwitching} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </>
  );

}

export default App;

