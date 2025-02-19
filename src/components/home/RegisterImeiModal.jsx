import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { DateRangePicker } from 'rsuite';
import { CiCalendar } from 'react-icons/ci';
import useStore from '../../store';
import useRegisterImei from '../../hooks/useRegisterImei';

function RegisterImeiModal({ show, setShow }) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const { customer, seller } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();
  const { brands, registerImeiMutation } = useRegisterImei();

  const formValues = watch();

  const submitForm = (data) => {
    setIsLoading(true);
    const imeiData = {
      seller_name: seller.sellerName,
      seller_surname: seller.sellerSurname,
      seller_phone: seller.sellerPhone,
      customer_name: customer.customerName,
      customer_surname: customer.customerSurname,
      customer_phone: customer.customerPhone,
      brand_id: Number(data.model),
      name: data.name,
      ime11: data.imei1,
      ime12: data.imei2,
      started_at: format(data.range[0], 'dd.MM.yyyy'),
      expires_at: format(data.range[1], 'dd.MM.yyyy'),
      status: Number(data.status)
    };

    registerImeiMutation.mutate(imeiData, {
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data.data);
          setShow(false);
          reset();
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        toast.error(error);
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  const isFormInvalid = () => {
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) return true;

    if (!formValues.model) return true;
    if (!formValues.name) return true;
    if (!formValues.imei1) return true;
    if (formValues.imei1.length < 15 || formValues.imei1.length > 15)
      return true;
    if (!formValues.imei2) return true;
    if (formValues.imei2.length < 15 || formValues.imei2.length > 15)
      return true;
    if (!formValues.range || formValues.range.length === 0) return true;
    if (!formValues.status) return true;

    return false;
  };

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
          <h3>{t('registerImeiModal.title')}</h3>
          <p className='subtitle'>{t('registerImeiModal.subtitle')}</p>
          <Form.Group>
            <Form.Label htmlFor='model'>
              {t('registerImeiModal.model')}
            </Form.Label>
            <Form.Control
              as='select'
              name='model'
              disabled={isLoading}
              {...register('model', {
                required: t('registerImeiModal.registerImeiModal')
              })}
            >
              <option value=''>{t('registerImeiModal.select_model')}</option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name_uz}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='name'>
              {t('registerImeiModal.name')}
            </Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder={t('registerImeiModal.enter_name')}
              disabled={isLoading}
              {...register('name', {
                required: t('registerImeiModal.enter_name')
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='imei1'>
              {t('registerImeiModal.imei1')}
            </Form.Label>
            <Form.Control
              type='number'
              name='imei1'
              placeholder={t('registerImeiModal.enter_imei1')}
              minLength={15}
              maxLength={18}
              disabled={isLoading}
              {...register('imei1', {
                required: t('registerImeiModal.enter_imei1')
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='imei2'>
              {t('registerImeiModal.imei2')}
            </Form.Label>
            <Form.Control
              type='number'
              minLength={15}
              maxLength={18}
              name='imei2'
              placeholder={t('registerImeiModal.enter_imei2')}
              disabled={isLoading}
              {...register('imei2', {
                required: t('registerImeiModal.enter_imei2')
              })}
            />
          </Form.Group>
          <Form.Group className='form-item'>
            <Form.Label htmlFor='range'>
              {t('registerImeiModal.date_range')}
            </Form.Label>
            <DateRangePicker
              name='range'
              id='range'
              format='dd.MM.yyyy'
              caretAs={null}
              disabled={isLoading}
              onChange={(value) => setValue('range', value)}
            />
            <CiCalendar className='icon' size={24} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='status'>
              {t('registerImeiModal.status')}
            </Form.Label>
            <Form.Control
              as='select'
              name='status'
              disabled={isLoading}
              {...register('status', {
                required: t('registerImeiModal.select_status')
              })}
            >
              <option value=''>{t('registerImeiModal.select_status')}</option>
              <option value='1'>{t('registerImeiModal.status_1')}</option>
              <option value='2'>{t('registerImeiModal.status_2')}</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant='primary'
            disabled={isFormInvalid() || isLoading}
            type='submit'
            className={isFormInvalid() && 'disabled'}
          >
            {!isLoading
              ? t('registerImeiModal.submit')
              : t('registerImeiModal.verify')}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterImeiModal;
