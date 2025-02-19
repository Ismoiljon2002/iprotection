import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import formatPhoneNumber, {
  deformatPhoneNumber
} from '../../utils/helpers/formatPhoneNumber';
import useStore from '../../store';
import useRegisterImei from '../../hooks/useRegisterImei';
import { toast } from 'react-toastify';

function RegisterUserModal({ show, setShow, setShowRegisterImei }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('+998');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTime, setResendTime] = useState(120);
  const { customer, setCustomer, seller, setSeller } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    resetField
  } = useForm();

  const { sendOtpMutation, verifyOtpMutation } = useRegisterImei();

  const submitForm = (formData) => {
    const updateUser = (setUser, user, userKey, isUserVerified) => {
      if (!user && !isOtpSent) {
        if (
          userKey === 'customer' &&
          deformatPhoneNumber(phone) === seller.sellerPhone
        ) {
          toast.error(t('registerUserModal.phoneMismatch'));
          return;
        }
        setOtp('');

        sendOtpMutation.mutate(deformatPhoneNumber(phone), {
          onSuccess: (data) => {
            if (data.status) {
              toast.success(data.message);
              setIsOtpSent(true);
              setResendTime(120);
              setUser({
                [`${userKey}Name`]: formData.name,
                [`${userKey}Surname`]: formData.surname,
                [`${userKey}Phone`]: deformatPhoneNumber(phone)
              });
            } else {
              toast.error(data.message);
            }
          },
          onError: (error) => {
            toast.error(error);
          }
        });
      } else if (user && isOtpSent) {
        setOtp('');
        verifyOtpMutation.mutate(
          {
            phone: deformatPhoneNumber(phone),
            otp: +otp
          },
          {
            onSuccess: (data) => {
              if (data.status) {
                setUser({
                  ...user,
                  [`${isUserVerified}`]: true
                });
                setOtp('');
                setResendTime(120);
                resetForm();

                if (userKey === 'customer') {
                  setShow(false);
                  setShowRegisterImei();
                }
              } else {
                toast.error(data.message);
                resetField('code');
                setOtp('');
              }
            },
            onError: () => {
              toast.error(t('registerUserModal.otpIncorrect'));
              setOtp('');
            }
          }
        );
      }
    };

    if (seller?.isSellerVerified) {
      updateUser(setCustomer, customer, 'customer', 'isCustomerVerified');
    } else {
      updateUser(setSeller, seller, 'seller', 'isSellerVerified');
    }
  };

  const resetForm = () => {
    setIsOtpSent(false);
    setResendTime(120);
    setOtp('');
    reset();
    setPhone('+998');
  };

  function formatCode(input) {
    let value = input.replace(/[^\d]/g, '');
    if (value.length > 6) value = value.substring(0, 6);
    return value;
  }

  const isFormInvalid = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const { name, phone: inputPhone, surname, code } = getValues();

    return isOtpSent
      ? phone.length < 17 || !code || hasErrors
      : phone.length < 17 || !name || !inputPhone || !surname || hasErrors;
  };

  const sendOtp = () => {
    sendOtpMutation.mutate(deformatPhoneNumber(phone), {
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data.message);
          setIsOtpSent(true);
          setResendTime(120);
          setOtp('');
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        toast.error(error);
      }
    });
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
          <h3>{t('registerUserModal.title')}</h3>
          <p className='subtitle'>
            {seller?.isSellerVerified
              ? t('registerUserModal.subtitle_customer')
              : t('registerUserModal.subtitle_seller')}
          </p>

          {!isOtpSent && (
            <>
              <Form.Group>
                <Form.Label htmlFor='name'>{t('register.name')}</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder={t('register.namePlaceholder')}
                  disabled={isOtpSent}
                  {...register('name', {
                    required: t('register.namePlaceholder')
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='surname'>
                  {t('register.surname')}
                </Form.Label>
                <Form.Control
                  type='text'
                  name='surname'
                  placeholder={t('register.surnamePlaceholder')}
                  disabled={isOtpSent}
                  {...register('surname', {
                    required: t('register.surnamePlaceholder')
                  })}
                />
              </Form.Group>
            </>
          )}

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
                <Form.Label htmlFor='code'>{t('register.code')}</Form.Label>
                <Form.Control
                  type='number'
                  name='code'
                  maxLength={20}
                  placeholder={t('register.codePlaceholder')}
                  disabled={!isOtpSent}
                  value={otp}
                  {...register('code', {
                    minLength: 6,
                    onChange: (e) => setOtp(formatCode(e.target.value))
                  })}
                />
              </Form.Group>
              <p className='resend'>
                {t('register.resend')}{' '}
                <span>
                  {resendTime ? (
                    resendTime
                  ) : (
                    <span onClick={sendOtp}> {t('register.resendNow')} </span>
                  )}
                </span>
              </p>
            </>
          )}

          <Button
            variant='primary'
            disabled={isFormInvalid()}
            type='submit'
            className={isFormInvalid() && 'disabled'}
          >
            {!isOtpSent ? t('register.submit') : t('register.verify')}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterUserModal;
