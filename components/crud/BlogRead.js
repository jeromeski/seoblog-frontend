import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { listRelated, removeBlog } from '../../actions/blog';

const BlogRead = () => {
  return (
    <React.Fragment>
      <p>update delete blog</p>
    </React.Fragment>
  );
};

export default BlogRead;
