import FacebookIcon from '@icons/facebook_icon.svg';
// import AddReservationSvg from '@icons/icon_add_reservation_green.svg';
import ListSvg from '@icons/icon_list.svg';
import MembershipSvg from '@icons/icon_membership.svg';
import ReservationSvg from '@icons/icon_reservation.svg';
import ScheduleSvg from '@icons/icon_schedule.svg';
import InstagramIcon from '@icons/instagram_icon.svg';
import TwitterIcon from '@icons/twitter_icon.svg';

import type { INavigation } from './type';

export const Regex = {
  PASSWORD_POLICY:
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@^_`{|}~\[\]]{8,}$/,
  KATAKANA: /^[ｧ-ﾝﾞﾟァ-・ヽヾ゛゜ー()-.（-）]+$/,
  FURAGANA: /^[゜ー()-.（-）\u3040-\u309f]+$/,
  // eslint-disable-next-line no-useless-escape
  URL: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
  PHONE: /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/,
  WHITESPACE: /\s/,
  EMAIL:
    // eslint-disable-next-line no-useless-escape, no-control-regex
    /[\s]{0,}((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))[\s]{0,}$/,
  JP_ZIPCODE:
    // eslint-disable-next-line no-useless-escape, no-control-regex
    /^〒?[0-9０-９]{3}[-－]?[0-9０-９]{4}$/,
};

export const DOCUMENT_TYPES = ['doc', 'docx', 'pdf', 'ping'];
export const IMAGE_TYPES = 'image/*';
export const ACCEPT_FILE_TYPES = `image/*, ${DOCUMENT_TYPES.join(', ')}`;
export const FILE_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
};
export enum DateFormat {
  MONTH_YEAR_SHORT = 'MM/YY',
  YEAR_MONTH_DATE = 'YYYY/MM/DD',
  YEAR_MONTH_DATE_DASH = 'YYYY-MM-DD',
  JP_YEAR_MONTH_DATE = 'YYYY年MM月DD日',
  YEAR_MONTH = 'YYYY/MM',
  YEAR_MONTH_DASH = 'YYYY-MM',
  YEAR_MONTH_DATE_HOUR = 'YYYY/MM/DD HH:mm',
  YEAR_MONTH_DATE_HOUR_DASH = 'YYYY-MM-DD HH:mm',
  HOUR_YEAR_MONTH_DATE = 'HH:mm YYYY-MM-DD',
  JP_YEAR_MONTH_DATE_HOUR = 'YYYY年MM月DD日 HH:mm',
  YEAR_MONTH_DATE_HOUR_MS = 'YYYY/MM/DD HH:mm:ss',
  JP_YEAR_MONTH_DATE_HOUR_MS = 'YYYY年MM月DD日（ddd）HH時mm分',
  JP_YEAR_MONTH_DATE_DAY = 'YYYY年MM月DD日（ddd）',
  JP_HOUR_MINUTE = 'HH時mm分',
  DOT_YEAR_MONTH_DATE = 'YYYY.MM.DD',
  YEAR_MONTH_DATE_AND_TIME = 'YYYY/MM/DD | HH:mm',
}

export const GENDER_TEXT = {
  MALE: '女性',
  FEMALE: '男性',
  UNANSWERED: '未回答',
};

export const PROVIDER_NAVIGATION: {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: INavigation[];
}[] = [
  {
    href: '/my-page/schedule',
    label: 'スケジュール',
    icon: <ScheduleSvg />,
  },
  {
    href: '/my-page/menu',
    label: 'メニュー管理',
    icon: <ListSvg />,
  },
  {
    href: '/my-page/profile',
    label: '会員情報',
    icon: <MembershipSvg />,
  },
  {
    href: '/my-page/reservation',
    label: '予約リスト',
    icon: <ReservationSvg />,
  },
  // {
  //   href: '/my-page/registration-reservation',
  //   label: '予約登録',
  //   icon: <AddReservationSvg />,
  // },
];

export const FOOTER_ITEMS = [
  {
    label: '利用規約',
    href: 'terms-of-service',
  },
  {
    label: 'プライバシーポリシー',
    href: 'privacy-policy',
  },
  {
    label: '運営会社',
    href: 'operating-company',
  },
  {
    label: 'お問い合わせ',
    href: 'inquiry',
  },
];

export const SOCIAL_MEDIA: {
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    href: '/instagram',
    icon: <InstagramIcon />,
  },
  {
    href: '/twitter',
    icon: <TwitterIcon />,
  },
  {
    href: '/facebook',
    icon: <FacebookIcon />,
  },
];

export const CITIES: {
  id: number | string;
  name: string;
}[] = [
  {
    id: 13,
    name: '東京都',
  },
];

export const WEEKDAYS_WORK_TIME: { id: number; name: string }[] = [
  {
    id: 0,
    name: '日',
  },
  { id: 1, name: '月' },
  { id: 2, name: '火' },
  { id: 3, name: '水' },
  { id: 4, name: '木' },
  { id: 5, name: '金' },
  { id: 6, name: '土' },
];

export const WORK_TIMES: string[] = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];

export const FEATURES_DATA: Record<
  string,
  {
    label: string;
    value: string;
    img: string;
  }
> = {
  '1': {
    label: '駅チカ',
    value: '1',
    img: '/images/feature1.webp',
  },
  '2': {
    label: '駐車場あり',
    value: '2',
    img: '/images/feature2.webp',
  },
  '3': {
    label: 'コロナ対策',
    value: '3',
    img: '/images/feature3.webp',
  },
  '4': {
    label: 'キッズスペースあり',
    value: '4',
    img: '/images/feature4.webp',
  },
  '5': {
    label: '子連れOK',
    value: '5',
    img: '/images/feature5.webp',
  },
  '6': {
    label: 'バリアフリー',
    value: '6',
    img: '/images/feature6.webp',
  },
  '7': { label: '女性専用', value: '7', img: '/images/feature7.webp' },
  '8': {
    label: '英語対応',
    value: '8',
    img: '/images/feature8.webp',
  },
};

export const MENU_STATUS = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};
export const MENU_STATUS_LIST = [
  {
    id: 'public',
    name: '掲載する',
  },
  {
    id: 'private',
    name: '掲載しない',
  },
];
export const MENU_TYPE = [
  {
    id: 'one_time',
    name: '単発',
  },
  // {
  //   id: 'coupon',
  //   name: '回数券',
  // },
];

export const AVAILABEL_STAFF = [
  { id: '1', name: '整体師 太郎' },
  { id: '2', name: 'スタッフ2' },
  { id: '3', name: 'スタッフ3' },
  { id: '4', name: 'スタッフ4' },
];

export const CURRENCY = {
  JPY: 'JPY',
};

export const MENU_INFO = {
  NAME: 'メニュー名',
  ORDER: '並び順（昇順で表示されます）',
  ORDER_SHORT: '並び順',
  ESTIMATED_TIME: '目安時間',
  DISPLAY_TIME: '表示しない',
  MENU_TYPE: 'メニュー種別',
  PRICE: '単発料金',
  COUPON_TIKET: '回数券料金',
  EXPIRATION_COUPON_DATE: '回数券の有効期限',
  PUBLISH_STATUS: '掲載状況',
  AVAILABEL_STAFF: '施術可能なスタッフを選択してください',
};

export const UNIT = {
  MINUTE: '分',
  SHEET: '枚', // for coupon, ticket
  YEN: '円',
  MONTH: 'ヶ月',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_LONG_FORMAT = 'LL HH:mm:ss';
export const GTM_JP = 'GMT+9';

export const RESERVATION_STATUS = {
  DONE: 'DONE',
  RESERVED: 'RESERVED',
};
