$(function() {
  console.log('Angular Begin...');
  System.import('app').catch(function(err) {
    console.error(err);
  });
});
