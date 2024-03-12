import { useState } from 'react';

// import './Profile.css';
// import Home from './components/Home';
// import AboutMe from './components/AboutMe';
// import ContactMe from './components/ContactMe';
// import Project from './components/Project';

const arr = {
   'home': ['H1', 'H2'],
   'profile': ['P1', 'P2', 'P3'],
};

console.log(Object.entries(arr));

function CategoryImage(prop) {
   const [categoryTab, setProfileTab] = useState('home');
   return (
      <div className={'profile-wrapper'}>
         <div className="side-bar">
            <nav id="header__nav">
               <ul className="nav-list">
                  {/* {
                     arr.map((value, index) => {
                        return (
                           <li className={`nav-list__item ${profileTab === 'home' && 'active'}`}>
                              <a href="#home" onClick={() => setProfileTab('home')}>
                                 {value}
                              </a>
                           </li>
                        )
                     })
                  } */}
                  <li className={`nav-list__item ${profileTab === 'home' && 'active'}`}>
                     <a href="#home" onClick={() => setProfileTab('home')}>
                        Phòng khách
                     </a>
                  </li>
                  <li className={`nav-list__item ${profileTab === 'aboutMe' && 'active'}`}>
                     <a href="#aboutMe" onClick={() => setProfileTab('aboutMe')}>
                        Phòng ngủ
                     </a>
                  </li>
                  <li className={`nav-list__item ${profileTab === 'project' && 'active'}`}>
                     <a href="#project" onClick={() => setProfileTab('project')}>
                        Phòng bếp
                     </a>
                  </li>
                  <li className={`nav-list__item ${profileTab === 'contact' && 'active'}`}>
                     <a href="#contact" onClick={() => setProfileTab('contact')}>
                        Sân vườn
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
         <main
            style={{
               padding: '20px 0 0 20px',
               overflowY: 'auto',
               height: '100%',
               flex: 1,
            }}
         >
            {categoryTab === 'home' && <Home />}
            {categoryTab === 'aboutMe' && <AboutMe />}
            {categoryTab === 'project' && <Project />}
            {categoryTab === 'contact' && <ContactMe />}
         </main>
      </div>
   );
}

export default Profile;
