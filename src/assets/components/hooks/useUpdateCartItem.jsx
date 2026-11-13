import axios from 'axios';
import React from 'react';
import authAxiosInstance from '../api/authAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const updateCartItem = async ({ productId, count }) => {
    const response = await authAxiosInstance.patch(`/Carts/${productId}`, { count });
    return response.data;
  };

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}