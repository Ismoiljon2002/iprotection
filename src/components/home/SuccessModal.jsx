import React from 'react';
import { sharedImages } from '../../utils/sharedImages';
import { Trans, useTranslation } from 'react-i18next';

function SuccessModalComponent({
  show = false,
  setShow = () => {},
  data = {}
}) {
  const { t } = useTranslation();
  return (
    <div
      className={`modal success-modal ${show && 'show'}`}
      onClick={() => setShow(false)}
    >
      <div
        className='modal-content text-center'
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{data?.product}!</h2>
        <img src={sharedImages.icons.exclamationIcon} alt='tick' />
        <h4>IMEI-kod: {data?.imei}</h4>
        <b className='mb-2'>{t('successModal.imeiInfo')}</b>

        <p>{t('successModal.imeiDescription')}</p>

        <b className='fs-5'>
          <Trans i18nKey='successModal.trustedPurchase'>
            Ishonchli va kafolatlangan smartfonlarni faqat
            <a className='text-primary' href='https://asaxiy.uz'>
              Asaxiy.uz
            </a>
            dan xarid qiling!
          </Trans>
        </b>
      </div>
    </div>
  );
}

export default SuccessModalComponent;
