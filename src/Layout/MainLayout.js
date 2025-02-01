import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './../Components/NavBar';
import Footer from '../Components/Footer';

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
              <Outlet /> {/* This will render the page components */}
            </main>
            <Footer />
            <ToastContainer />
        </>
      );
}
