import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
// import { useRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getTags } from '../../actions/tag';
import { getCategories } from '../../actions/category';
import { createBlog } from '../../actions/blog';
import { Col, Container, Row } from 'reactstrap';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    e.preventDefault();
    console.log('ready to publishBlog');
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    // console.log(e.target.value);
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleToggle(c._id)}
            type='checkbox'
            className='mr-2'
          />
          <label htmlFor='' className='form-check-label'>
            {c.name}
          </label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleToggle(t._id)}
            type='checkbox'
            className='mr-2'
          />
          <label htmlFor='' className='form-check-label'>
            {t.name}
          </label>
        </li>
      ))
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <div className='text-muted'>Title</div>
          <input
            value={title}
            type='text'
            className='form-control'
            onChange={handleChange('title')}
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
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

  return (
    <Container className='fluid'>
      <Row>
        <Col md={8}>
          {createBlogForm()}
          <hr />
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(body)}
          <hr />
          {JSON.stringify(categories)}
          <hr />
          {JSON.stringify(tags)}
          <hr />
        </Col>
        <Col md={4}>
          <h5>Categories</h5>
          <hr />
          <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {showCategories()}
          </ul>
          <h5>Tags</h5>
          <hr />
          <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {showTags()}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(CreateBlog);
