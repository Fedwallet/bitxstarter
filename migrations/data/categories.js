'use strict';

module.exports = [

  { name: 'Art' },
  { name: 'Comics' },
  { name: 'Dance' },
  { name: 'Design' },
  { name: 'Fashion' },
  { name: 'Film & Video' },
  { name: 'Food' },
  { name: 'Games' },
  { name: 'Music' },
  { name: 'Photography' },
  { name: 'Publishing' },
  { name: 'Technology' },
  { name: 'Theater' },

  { name: 'Conceptual Art',   parent_id: 1 },
  { name: 'Crafts',           parent_id: 1 },
  { name: 'Digital Art',      parent_id: 1 },
  { name: 'Illustration',     parent_id: 1 },
  { name: 'Painting',         parent_id: 1 },
  { name: 'Performance Art',  parent_id: 1 },
  { name: 'Mixed Media',      parent_id: 1 },
  { name: 'Public Art',       parent_id: 1 },
  { name: 'Sculpture',        parent_id: 1 },

  { name: 'Graphic Design',   parent_id: 4 },
  { name: 'Product Design',   parent_id: 4 },

  { name: 'Animation',        parent_id: 6 },
  { name: 'Documentary',      parent_id: 6 },
  { name: 'Narrative Film',   parent_id: 6 },
  { name: 'Short Film',       parent_id: 6 },
  { name: 'Webseries',        parent_id: 6 },

  { name: 'Tabletop Games',   parent_id: 8 },
  { name: 'Video Games',      parent_id: 8 },

  { name: 'Classical Music',  parent_id: 9 },
  { name: 'Country & Folk',   parent_id: 9 },
  { name: 'Electronic Music', parent_id: 9 },
  { name: 'Hip-Hop',          parent_id: 9 },
  { name: 'Indie Rock',       parent_id: 9 },
  { name: 'Jazz',             parent_id: 9 },
  { name: 'Metal',            parent_id: 9 },
  { name: 'Pop',              parent_id: 9 },
  { name: 'Rock',             parent_id: 9 },
  { name: 'World Music',      parent_id: 9 },

  { name: 'Art Book',         parent_id: 11 },
  { name: 'Children\'s Book', parent_id: 11 },
  { name: 'Fiction',          parent_id: 11 },
  { name: 'Journalism',       parent_id: 11 },
  { name: 'Nonfiction',       parent_id: 11 },
  { name: 'Periodical',       parent_id: 11 },
  { name: 'Poetry',           parent_id: 11 },
  { name: 'Radio & Podcast',  parent_id: 11 },

  { name: 'Hardware',         parent_id: 12 },
  { name: 'Open Software',    parent_id: 12 },

].map(function (v, i) {
  v.id = i + 1;
  return v;
});
