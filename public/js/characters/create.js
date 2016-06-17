$(function() {
  $('select').select2({minimumResultsForSearch: -1});
  $('input').iCheck({
    checkboxClass: 'icheckbox_minimal-orange',
    radioClass: 'iradio_minimal-orange',
    increaseArea: '20%'
  });
  var $abilityScoreMethod = $("#ability-scores-method");
  $abilityScoreMethod.on('change', function() {
    var val = $abilityScoreMethod.select2('val'),
        rulesNA = true,
        method = abilityScoreMethods[val],
        assignment = method.assignment;
    var $assignment = $('#ability-assignment');
    if (assignment) {
      $assignment.hide();
    } else {
      $assignment.show();
      rulesNA = false;
    }
    $('.ability-scores-method-name').text(method.name);
    $('.ability-scores-method-description').text(method.description);
    $('#roll-abilities-btn').prop('disabled', !method.isRollable);
    $('#rules-na')[rulesNA ? 'show' : 'hide']();
  }).trigger('change');
  $('#abilities-table').DataTable({
    "responsive": true,
    "bLengthChange": false,
    "bSort": false,
    "processing": false,
    "serverSide": false,
    "dom": '<"clear">rt'
  });
});
