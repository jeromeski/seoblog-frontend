import moment from 'moment';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, listRelated, removeBlog } from '../../actions/blog';

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete your blog?');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i}>
          <h3>{blog.title}</h3>
          <p className='mark'>
            Written by {blog.postedBy.name} | Published on{' '}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            className='btn btn-sm btn-danger'
            onClick={() => deleteConfirm(blog.slug)}>
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          {' '}
          <div className='col-md-12'>
            {message && <div className='alert alert-warning'>{message}</div>}
            {showAllBlogs()}
          </div>{' '}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
