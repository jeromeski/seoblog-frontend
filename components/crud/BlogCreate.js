import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
// import { useRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = ({ router }) => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton
  } = values;

  const publishBlog = e => {
    e.preventDefault();
    console.log('ready to publishBlog');
  };

  const handleChange = name => e => {
    console.log(e.target.value);
  };

  const handleBody = name => e => {
    console.log(e.target.value);
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <div className='text-muted'>Title</div>
          <input type='text' className='form-control' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <ReactQuill
            value={body}
            placeholder='Write something here'
            onChange={handleBody}
          />
        </div>
        <div>
          <button type='submit' className='btn btn-primary'>
            Publish
          </button>
        </div>
      </form>
    );
  };
  return <div>{createBlogForm()}</div>;
};

export default withRouter(CreateBlog);
