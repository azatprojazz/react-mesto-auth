import React from 'react';
import { Navigate } from 'react-router-dom';

// Компонент для защиты маршрутов, доступных только для авторизованных пользователей
// Принимает другой компонент в качестве пропса и может передать ему неограниченное число пропсов
const ProtectedRouteElement = ({ component: Component, ...props }) => {
  // Если пользователь авторизован, рендерит переданный компонент, иначе перенаправляет на страницу входа
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
