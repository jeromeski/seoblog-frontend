import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create } from '../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false
  });
  const { name, error, success, categories, removed } = values;
  const token = getCookie('token');

  const clickSubmit = e => {
    e.preventDefault();
    // console.log('create category');
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: '' });
      }
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      remove: ''
    });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input className='form-control' onChange={handleChange} />
        </div>
        <div>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </form>
    );
  };

  return <React.Fragment>{newCategoryForm()}</React.Fragment>;
};

export default Category;
