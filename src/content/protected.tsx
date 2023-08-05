import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let Login = localStorage.getItem('SessionToken');
    if (!Login) {
      navigate('/');
    }
    // else{
    //   //

    // }

  })
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected