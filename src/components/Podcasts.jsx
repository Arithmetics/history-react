import React from 'react';
import Typography from '@material-ui/core/Typography';

const podLinks = [
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/950486572&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/944780236&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/941125048&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/923062666&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/898560145&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/894634978&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/894004897&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/892396993&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/784974346&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/719113078&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/767702575&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/731251336&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/699909673&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/698512171&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/686444299&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/693080377&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/683164164&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/509276781&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/501964623&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
];

function Podcasts() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Podcasts
      </Typography>
      {podLinks.map((podLink, i) => {
        return (
          <iframe
            key={podLink}
            title={`podcast-${i}`}
            width="50%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={podLink}
          />
        );
      })}
    </div>
  );
}

export default Podcasts;
