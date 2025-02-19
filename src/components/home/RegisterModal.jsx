import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import formatPhoneNumber, {
  deformatPhoneNumber
} from '../../utils/helpers/formatPhoneNumber';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

function RegisterModal({ show, setShow }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('+998');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTime, setResendTime] = useState(120);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm();

  const submitForm = (data) => {
    if (isOtpSent) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          ...data,
          phone: deformatPhoneNumber(phone)
        })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.data);
            setShow(false);
            reset();
          } else {
            toast.error(res.data.message);
            setIsOtpSent(false);
            setResendTime(120);
          }
        });
    } else {
      setIsOtpSent(true);
      sendOtp();
    }
  };

  const sendOtp = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        phone: deformatPhoneNumber(phone)
      })
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message);
          setIsOtpSent(false);
          setResendTime(120);
          setOtp('');
        } else {
          setResendTime(120);
          setOtp('');
          toast.success('SMS yuborildi!');
        }
      });
  };

  function formatCode(input) {
    let value = input.replace(/[^\d]/g, '');
    if (value.length > 6) value = value.substring(0, 6);
    return value;
  }

  const isFormInvalid = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const { full_name, otp, phone: inputPhone } = getValues();
    return isOtpSent
      ? phone.length < 17 || !otp || !inputPhone || !full_name || hasErrors
      : phone.length < 17 || !full_name || !inputPhone || hasErrors;
  };

  useEffect(() => {
    if (resendTime > 0 && isOtpSent) {
      const timer = setInterval(() => {
        setResendTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) clearInterval(timer);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendTime, isOtpSent]);

  return (
    <div
      className={show ? 'login-modal show' : 'login-modal'}
      onClick={() => setShow(false)}
    >
      <div className='login-card' onClick={(e) => e.stopPropagation()}>
        <Button
          variant='light'
          className='btn-close'
          onClick={() => setShow(false)}
        >
          <IoClose size={22} />
        </Button>

        <Form onSubmit={handleSubmit(submitForm)}>
          <h3>{t('register.title')}</h3>
          <Form.Group>
            <Form.Label htmlFor='full_name'>{t('register.name')}</Form.Label>
            <Form.Control
              type='text'
              name='full_name'
              placeholder={t('register.namePlaceholder')}
              disabled={isOtpSent}
              {...register('full_name', {
                required: t('register.namePlaceholder')
              })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='phone'>{t('register.phone')}</Form.Label>
            <Form.Control
              type='tel'
              name='phone'
              maxLength={20}
              placeholder={t('register.phonePlaceholder')}
              disabled={isOtpSent}
              value={phone}
              {...register('phone', {
                required: t('register.phonePlaceholder'),
                minLength: 15,
                onChange: (e) => setPhone(formatPhoneNumber(e.target.value))
              })}
            />
          </Form.Group>

          {isOtpSent && (
            <>
              <Form.Group>
                <Form.Label htmlFor='otp'>Tasdiqlash kodi</Form.Label>
                <Form.Control
                  type='number'
                  name='otp'
                  maxLength={20}
                  placeholder={'SMS kodini kiriting'}
                  disabled={!isOtpSent}
                  value={otp}
                  {...register('otp', {
                    minLength: 6,
                    onChange: (e) => setOtp(formatCode(e.target.value))
                  })}
                />
              </Form.Group>
              <p className='resend'>
                Qayta yuborish{' '}
                <span>
                  {resendTime ? (
                    resendTime
                  ) : (
                    <span onClick={sendOtp}> Yuborish </span>
                  )}
                </span>
              </p>
            </>
          )}

          <Form.Group>
            <Form.Label htmlFor='company_name'>
              {t('register.company')}
            </Form.Label>
            <Form.Control
              type='text'
              name='company_name'
              placeholder={t('register.companyPlaceholder')}
              {...register('company_name')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='company_activity'>
              {t('register.activity')}
            </Form.Label>
            <Form.Control
              type='text'
              name='company_activity'
              placeholder={t('register.activityPlaceholder')}
              {...register('company_activity')}
            />
          </Form.Group>

          <Button
            variant='primary'
            disabled={isFormInvalid()}
            type='submit'
            className={isFormInvalid() && 'disabled'}
          >
            {!isOtpSent ? t('register.submit') : t('register.verify')}
          </Button>

          <p className='text-center text-muted link'>
            {t('register.accountPrompt')}{' '}
            <Link to='https://cabinet.iprotection.uz'>{t('header.login')}</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default RegisterModal;
