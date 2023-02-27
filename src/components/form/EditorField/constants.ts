const toolbar = [
  { name: 'history', items: ['undo', 'redo'] },
  { name: 'styles', items: ['styles'] },
  { name: 'formatting', items: ['bold', 'italic'] },
  {
    name: 'alignment',
    items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
  },
  { name: 'indentation', items: ['outdent', 'indent'] },
  { name: 'other', items: ['media', 'image', 'link'] }
];

const init = {
  width: '100%',
  plugins: 'lists link image media help',
  language: 'ru',
  automatic_uploads: true,
  branding: false
};

export { toolbar, init };
