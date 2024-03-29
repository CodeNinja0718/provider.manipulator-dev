import { motion } from 'framer-motion';
import * as React from 'react';

import FadeMotion, { fadeInUp } from './FadeMotion';

const SvgSquareLogo = (props: any) => (
  <FadeMotion>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74.7 75"
      {...props}
      style={{ overflow: 'auto' }}
    >
      {/* Wa Container */}
      <motion.g variants={fadeInUp}>
        <motion.path
          fill="#f0c9d4"
          d="M34 26.4V10.8c0-4.4-3.5-7.9-7.9-7.9H10.5c-4.4 0-7.9 3.5-7.9 7.9v15.6c0 4.4 3.5 7.9 7.9 7.9h15.6c4.4 0 7.9-3.5 7.9-7.9Z"
        />
        {/* Wa word */}
        <motion.path
          fill="#fff"
          d="M21.9 12.8c-4.3-.1-7.3 2.4-8.5 3.6V9.2h-2.3v4.3H7.5v1.4h3.6v3.4s-3.2 3-4.6 4.8c.6.8 1.4 1.9 1.4 1.9s1.3-2 3.2-4.3v6.5h2.3v-8.9c1.2-1.4 4.5-3.7 8-3.7 2.3 0 4.9 1.4 4.9 4.8 0 8.3-6.8 8.8-9 9.2v1.2c3.1 0 12-.6 12-10.5-.1-3.4-2.6-6.4-7.4-6.5Z"
        />
      </motion.g>
      <motion.g variants={fadeInUp}>
        <motion.path
          fill="#bbc6d6"
          d="M38.4 25.2V9.1c0-5 4.1-9.1 9.1-9.1h18.1c5 0 9.1 4.1 9.1 9.1v18.2c0 5-4.1 9.1-9.1 9.1-8.2 0-19-.1-19-.1-5.7 0-10.3 4.6-10.3 10.3 0 0-.1 11-.1 19.3 0 5-4.1 9.1-9.1 9.1h-18c-5 0-9.1-4.1-9.1-9.1V47.8c0-5 4.1-9.1 9.1-9.1H28c5.7 0 10.3-4.6 10.3-10.3l.1-3.2Z"
        />
        {/** FuKu Word */}
        <motion.path
          fill="#fff"
          d="M23.1 67.9c-2.8-2.6-5-4.9-11-9.3-.3-.2-.7-.5-.9-.9-.2-.3-.3-.7-.3-1.1 0-1.1.9-1.9 1.5-2.5.7-.6 9.1-8.2 9.1-8.2l1.4 2.5c-2 1.5-5.5 3.8-9.7 7-.6.5-.7.6-.7 1.1 0 .4.5.6.5.6s5.4 3.1 6.3 3.8c1.3.9 4.4 3 5.6 4l-1.8 3ZM61.1 18.7c-2.1-.9-4.2-.7-5.8-.4-.8-.9-1.4-1.9-1.5-2.9-.3-3 4.1-3.8 4.8-3.9h.1l.4-1.4-8.8-2.4-.4 1.4 5.4 1.5c-2.5 1.6-4.9 4.5-2 8.6-3.4 1.4-6.4 3.5-9.6 6l1.7 2c1.9-2.2 3-3.1 4.5-4.2 1.4-1.1 2.8-2 4.2-2.7.1.1.1.2.2.2 1.4 1.5 1.9 3 2.1 4.2.2.8.2 1.8-.1 2.4-.3.5-.8.9-1.6 1.1-1.3.3-3.9-.4-5-1.5l-.6 1.1c1.4 1.4 4.2 2.4 6 2.2 1.9-.1 3.4-1.2 4.1-2.5.4-.9.5-2 .2-3.3-.4-1.9-2-3.5-3.4-5 1.1-.2 2.5-.3 3.7.4 1.9 1.1 3.5 3.7 3.9 7.7H67c-.4-4.4-2.5-7.1-5.9-8.6Z"
        />
      </motion.g>

      {/* Ru container */}
      <motion.g variants={fadeInUp}>
        <motion.path
          fill="#f0c9d4"
          d="M40 48.7V65c0 4.5 3.7 8.2 8.2 8.2h16.3c4.5 0 8.2-3.7 8.2-8.2V48.7c0-4.5-3.7-8.2-8.2-8.2H48.2c-4.5 0-8.2 3.7-8.2 8.2Z"
        />
        {/* Ru */}
        <motion.path
          fill="#fff"
          d="M61.3 66.8c2.3-1.1 3.6-3.5 3.6-5.9v-.7c-.3-3.5-3.9-5.5-7.1-5.5-3.5 0-5.7 1.4-5.7 1.4l8-7.7V47h-8.8v1.3h6l-11.4 11 1.3 1.7c1-.9 1.9-1.9 2.7-2.4 2.3-1.4 4.8-2.3 7.4-2.1 2.1.2 4.2 1.4 4.5 3.8.2 1.9-.6 4.1-2.1 5.2-.7.5-1.7.7-1.7.7h-.1c0-1.4-.2-2.7-1.1-3.8-1.8-2.2-6.9-2.6-7.2 1.1-.3 3.6 3.4 4.1 5 4.3.1.1 3.5.6 6.7-1ZM52 62.9c.4-.5.9-.7 1.6-.6 1.3.2 2.2 1.6 2.2 4.1-.5 0-.9 0-1.3-.1-.8-.1-1.4-.3-1.9-.6-.6-.4-1-1.4-.9-2 0-.3.1-.6.3-.8"
        />
      </motion.g>
    </svg>
  </FadeMotion>
);
export default SvgSquareLogo;
