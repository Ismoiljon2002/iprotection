import React, { useState } from 'react';
import { sharedImages } from '../../utils/sharedImages';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function BirdaModalComponent({ show = false, setShow = () => {} }) {
  const { t } = useTranslation();
  const steps = ['birdaModal.step1', 'birdaModal.step2', 'birdaModal.step3'];
  return (
    <div
      className={`modal registration-type-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='text-center'>
          <img src={sharedImages.birda} alt='birda' />
          <h3>{t('birdaModal.title')}</h3>
          <p>{t('birdaModal.description')}</p>
        </div>

        <ul>
          {steps.map((step, i) => (
            <li key={step}>
              {' '}
              <span>{i + 1}</span> {t(step)}
            </li>
          ))}
        </ul>

        <a href='#'>
          <Button variant='primary'>{t('birdaModal.gotoSite')}</Button>
        </a>
      </div>
    </div>
  );
}

export function MyGovModalComponent({ show = false, setShow = () => {} }) {
  const { t } = useTranslation();
  const steps = [
    'myGovModal.step1',
    'myGovModal.step2',
    'myGovModal.step3',
    'myGovModal.step4'
  ];
  return (
    <div
      className={`modal registration-type-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='text-center'>
          <img src={sharedImages.myGov} alt='myGov' />
          <h3>{t('myGovModal.title')}</h3>
          <p>{t('myGovModal.description')}</p>
        </div>

        <ul>
          {steps.map((step, i) => (
            <li key={step}>
              {' '}
              <span>{i + 1}</span> {t(step)}
            </li>
          ))}
        </ul>

        <a href='#'>
          <Button variant='primary'>{t('myGovModal.gotoSite')}</Button>
        </a>
      </div>
    </div>
  );
}

export function OperatorModalComponent({ show = false, setShow = () => {} }) {
  const { t } = useTranslation();
  const [isLocals, setIsLocals] = useState(true);

  const stepsForForeigners = [
    'operatorModal.stepForForeigners1',
    'operatorModal.stepForForeigners2',
    'operatorModal.stepForForeigners3',
    'operatorModal.stepForForeigners4',
    'operatorModal.stepForForeigners5'
  ];

  const stepsForLocals = [
    'operatorModal.stepForLocals1',
    'operatorModal.stepForLocals2',
    'operatorModal.stepForLocals3',
    'operatorModal.stepForLocals4'
  ];

  return (
    <div
      className={`modal registration-type-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='text-center'>
          <img src={sharedImages.operator} alt='Operatorlar' />
          <h3>{t('operatorModal.title')}</h3>
          <p>{t('operatorModal.descriptionLocals')}</p>
        </div>

        <ButtonGroup>
          <Button
            variant={isLocals ? 'success' : 'light'}
            onClick={() => setIsLocals(true)}
          >
            {t('operatorModal.localsButton')}
          </Button>
          <Button
            variant={isLocals ? 'light' : 'success'}
            onClick={() => setIsLocals(false)}
          >
            {t('operatorModal.foreignersButton')}
          </Button>
        </ButtonGroup>

        <ul>
          {isLocals
            ? stepsForLocals.map((step, i) => (
                <li key={step}>
                  {' '}
                  <span>{i + 1}</span> {t(step)}
                </li>
              ))
            : stepsForForeigners.map((step, i) => (
                <li key={step}>
                  {' '}
                  <span>{i + 1}</span> {t(step)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export function GmailModalComponent({ show = false, setShow = () => {} }) {
  const { t } = useTranslation();
  return (
    <div
      className={`modal registration-type-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='text-center'>
          <img src={sharedImages.gmail} alt='gmail' />
          <h3>{t('gmailModal.title')}</h3>
          <p>{t('gmailModal.description')}</p>
        </div>

        <p>{t('gmailModal.residents')}</p>
        <p>{t('gmailModal.nonResidents')}</p>
        <p>{t('gmailModal.stateless')}</p>
      </div>
    </div>
  );
}
