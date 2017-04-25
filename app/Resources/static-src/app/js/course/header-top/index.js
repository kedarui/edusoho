import 'app/common/widget/qrcode';

let $unfavorite = $('.js-unfavorite-btn');
let $favorite = $('.js-favorite-btn');
bindOperation($unfavorite, $favorite);
bindOperation($favorite, $unfavorite);
discountCountdown();
ancelRefund();


function ancelRefund() {
	$(".cancel-refund").on('click', function () {
		if (!confirm('真的要取消退款吗？')) {
			return false;
		}
		$.post($(this).data('url'), function (data) {
			window.location.reload();
		});
	});
}

function bindOperation($needHideBtn, $needShowBtn) {
	$needHideBtn.click(() => {
		const url = $needHideBtn.data('url');
		console.log(url);
		if (!url) {
			return;
		}
		$.post(url)
			.done((success) => {
				if (!success) return;
				$needShowBtn.show();
				$needHideBtn.hide();
			});
	});
}

function discountCountdown() {
	var remainTime = parseInt($('#discount-endtime-countdown').data('remaintime'));
	if (remainTime >= 0) {
		var endtime = new Date(new Date().valueOf() + remainTime * 1000);
		$('#discount-endtime-countdown').countdown(endtime, function (event) {
      var $this = $(this).html(event.strftime(Translator.trans('course_set.show.count_down_format')));
		}).on('finish.countdown', function () {
			$(this).html(Translator.trans('活动时间到，正在刷新网页，请稍等...'));
			setTimeout(function () {
				$.post(app.crontab, function () {
					window.location.reload();
				});
			}, 2000);
		});
	}
}

$(".cancel-refund").on('click', function () {
	if (!confirm('course_set.refund_cancel_hint')) {
		return false;
	}

	$.post($(this).data('url'), function (data) {
		window.location.reload();
	});
});

