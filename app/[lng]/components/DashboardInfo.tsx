'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardInfo ({ lng }: { lng:string }) {
  const { user } = useAuth();
  console.log("language: ", lng);
  return(
    <div>user: {user?.username}</div>
  )
};

