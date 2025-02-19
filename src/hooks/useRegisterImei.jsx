import { useQuery, useMutation } from '@tanstack/react-query';
import API from '../utils/API';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useRegisterImei = () => {
  const { data: brands, error: brandsError } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    refetchInterval: 600000
  });

  useEffect(() => {
    if (brandsError) {
      toast.error('Brands yuklanishda xatolik yuz berdi');
    }
  }, [brandsError]);

  async function getBrands() {
    const response = await API.get('/imei/brand-list');
    return response.data;
  }

  async function sendOtp(phone) {
    const response = await API.post('/auth/send-otp', { phone });
    return response.data;
  }
  async function verifyOtp(phone, otp) {
    const response = await API.post('/auth/check-otp', {
      phone,
      otp: +otp
    });
    return response.data;
  }

  async function registerImei(imeiData) {
    const response = await API.post('/auth/register-imei', imeiData);
    return response.data;
  }

  const sendOtpMutation = useMutation({
    mutationFn: (number) => sendOtp(number)
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ phone, otp }) => verifyOtp(phone, otp)
  });

  const registerImeiMutation = useMutation({
    mutationFn: (data) => registerImei(data)
  });

  return {
    brands,
    sendOtpMutation,
    verifyOtpMutation,
    registerImeiMutation
  };
};

export default useRegisterImei;
