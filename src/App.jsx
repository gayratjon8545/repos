import React, { useState, useEffect } from 'react';
import Form from './components/git';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import './App.css';
import BarChart from './components/BarChart';

function App() {
  const themeFromLocalStorage = () => localStorage.getItem('dark') || 'light';
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [theme, setTheme] = useState(themeFromLocalStorage);

  const getData = (userName) => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((user) => setUserData(user));

    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((repos) => setReposData(repos));
  };

  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='min-h-screen p-8  '>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold-800 loghoo'>devfinder</h1>
          <div>
            <label className='swap swap-rotate'>
              {/* This hidden checkbox controls the state */}
              <input type='checkbox' checked={theme === 'dark'} />

              {/* Sun icon */}

              <h1 className='swap-on'>LIGHT</h1>

              {/* Moon icon */}
              <h1 className='swap-off'>DARK</h1>
            </label>
          </div>
          <label className='swap swap-rotate'>
            {/* This hidden checkbox controls the state */}
            <input
              onClick={handleTheme}
              type='checkbox'
              checked={theme === 'dark'}
              readOnly
            />

            {/* Sun icon */}

            <IoMdSunny className='swap-on fill-current w-10 h-10' />

            {/* Moon icon */}
            <IoMdMoon className='swap-off fill-current w-10 h-10' />
          </label>
        </div>
        <Form getData={getData} />
        {userData && (
          <div className='flex justify-center'>
            <div className='mt-8 p-6  w-[795px] h-[419px]   shadow-md rounded-lg'>
              <div className='flex items-center  mb-6'>
                <div className='avatar mr-6'>
                  <div className='w-24  rounded-full ring ring-offset-base-100 ring-offset-2 ring-primary'>
                    <img src={userData.avatar_url} alt='User Avatar' />
                  </div>
                </div>
                <div>
                  <h2 className='text-2xl font-bold loghoo '>
                    {userData.login}
                  </h2>
                  <div className='flex justify-evenly items-center '>
                    {' '}
                    <h1 className='text-sm loghoo  '>Joined</h1>
                    <p className='font'>
                      {new Date(userData.created_at).toDateString()}
                    </p>
                  </div>

                  <p className='bio'>
                    {userData.bio || 'This profile has no bio'}
                  </p>
                </div>
              </div>

              <div className='card bg-base-100 w-96 shadow-xl'>
                <div className='card-body'>
                  <div className='card-actions justify-center'>
                    <div className='flex justify-around text-center gap-4'>
                      <div>
                        <h4 className='bio'>Repos</h4>
                        <p className=' loghoo '>{reposData.length}</p>
                      </div>
                      <div>
                        <h4 className='bio '>Followers</h4>
                        <p className=' loghoo '>{userData.followers}</p>
                      </div>
                      <div>
                        <h4 className=' bio'>Following</h4>
                        <p className=' loghoo '>{userData.following}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BarChart data={reposData} />
    </div>
  );
}

export default App;
