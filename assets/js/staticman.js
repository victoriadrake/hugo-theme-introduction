(function ($) {
  $('.page__comments-form').submit(function () {
    var form = this;

    $(form).addClass('disabled');
    $('button[type="submit"]:enabled').addClass('hidden'); // hide "submit"
    $('button[type="submit"]:disabled').removeClass('hidden'); // show "submitted"

    var endpoint = '{{ .endpoint | default "https://staticman-frama.herokuapp.com" }}';
    var gitProvider = '{{ .gitprovider }}';
    var repo = '{{ .repo }}';
    var branch = '{{ .branch }}';

    $.ajax({
      type: $(this).attr('method'),
      url: [endpoint, 'v3/entry', gitProvider, repo, branch, 'comments'].join('/'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showAlert('success');
        setTimeout(function(){ clearForm() }, 3000); // display success message for 3s
        $(form).disabled = false;
      },
      error: function (err) {
        console.log(err);
        showAlert('failed');
        $(form).disabled = false;
      }
    });

    return false;
  });

  function showAlert(msg) {
    if (msg == 'success') {
      $('.page__comments .submit-success').removeClass('hidden');  // show submit success message
      $('.page__comments .submit-failed').addClass('hidden'); // hide submit failed message
    } else {
      $('.page__comments .submit-success').addClass('hidden'); // hide submit success message
      $('.page__comments .submit-failed').removeClass('hidden');  // show submit failed message
    }
    $('button[type="submit"]:enabled').removeClass('hidden'); // show "submit"
    $('button[type="submit"]:disabled').addClass('hidden');  // hide "submitted"
  }

  function clearForm() {
    resetReplyTarget();
    $('.page__comments input')
      .filter(function() {
        return this.name.match(/^fields\[.*\]$/);
      })
      .val(''); // empty all text & hidden fields
    $('.page__comments textarea').val(''); // empty text area
    $('.page__comments .submit-success').addClass('hidden'); // hide submission status
    $('.page__comments .submit-failed').addClass('hidden'); // hide submission status
  }

  function resetReplyTarget() {
    $('.page__comments .reply-notice .reply-name').text(''); // reset reply target
    $('.page__comments .reply-notice img').remove(); // remove reply avatar
    $('.page__comments .reply-notice a').remove(); // remove '×' button
    $('.page__comments .reply-notice').addClass('hidden'); // hide reply target display
    $('.page__comments input[name="fields[replyThread]"]').val('');
    $('.page__comments input[name="fields[replyID]"]').val('');
    $('.page__comments input[name="fields[replyName]"]').val('');
  }

  // record reply target when "reply to this comment" is pressed
  $('.page__comments .comment').on('click', '.reply-btn', function (evt){
    resetReplyTarget();
    var cmt = $(evt.delegateTarget);
    $('.page__comments input[name="fields[replyThread]"]').val(this.title);
    $('.page__comments input[name="fields[replyID]"]').val(cmt.attr('id'));
    authorTag = cmt.find('.comment__author');
    replyName = authorTag.find('span[itemprop="name"]').text();
    $('.page__comments input[name="fields[replyName]"]').val(replyName);

    // display reply target avatar and name
    $('.page__comments .reply-notice').removeClass('hidden');
    $('.page__comments .reply-name').text(replyName);
    avatarTag = cmt.find('.comment__avatar');
    // use clone to avoid removal of avatar in comments by resetReplyTarget()
    $('.page__comments .reply-arrow').after(avatarTag.clone());
    // add button for removing reply target (static method would give error msg)
    closeBtn = $("<a class='close-btn'></a>");
    $('.page__comments .reply-notice').append(closeBtn);
  });

  // handle removal of reply target when '×' is pressed
  $('.page__comments .reply-notice').on('click', 'a.close-btn', function(){
    resetReplyTarget();
  });

  // clear form when reset button is clicked
  $('.page__comments input[type="reset"]').click(function (){
    clearForm();
  });
})(jQuery);
