$(() => {
  $('select').select2({
    minimumResultsForSearch: -1
  });

  $('input').iCheck({
    checkboxClass: 'icheckbox_minimal-orange',
    radioClass: 'iradio_minimal-orange',
    increaseArea: '20%' // optional
  });

  // function formatData (data) {
  //   if (!data.id) {
  //     return data.text;
  //   }

  //   var text = data.text;
  //   if ($(data.element).attr('data-isofficial') === 'true') {
  //     // text = $('<span>' + text + ' <img style="height: 15px;padding-bottom:2px;" src="/lib/img/amp_icon.png"></span>');
  //   }

  //   return text;
  // };

  // $("#ability-scores-method").select2({
  //   templateResult: formatData,
  //   templateSelection: formatData
  // });

  var $abilityScoreMethod = $("#ability-scores-method");
  $abilityScoreMethod.on('change', () => {
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

  $('#abilities-table').DataTable( {
    "bLengthChange": false,
    "bSort": false,
    "processing": false,
    "serverSide": false,
    "dom": '<"clear">rt',
  } );
});