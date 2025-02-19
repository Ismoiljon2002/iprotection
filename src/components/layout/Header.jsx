import { NavLink } from 'react-router-dom';
import { Accordion, Button, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { handleTop } from '../../utils/scrollToTop';
import { changeLang, defLang } from '../../utils/i18next';
import RegisterModal from '../home/RegisterModal';

import UzLang from '../../assets/images/lang/uz.svg';
import RuLang from '../../assets/images/lang/ru.svg';
import EnLang from '../../assets/images/lang/en.svg';

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeLang, setActiveLang] = useState(defLang);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isShowLang, setIsShowLang] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      setActiveLang(lang);
      changeLang(lang);
    }
  }, []);

  useEffect(() => {
    if (showRegisterModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [showRegisterModal]);

  const langList = (val) => {
    const langs = ['ru', 'uz', 'en'];

    return langs.map((item, index) => {
      if (activeLang !== item) {
        if (val === 'mobile') {
          return (
            <button
              key={index}
              className='accordion-link border-bottom lang__btn'
              id='btnLang'
              onClick={() => {
                changeLanguageHandler(item);
                setActiveMenu(!activeMenu);
              }}
            >
              <span className='lang-img'>
                <img
                  src={item === 'ru' ? RuLang : item === 'uz' ? UzLang : EnLang}
                  alt={`${item} lang`}
                />
              </span>
              {item === 'ru' ? 'Русский' : item === 'uz' ? "O'zbek" : 'English'}
            </button>
          );
        }
        if (val === 'desktop') {
          return (
            <NavDropdown.Item key={index}>
              <div className='custom-dropdown-inner'>
                <button
                  className='lang__btn'
                  onClick={() => {
                    changeLanguageHandler(item);
                  }}
                >
                  <img
                    src={
                      item === 'ru' ? RuLang : item === 'uz' ? UzLang : EnLang
                    }
                    alt={`${item} lang`}
                  />
                  {item === 'ru'
                    ? 'Русский'
                    : item === 'uz'
                      ? "O'zbek"
                      : 'English'}
                </button>
              </div>
            </NavDropdown.Item>
          );
        }
      }
      return null;
    });
  };

  const changeLanguageHandler = (val) => {
    changeLang(val);
    setActiveLang(val);
  };
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-white fixed-top'>
        <div className='container'>
          <div
            className={`nav__menu-backdrop ${activeMenu ? 'active' : ''}`}
            onClick={() => setActiveMenu(!activeMenu)}
          ></div>
          <div className={`nav__menu-mobile ${activeMenu ? 'active' : ''}`}>
            <div className='nav__menu-title'>
              <NavLink
                to='/'
                onClick={() => {
                  handleTop();
                  setActiveMenu(!activeMenu);
                }}
              >
                <img
                  src='https://asaxiy.uz/custom-assets/images/company/asaxiy-logo.svg'
                  alt='Asaxiy'
                />
              </NavLink>
            </div>
            <Accordion>
              <Accordion.Item eventKey='0' className='border-bottom'>
                <Accordion.Header>
                  <span className='lang-img'>
                    <img
                      src={
                        activeLang === 'ru'
                          ? RuLang
                          : activeLang === 'uz'
                            ? UzLang
                            : EnLang
                      }
                      alt={`${activeLang} lang`}
                    />
                  </span>{' '}
                  {activeLang === 'ru'
                    ? 'Русский'
                    : activeLang === 'uz'
                      ? "O'zbek"
                      : 'English'}
                </Accordion.Header>
                <Accordion.Body>{langList('mobile')}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Button
              className='login-btn'
              type='button'
              variant='primary'
              onClick={() => {
                setShowRegisterModal(true);
                setActiveMenu(!activeMenu);
              }}
            >
              {t('header.registration')}
            </Button>
          </div>
          <span
            className={`customnav-toggle ${activeMenu ? 'active' : ''}`}
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </span>{' '}
          <NavLink to='/' onClick={handleTop} className='navbar-brand'>
            <img
              src='https://asaxiy.uz/custom-assets/images/company/asaxiy-logo.svg'
              alt='Asaxiy'
            />
          </NavLink>
          <div className='navbar-nav'>
            <NavDropdown
              show={isShowLang}
              onMouseLeave={() => setIsShowLang(false)}
              onMouseOver={() => setIsShowLang(true)}
              title={
                <div className='custom-dropdown'>
                  <img
                    src={
                      activeLang === 'ru'
                        ? RuLang
                        : activeLang === 'uz'
                          ? UzLang
                          : EnLang
                    }
                    alt={`${activeLang} lang`}
                  />
                  <p>
                    {activeLang === 'ru'
                      ? 'Русский'
                      : activeLang === 'uz'
                        ? "O'zbek"
                        : 'English'}
                  </p>
                </div>
              }
              id='navbarScrollingDropdown'
            >
              {langList('desktop')}
            </NavDropdown>
            <Button
              type='button'
              variant='primary'
              onClick={() => setShowRegisterModal(true)}
            >
              {t('header.registration')}
            </Button>
          </div>
        </div>
      </nav>

      <RegisterModal show={showRegisterModal} setShow={setShowRegisterModal} />
    </>
  );
};

export default Header;
