import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './../Components/NavBar';
import Footer from '../Components/Footer';

export default function MainLayout() {
    return (
        <>
            <Navigation />
            <main className="flex-grow">
              <Outlet /> {/* This will render the page components */}
            </main>
            <Footer />
            <ToastContainer />
        </>
      );
}
