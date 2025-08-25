import React, { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

const HomePage = () => {
  useEffect(() => {
    // ... (el resto del useEffect se queda igual)

      const handleCheckout = async (title, price) => {
        try {
          const response = await fetch('/api', { // <-- CAMBIO AQUÍ
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title,
              price: price,
            }),
          });
          const preference = await response.json();
          window.location.href = preference.init_point;
        } catch (error) {
          console.error(error);
          alert('Error al crear la preferencia de pago');
        }
      };

    // ... (el resto del useEffect se queda igual)
  }, []);

  return (
    // ... (el resto del return se queda igual)
  );
};

export default HomePage;
