# Brand Color Palette

## Definitions

navy
: #01172d
: rgb(1, 23, 45)

tan
: #a17d51
: rgb(161, 125, 81)

beige
: #feeec2
: rgb(254, 238, 194)

gold
: #fca401
: rgb(252, 164, 1)

fire
: #f21701
: rgb(242, 23, 1)

grape
: #820263
: rgb(130, 2, 99)

## Tailwind Integration

### Tailwind Default Color Palette Names

- red
- orange
- amber
- yellow
- lime
- green
- emerald
- teal
- cyan
- sky
- blue
- indigo
- violet
- purple
- fuchsia
- pink
- rose
- slate
- gray
- zinc
- neutral
- stone
- black
- white

### Coolors.co Code

**The shading scale is the opposite of current Tailwind conventions, so they need to be reversed in order.**

```js
const colors = {
  'oxford_blue': {
    DEFAULT: '#01172d',
    100: '#000509',
    200: '#000912',
    300: '#010e1b',
    400: '#011224',
    500: '#01172d',
    600: '#034588',
    700: '#0574e3',
    800: '#49a2fb',
    900: '#a4d1fd',
  },
  'chamoisee': {
    DEFAULT: '#a17d51',
    100: '#201910',
    200: '#403220',
    300: '#604a30',
    400: '#806340',
    500: '#a17d51',
    600: '#b7966f',
    700: '#c9b193',
    800: '#dbcbb7',
    900: '#ede5db',
  },
  'peach': {
    DEFAULT: '#feeec2',
    100: '#584101',
    200: '#b18203',
    300: '#fbbd12',
    400: '#fdd66a',
    500: '#feeec2',
    600: '#fef2cf',
    700: '#fef5db',
    800: '#fff8e7',
    900: '#fffcf3',
  },
  'orange_(web)': {
    DEFAULT: '#fca401',
    100: '#332100',
    200: '#654201',
    300: '#986301',
    400: '#cb8401',
    500: '#fca401',
    600: '#feb734',
    700: '#fec967',
    800: '#fedb9a',
    900: '#ffedcc',
  },
  'off_red_(rgb)': {
    DEFAULT: '#f21701',
    100: '#310400',
    200: '#610900',
    300: '#920d01',
    400: '#c31101',
    500: '#f21701',
    600: '#fe3d2c',
    700: '#fe6e61',
    800: '#fe9e95',
    900: '#ffcfca',
  },
  'byzantium': {
    DEFAULT: '#820263',
    100: '#1a0014',
    200: '#340127',
    300: '#4e013b',
    400: '#68024f',
    500: '#820263',
    600: '#cd039a',
    700: '#fc20c5',
    800: '#fd6ad8',
    900: '#feb5ec',
  },
}
```

### `app.css`

Merge in:

```css
@theme {
  --color-navy: #01172d;
  --color-navy-100: #a4d1fd;
  --color-navy-200: #49a2fb;
  --color-navy-300: #0574e3;
  --color-navy-400: #034588;
  --color-navy-500: #01172d;
  --color-navy-600: #011224;
  --color-navy-700: #010e1b;
  --color-navy-800: #000912;
  --color-navy-900: #000509;

  --color-tan: #a17d51;
  --color-tan-100: #ede5db;
  --color-tan-200: #dbcbb7;
  --color-tan-300: #c9b193;
  --color-tan-400: #b7966f;
  --color-tan-500: #a17d51;
  --color-tan-600: #806340;
  --color-tan-700: #604a30;
  --color-tan-800: #403220;
  --color-tan-900: #201910;

  --color-beige: #feeec2;
  --color-beige-100: #fffcf3;
  --color-beige-200: #fff8e7;
  --color-beige-300: #fef5db;
  --color-beige-400: #fef2cf;
  --color-beige-500: #feeec2;
  --color-beige-600: #fdd66a;
  --color-beige-700: #fbbd12;
  --color-beige-800: #b18203;
  --color-beige-900: #584101;

  --color-gold: #fca401;
  --color-gold-100: #ffedcc;
  --color-gold-200: #fedb9a;
  --color-gold-300: #fec967;
  --color-gold-400: #feb734;
  --color-gold-500: #fca401;
  --color-gold-600: #cb8401;
  --color-gold-700: #986301;
  --color-gold-800: #654201;
  --color-gold-900: #332100;

  --color-fire: #f21701;
  --color-fire-100: #ffcfca;
  --color-fire-200: #fe9e95;
  --color-fire-300: #fe6e61;
  --color-fire-400: #fe3d2c;
  --color-fire-500: #f21701;
  --color-fire-600: #c31101;
  --color-fire-700: #920d01;
  --color-fire-800: #610900;
  --color-fire-900: #310400;

  --color-grape: #820263;
  --color-grape-100: #feb5ec;
  --color-grape-200: #fd6ad8;
  --color-grape-300: #fc20c5;
  --color-grape-400: #cd039a;
  --color-grape-500: #820263;
  --color-grape-600: #68024f;
  --color-grape-700: #4e013b;
  --color-grape-800: #340127;
  --color-grape-900: #1a0014;
}
```
