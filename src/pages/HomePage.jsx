import React, { useEffect, useState } from 'react';
import { Accordion, Button, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ErrorModalComponent from '../components/home/ErrorModal';
import NotFoundModalComponent from '../components/home/NotFoundModal';
import RegisterUserModal from '../components/home/RegisterUserModal';
import {
  BirdaModalComponent,
  GmailModalComponent,
  MyGovModalComponent,
  OperatorModalComponent
} from '../components/home/RegistrationTypeModal';
import SuccessModalComponent from '../components/home/SuccessModal';
import { sharedImages } from '../utils/sharedImages';
import RegisterImeiModal from '../components/home/RegisterImeiModal';
import API from '../utils/API';
import { useSearchParams } from 'react-router-dom';

const faqs = [
  { id: 1, title: 'faq.faq1Title', content: 'faq.faq1Content' },
  { id: 2, title: 'faq.faq2Title', content: 'faq.faq2Content' },
  { id: 3, title: 'faq.faq3Title', content: 'faq.faq3Content' },
  { id: 4, title: 'faq.faq4Title', content: 'faq.faq4Content' },
  { id: 5, title: 'faq.faq5Title', content: 'faq.faq5Content' },
  { id: 6, title: 'faq.faq6Title', content: 'faq.faq6Content' }
];

function HomePage() {
  const { t } = useTranslation();
  const [modals, setModals] = useState({
    success: false,
    error: false,
    notFound: false,
    birda: false,
    myGov: false,
    gmail: false,
    operator: false,
    registerUser: false,
    registerImei: false
  });
  const [data, setData] = useState({});
  const [imei, setIMEI] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      modals.success ||
      modals.error ||
      modals.notFound ||
      modals.registerUser ||
      modals.registerImei
    ) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [modals]);

  useEffect(() => {
    const initialImei = searchParams.get('imei');
    if (initialImei && initialImei.length === 15) {
      setIMEI(initialImei);
      checkIMEI(initialImei);
    } else if (
      (initialImei && initialImei.length < 15) ||
      (initialImei && initialImei.length > 15)
    ) {
      handleModal('error', true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIMEI(imei);
  };

  function checkIMEI(imeiToCheck) {
    if (imeiToCheck.length < 15) {
      handleModal('error', true);
      return;
    }

    setSearchParams({ imei: imeiToCheck });

    const toastId = toast.loading(t('home.loading'), { position: 'top-right' });
    API.get(`/imei/check?imei=${imeiToCheck}`)
      .then((res) => {
        if (res.data.status) {
          handleModal('success', true);
          setData(res.data.data[0]);
        } else {
          handleModal('notFound', true);
        }
      })
      .finally(() => toast.dismiss(toastId));
  }

  const formatIMEI = (input) => {
    let value = input.replace(/[^\d]/g, '');
    if (value.length > 15) value = value.substring(0, 15);
    return value;
  };

  const handleModal = (modalType, show) => {
    setModals((prev) => ({ ...prev, [modalType]: show }));
  };

  return (
    <Container>
      <section className='home__section'>
        <h1 className='main__text'>{t('home.checkRegistrationStatus')}</h1>
        <p className='home__text'>{t('home.checkRegistrationDescription')}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='search__form'>
            <Form.Control
              type='text'
              placeholder={t('home.enterImeiCode')}
              value={imei}
              onChange={(e) => {
                setIMEI(formatIMEI(e.target.value));
                setSearchParams({ imei: formatIMEI(e.target.value) });
              }}
              maxLength={15}
              minLength={15}
              required
            />
            <Button
              variant='primary'
              type='submit'
              className='submit__button-search'
            >
              {t('home.check')}
            </Button>
          </Form.Group>
        </Form>
      </section>

      <section className='registration-types'>
        <div className='text-center'>
          <h2>{t('home.registrationMethods')}</h2>
          <p>{t('home.descriptionMethods')}</p>
        </div>
        <div className='d-flex gap-4 flex-wrap mt-4'>
          {[
            {
              img: sharedImages.phone,
              url: 'https://asaxiy.uz/product/telefony-i-gadzhety/telefony/smartfony',
              modal: 'birda',
              title: t('home.phonesTitle'),
              desc: t('home.phonesContent')
            },
            {
              img: sharedImages.book,
              url: 'https://asaxiy.uz/product/knigi',
              modal: 'myGov',
              title: t('home.booksTitle'),
              desc: t('home.booksContent')
            },
            {
              img: sharedImages.techs,
              url: 'https://asaxiy.uz/product/bytovaya-tehnika',
              modal: 'operator',
              title: t('home.techsTitle'),
              desc: t('home.techsContent')
            },
            {
              img: sharedImages.discount,
              url: 'https://asaxiy.uz/discount/product',
              modal: 'gmail',
              title: t('home.discountTitle'),
              desc: t('home.discountContent')
            }
          ].map((item, idx) => (
            <div className='registration-type-card' key={idx}>
              <div className='d-flex justify-content-between align-items-start'>
                <img src={item.img} alt={item.title} />
                <a href={item.url} target='_blank' rel='noopener noreferrer'>
                  <Button
                    variant='light'
                    // onClick={() => handleModal(item.modal, true)}
                  >
                    <img src={sharedImages.arrowUpRight} alt='arrow' />
                  </Button>
                </a>
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='faq'>
        <h2>{t('faq.title')}</h2>
        <Accordion defaultActiveKey={1}>
          {faqs.map((faq) => (
            <Accordion.Item eventKey={faq.id} key={faq.id}>
              <Accordion.Header>{t(faq.title)}</Accordion.Header>
              <Accordion.Body>{t(faq.content)}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      <ErrorModalComponent
        show={modals.error}
        setShow={() => handleModal('error', false)}
      />
      <SuccessModalComponent
        show={modals.success}
        setShow={() => handleModal('success', false)}
        data={data}
      />
      <NotFoundModalComponent
        show={modals.notFound}
        setShow={() => handleModal('notFound', false)}
        setShowRegister={() => {
          handleModal('notFound', false);
          handleModal('registerUser', true);
        }}
      />
      <BirdaModalComponent
        show={modals.birda}
        setShow={() => handleModal('birda', false)}
      />
      <MyGovModalComponent
        show={modals.myGov}
        setShow={() => handleModal('myGov', false)}
      />
      <GmailModalComponent
        show={modals.gmail}
        setShow={() => handleModal('gmail', false)}
      />
      <OperatorModalComponent
        show={modals.operator}
        setShow={() => handleModal('operator', false)}
      />

      {/* Register Imei */}
      <RegisterUserModal
        show={modals.registerUser}
        setShow={() => handleModal('registerUser', false)}
        setShowRegisterImei={() => {
          handleModal('registerUser', false);
          handleModal('registerImei', true);
        }}
      />
      <RegisterImeiModal
        show={modals.registerImei}
        setShow={() => handleModal('registerImei', false)}
      />
      {/* <OtpModal
        show={modals.otp}
        setShow={() => handleModal('otp', false)}
        title={'IMEI ro’yxatdan o’tkazish'}
        subtitle={'Sizning ma’lumotlaringiz'}
      /> */}
    </Container>
  );
}

export default HomePage;
