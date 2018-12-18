$(document).ready(function(){
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;

    $(form).addClass('disabled');

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        $('.page__comments-form .js-notice').removeClass('notice--danger');
        $('.page__comments-form .js-notice').addClass('notice--success');
        showAlert('Thanks for your comment! It will show on the site once it has been approved. .');

      },
      error: function (err) {
        console.log(err);
        $('.page__comments-form .js-notice').removeClass('notice--success');
        $('.page__comments-form .js-notice').addClass('notice--danger');
        showAlert('Sorry, there was an error with the submission!');
        $(form).removeClass('disabled');
      }
    });

    return false;
  });

  function showAlert(message) {
    $('.page__comments-form .js-notice').removeClass('hidden');
    $('.page__comments-form .js-notice-text').html(message);
  }

  $('.comment-reply-btn a').click(function (){
    $('input[name="fields[replyThread]"]').val(this.title);
    $('input[name="fields[replyID]"]').val(this.id);
    authorTag = $(this).parents('.js-comment').children('div.comment__content-wrapper').children('h3.comment__author');
    $('input[name="fields[replyName]"]').val(authorTag.text());
    $('.js-form fieldset button.button').text('Submit reply');
  });

  $('.js-form fieldset button[type="reset"]').click(function (){
    $('input[name="fields[replyThread]"]').val("");
    $('input[name="fields[replyID]"]').val("");
    $('input[name="fields[replyName]"]').val("");
    $('.js-form fieldset button.button').text('Submit');
  });

  // smooth scroll to different link anchor
  $('.comment-reply-target a[href^="#"]').click(function (){
    targetPostID = $(this).attr('href');
    targetID = "#" + $(targetPostID).parents('.js-comment').attr('id');
    $('html, body').animate({ scrollTop: $(targetID).offset().top }, 500);
  });
});
