import React from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
  const showBlogCategories = blog => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
      </Link>
    ));
  };
  const showBlogTags = blog => {
    return blog.categories.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</a>
      </Link>
    ));
  };
  return (
    <div className='lead pb-4'>
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a className='pt-3 pb-3 font-weight-bold'>{blog.title}</a>
        </Link>
      </header>
      <section>
        <p className='mark ml-1 pt-2 pb-2'>
          Written by {blog.postedBy.name} | Published{' '}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br></br>
        <br></br>
        <h4 />
      </section>
      <div className='row'>
        <div className='col-md-4'>image</div>
        <div className='col-md-8'>
          <section>
            <div className='pb-3'>{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className='btn btn-primary mt-2'>Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
