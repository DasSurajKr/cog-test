import { lazy } from 'react';

export const LandingPage = lazy(() => import('../pages/LandingPage'));
export const LoginPage = lazy(() => import('../pages/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/RegisterPage'));
export const UserDashboardPage = lazy(() => import('../pages/UserDashboardPage'));
export const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'));
export const ProductListingPage = lazy(() => import('../pages/ProductListingPage'));
export const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'));
export const CartPage = lazy(() => import('../pages/CartPage'));
export const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
export const OrderHistoryPage = lazy(() => import('../pages/OrderHistoryPage'));
export const ProfilePage = lazy(() => import('../pages/ProfilePage'));
export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
