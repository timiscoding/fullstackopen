const blogs = [
  {
    'likes': 5,
    'title': 'Flowers for Algernon',
    'author': 'Charlie Gordon',
    'url': 'http://algernon.com',
    'user': '5d367f2b2005ec2259122f69',
    'id': '5d36cc677606c140a937279e'
  },
  {
    'likes': 101,
    'title': 'toggleable',
    'author': 'works',
    'url': 'yay.com',
    'user': '5d367f2b2005ec2259122f69',
    'id': '5d424310a6d34f17842fab64'
  },
  {
    'likes': 23,
    'title': 'Enders Game',
    'author': 'Orson Scott Card',
    'url': 'http://ender.com',
    'id': '5d2bdec904c2f623ebf37638',
    'user': '5d367f2b2005ec2259122f69'
  },
];

const getAll = () => Promise.resolve(blogs);
const setToken = () => {};

export default { getAll, setToken };
