import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import Image from 'next/image';
import { useState } from 'react';

import styles from './styles';

const FAQ_CONTENTS = [
  {
    title: '手数料はいくらですか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
  {
    title: '操作方法は難しくありませんか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
  {
    title: '既存の予約システムと連動できますか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
  {
    title: '患者さんの支払い方法は、どのような仕組みですか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
  {
    title: '次回予約はどうすればいいですか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
  {
    title: 'どんな院が選ばれやすいですか？',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  },
];

const FAQ = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const isMobile = useBreakpoint({});
  return (
    <Box component="section" sx={styles.faqWrapper}>
      <Stack sx={{ maxWidth: 1000, margin: 'auto' }} alignItems="center">
        <Box sx={styles.sectionImage}>
          <Image src="/images/faq_img.png" alt="" fill />
        </Box>
        <Typography
          variant="title"
          color="secondary.main"
          fontSize={32}
          mb={{ xs: 51, tablet: 61 }}
        >
          利用方法
        </Typography>
        <Box sx={styles.flowImaage}>
          <Image
            src={
              isMobile
                ? '/images/manipulator_flow_mobile.png'
                : '/images/manipulator_flow_pc.png'
            }
            alt="Flow img"
            fill
          />
        </Box>
        <Typography
          variant="title"
          color="secondary.main"
          fontSize={32}
          mb={{ xs: 39, tablet: 68 }}
        >
          よくあるご質問
        </Typography>
        <Stack>
          {FAQ_CONTENTS.map((context, index) => {
            return (
              <Stack
                key={index}
                sx={styles.faqItem}
                onClick={() => {
                  if (checked.includes(index)) {
                    setChecked(checked.filter((i) => i !== index));
                  } else {
                    setChecked([...checked, index]);
                  }
                }}
              >
                <Typography
                  sx={styles.questionTitle}
                  color="black"
                  fontWeight="bold"
                >
                  {context.title}
                  {checked.includes(index) ? (
                    <RemoveIcon className="end-icon" />
                  ) : (
                    <AddIcon className="end-icon" />
                  )}
                </Typography>
                <Collapse
                  in={checked.includes(index)}
                  sx={styles.answerContent}
                >
                  {context.content}
                </Collapse>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default FAQ;
