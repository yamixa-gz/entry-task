import React, { Component } from 'react';
import s from './scss/Footer.module.scss';
import github from '../../assets/images/Footer/github.svg';
import dribbble from '../../assets/images/Footer/dribbble.svg';
import facebook from '../../assets/images/Footer/facebook.svg';

class Footer extends Component {
  author = 'Заниздра Михаил'

  githubLink = 'https://github.com/yamixa-gz'

  dribbbleLink = 'https://dribbble.com/shots/14853858-Medisch-Dentist/attachments/6563646?mode=media'

  facebookLink = 'https://www.facebook.com/profile.php?id=100057592029603'

  render() {
    return (
      <footer className={s.footer}>
        <div className={s.footerContainer}>
          <div className={s.footerWrapper}>
            <div className={s.footerContent}>
              <div className={s.footerAuthor}>{this.author}</div>
              <div className={s.footerLinks}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="git"
                  href={this.githubLink}
                >
                  <img src={github} alt="github" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="dribble"
                  href={this.dribbbleLink}
                >
                  <img src={dribbble} alt="dribbble" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="facebook"
                  href={this.facebookLink}
                >
                  <img src={facebook} alt="facebook" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
