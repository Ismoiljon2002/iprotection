import React from 'react';
import { sharedImages } from '../../utils/sharedImages';
import { useTranslation } from 'react-i18next';

function ErrorModalComponent({ show = true, setShow = () => {} }) {
  const { t } = useTranslation();
  return (
    <div
      className={`modal error-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div
        className='modal-content text-center'
        onClick={(e) => e.stopPropagation()}
      >
        <img src={sharedImages.icons.exclamationIcon} alt='explamation-mark' />
        <h3>{t('errorModal.title')}</h3>

        <p>{t('errorModal.description')}</p>
      </div>
    </div>
  );
}

export default ErrorModalComponent;
