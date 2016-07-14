$(function() {
  $(document).on('click', "a[href='#']", function(e) {
    e.preventDefault();
  });
  System.import('app/main').catch(function(err) {
    console.error(err);
  });
});
