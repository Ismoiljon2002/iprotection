import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { sharedImages } from '../../utils/sharedImages';

function NotFoundModalComponent({
  show = true,
  setShow = () => {},
  setShowRegister = () => {}
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`modal error-modal ${show ? 'show' : ''}`}
      onClick={() => setShow(false)}
    >
      <div
        className='modal-content text-center'
        onClick={(e) => e.stopPropagation()}
      >
        <img src={sharedImages.icons.tickIcon} alt='exclamation-mark' />
        <h3>{t('notFoundModal.title')}</h3>
        <p>{t('notFoundModal.description')}</p>
        <Button
          className='modal-btn'
          onClick={() => setShowRegister()}
          variant='primary'
        >
          {t('notFoundModal.button')}
        </Button>
      </div>
    </div>
  );
}

export default NotFoundModalComponent;
