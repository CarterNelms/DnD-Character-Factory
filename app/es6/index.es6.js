$(() => {
  $(document).on('click', "a[href='#']", e => {
    e.preventDefault();
  });
  System.import('app/main').catch((err) => { console.error(err); });
});