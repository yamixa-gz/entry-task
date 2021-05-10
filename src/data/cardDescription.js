import uuid from 'react-uuid';
import vcs from '../assets/images/Description/cvs.png';
import git from '../assets/images/Description/git.png';
import css from '../assets/images/Description/css.png';
import html from '../assets/images/Description/html.png';
import nodejs from '../assets/images/Description/nodejs.png';
import npm from '../assets/images/Description/npm.png';

const cardDescription = [
  {
    id: uuid(),
    title: 'titleVcs',
    img: vcs,
    description: 'descriptionVcs',
  },
  {
    id: uuid(),
    title: 'titleGit',
    img: git,
    description: 'descriptionGit',
  },
  {
    id: uuid(),
    title: 'titleCss',
    img: css,
    description: 'descriptionCss',
  },
  {
    id: uuid(),
    title: 'titleHtml',
    img: html,
    description: 'descriptionHtml',
  },
  {
    id: uuid(),
    title: 'titleNodejs',
    img: nodejs,
    description: 'descriptionNodejs',
  },
  {
    id: uuid(),
    title: 'titleNpm',
    img: npm,
    description: 'descriptionNpm',
  },
];

export default cardDescription;
