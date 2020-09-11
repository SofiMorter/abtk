var windowHeight = 0;
var footerPosition = 0;

$(function(){
	footerPosition = $('footer').offset().top;
	windowHeight = $(window).height();
	
	/*TRACKBARs*/
	$('.trackbar').each(function(){
		var _self = $(this);
		var min_val = parseFloat($(this).attr('data-min'));
		var max_val = parseFloat($(this).attr('data-max'));
		var _steep = parseFloat($(this).attr('data-steep'));
		
		var p_val = $(this).attr('data-val');
		var input_id='#'+$(this).attr('data-id');
		var val = parseFloat($(input_id).val());
		_self.slider({
		  range: "min",
		  min: min_val,
		  max: max_val,
		  value: val,
		  step:_steep,
		  slide: function( event, ui ) {
			$( input_id ).val( ui.value + ' ' + p_val );
		  },
		  change: function( event, ui ) {
			$( input_id ).trigger('change');
		  }, 
		}).each(function() {
			var el = $('<label>' + min_val + p_val + '</label>').css('left', (0) + '%');
			$(_self).append(el);
			el = $('<label>' + max_val + p_val + '</label>').css('right', (0) + '%');
			$(_self).append(el);

		});
		//$( input_id ).val( $( _self ).slider( "value" ) +  p_val);
		$( input_id ).keyup(function(){
			var val = parseFloat($(this).val());
			if(isNaN(val))
			{
				val = min_val;
			}
			$( _self ).slider("value", val);
		});
	});
	
	/*SELECT*/
	$("select").each(function(){
		$(this).selectmenu({
			position: {
				my: "left top", // default
				at: "left bottom", // default
				collision: "flip"  // default is ""
			}
		});
	});
	
	/*CAROUSEL*/
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		dots:false,
		itemsScaleUp:false,
		navText:[],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:6
			}
		}
	})
	
	$('.reviews-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		itemsScaleUp:false,
		navText:[],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
	
	$('.certificate-carousel').owlCarousel({
		loop:true,
		margin:50,
		nav:true,
		dots:false,
		itemsScaleUp:true,
		navText:[],
		responsive:{
			0:{
				items:1
			},
			1200:{
				items:2
			}
		}
	});
	
	$('a .fancybox').fancybox();
	
	/*
	$('.video-reviews-carousel').owlCarousel({
		loop:false,
		nav:true,
		dots:false,
		navText:[],
		items:2,
		margin:20
	});
	*/
	
	$('.q-slider').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		itemsScaleUp:false,
		navText:[],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
	$('.q-slider').on('change.owl.carousel', function(event) {
		$('.q-slider').find('.read-more').each(function(){
			if($(this).html() == 'Скрыть'){
				h	= $(this).attr('data-height');
				$(this).parent().find('.over').first().height(h);
				$(this).html('Читать полный ответ')
			}
		})
	})
	
	/**********************UP BUTTON*******************/
	checkUpBtn();
	$("#up-button").click(function(){
		$('html, body').animate({scrollTop: 0},500)
	});
	$(window).scroll(function(){
		checkUpBtn();		
	});
	
	$('.show-form').click(function(e){
		if($(this).attr('href') == "#order")
		{
			if($(this).attr('hideamount'))
			{
				$('#order .amount-container').hide();
				$('#order input[name=Text_Amount_r]').prop('disabled', true);
			}
			else
			{
				$('#order .amount-container').show();
				$('#order input[name=Text_Amount_r]').prop('disabled', false);
			}
			$('#additional-fields').empty();
			if($(this).closest('.footer-form').size() > 0)
			{
				//from bottom sticky form
				var form =  $(this).closest('.footer-form');
				var amount = form.find('input[name=Amount]').val();
				amount = parseInt(amount.replace(/ /g, ""));
				$('#order input[name=Text_Amount_r]').val(amount).attr('value', amount).change();
				var service = form.find('select[name=Service]').val();
				$('#order .title span').html(service);
				$('#order input[name=Text_Service]').val(service);
			}
			else if($(this).closest('.calculator-form').size() > 0)
			{
				//from calculator form
				var form =  $(this).closest('.calculator-form');
				var amount = form.find('input[name=Amount]').val();
				amount = parseInt(amount.replace(/ /g, ""));
				$('#order input[name=Text_Amount]').val(amount).attr('value', amount).change();
				var service = form.find('input[name=Service]').val();
				$('#order .title span').html(service);
				$('#order input[name=Text_Service]').val(service);
				
				form.find('input[type=text], input[type=hidden], input[type=checkbox]:checked, select').each(function(e, el){
					if($(this).attr('name') != 'Amount' && $(this).attr('name') != 'CalculatorType' && $(this).attr('name') != "Service")
					{
						if($(this).is('input'))
							$('#additional-fields').append('<input  type="hidden" name="Text_'+$(this).attr('name')+'" value="'+$(this).val()+'" />');
						else if($(this).is('select'))
							$('#additional-fields').append('<input  type="hidden" name="Select_'+$(this).attr('name')+'" value="'+$(this).val()+'" />');
					}
				});
			}
			else
			{
				//from index banner
				var service = $(this).attr('service');
				$('#order .title span').html(service);
				$('#order input[name=Text_Service]').val(service);
			}
		}
		
		ShowForm($(this).attr('href'));
		e.preventDefault();
	});
	
	$(".close").click(function(){
		currentForm.fadeOut(300,function(){
			$("#popup").fadeOut(300)
			currentForm=null;
		})
	});
	
	jQuery('a.colorbox').colorbox({rel:jQuery(this).attr('rel'),maxWidth: '96%',maxHeight: '96%'});

	/*MOBILE MENU*/
	$(".m-menu").click(function(e){
		e.preventDefault();
		var target = $($(this).attr('href'));
		if(target.css('display') == 'block')
			target.slideUp(300)
		else
			target.slideDown(300)
	});
	
	/*BANNERS CHANGE*/	
	var b = 0;
	var isAnimate = false;
	$("#banners-change").find('li').each(function(){
		
		if(b == 0){
			$(this).addClass('active');
			$($(this).find('a').first().attr('href')).css('display','block')
		}		
		
		$(this).find('a').first().click(function(e){
			e.preventDefault();
			if(isAnimate) return false;
			isAnimate = true;
			var old = $(this).parents('ul').find('.active').first();
			var target = $(this);
			target.parent().addClass('active')
			old.removeClass('active');
			$(old.find('a').first().attr('href')).fadeOut(300,function(){				
				$(target.attr('href')).fadeIn(300,function(){
					isAnimate = false;
				});				
			});
			initBannerInterval();
		})
		
		b++;
	});

	$("#banners-change").find('li').last().addClass('last')
	
	var bannerInterval;
	function initBannerInterval()
	{
		clearInterval(bannerInterval);
		
		bannerInterval = setInterval(function(){
			if(isAnimate) return false;
			isAnimate = true;
			
			var old = $("#banners-change").find('.active').first();
			if(old.hasClass('last'))
				var target = $("#banners-change").find('li').first()
			else
				var target = old.next();
			
			target.addClass('active')
			old.removeClass('active');
			
			$(old.find('a').first().attr('href')).fadeOut(300,function(){				
				$(target.find('a').first().attr('href')).fadeIn(300, function(){
					isAnimate = false;
				});				
			})
			
		},6000);
	}
	initBannerInterval();	
	
	/*SHOW MORE*/
	$(".show-target").click(function(e){
		e.preventDefault();
		
		$($(this).attr('href')).slideToggle(300);
		if($(this).html() == 'Показать ответ'){
			$(this).html('Скрыть')
		}else{
			$(this).html('Показать ответ')
		}
	})
	
	$(".show-full").click(function(e){
		e.preventDefault();
		over = $(this).parent().find('.over').first();
		var _self = $(this);
		var h	= $(this).attr('data-height');
		if(over.height() > h){			
			over.animate({height: h}, 300,function(){				
				_self.html('Читать полный ответ')
			});
		}else{
			curHeight = over.height(),
			autoHeight = over.css('height', 'auto').height();
			over.height(curHeight).animate({height: autoHeight}, 300,function(){
				_self.html('Скрыть')
			});
		}
	});
	
	$(".show-full").each(function(){
		var over = $(this).parent().find('.over').first();
		if(over.find('div.over-in').height() <= over.height())
		{
			$(this).remove();
		}
	});
	
	/*GREEN_FORM MOVE*/
	if($(document).find('.footer-form').length > 0){
		var ff = $(document).find('.footer-form').first();
		var h= ff.outerHeight(true);
		$('body').css({paddingBottom: h});
	}
	
	var actionClicked = false;
	$("#show-action").click(function(){
		actionClicked = true;
		if($(this).hasClass('opened')){
			$(this).parent().find('.inner').each(function(){
				$(this).hide({ direction: "right", easing: 'linear' }, 300);				
			})
			$(this).parent().animate({borderLeftWidth : 0},300)
			$(this).removeClass('opened');
			$(this).animate({left:-80},300)
		}else{	
			$(this).parent().find('.inner').each(function(){
				$(this).show({ direction: "right", easing: 'linear' }, 300);		
			});
			$(this).parent().animate({borderLeftWidth : 4},300)
			$(this).addClass('opened');
			$(this).animate({left:-84},300)
		}
	});
	setTimeout(function(){
		if(!actionClicked)
		{
			actionClicked = true;
			if(! $.cookie('showActionOnlyOne') ){
                $.cookie('showActionOnlyOne', 'showActionOnlyOne', { expires: 1 });
            	$("#show-action").click();
            }
		}
	}, 5000);
	
	$("#show-action").parent().find('.inner').each(function(){
		$(this).hide();				
	});
	$("#show-action").parent().css({borderLeftWidth : 0})
	$("#show-action").css({left:-80})
	
	$('form').append('<input required type="text" class="hidden" name="Empty" />');
});

function ShowForm(selector)
{
	$('.popup-form').hide();
	currentForm=$(selector);
	currentForm.css("top", Math.max(0, ((($(window).height() - currentForm.outerHeight()) / 2) + $(window).scrollTop())));
	if(currentForm.find('form').size() > 0)
	{
		currentForm.find('form')[0].reset();
	}
	$("#popup").fadeIn(300,function(){
		currentForm.fadeIn(300)
	})
}

function checkUpBtn(){
	footerPosition = $('footer').offset().top;
	if($(document).find('.footer-form').length>0)
		offset = $(document).find('.footer-form').first().outerHeight()
	else
		offset = 0;
	if($(window).scrollTop() + windowHeight > footerPosition){
		cur = $(window).scrollTop() + windowHeight - footerPosition;
		$("#up-button").css('bottom',cur+'px')
	}else
		$("#up-button").css('bottom',offset);

	
	if ( $(document).scrollTop() > 0 ) {
		$('#up-button').fadeIn('fast');
	} else {
		$('#up-button').fadeOut('fast');
	}
}

$(document).ready(function(){
	$(document).mouseup(function (e)
	{
	    var container = $(".location-selection");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0 
	        && !$('.location').is(e.target)) // ... nor a descendant of the container
	    {
	        container.addClass('hidden');
	    }	  
	});
	$('.location-link').click(function(e){
		window.location.href = $(this).attr('url');
	});
	$('body').on('click', function (e) {
	    //did not click a popover toggle or popover
	    if ($(e.target).data('toggle') !== 'popover'
	        && $(e.target).parents('.popover.in').length === 0) { 
	        $('[data-toggle="popover"]').popover('hide');
	    }
	});
	$('ul.sub').each(function(){
		$('li[staticpath='+$(this).attr('parent')+']').addClass('has-sub').append('<span class="toggle-sub">&#9660;</span>');
		$(this).appendTo('li[staticpath='+$(this).attr('parent')+']');
	});
	$('li.has-sub').click(function(e){
		if(!$(e.target).is('a') && !$(e.target).is('.sub') && $(e.target).closest('.sub').size() == 0)
		{
			$(this).find('.sub').toggle();
		}
	});
	$('.toggle-sub').click(function(){
		//$(this).parent().find('.sub').toggle();
	});
	$('div.location').click(function(){
		$(this).find('.location-selection').toggleClass('hidden');
	});
	$('.action-block li').each(function(){
		$(this).wrapInner('<span></span>');
	});
	$('#request-call-form, #order-form, .order-form').submit(function(e){
		var form = $(this);
		var formData = $(this).serialize();
		form.find('.form-error').empty().hide();
		if(form.find('.loading').size() > 0){
			form.find('.submit').hide();
			form.find('.loading').show();
			form.find('input[type=submit]').prop('disabled', true);
		}
		$.ajax({
			url: $(this).attr('action'),
			type: "POST",
			dataType: "JSON",
			data: formData, 
			success: function(data){
				if(form.find('.loading').size() > 0){
					form.find('.submit').show();
					form.find('.loading').hide();
					form.find('input[type=submit]').prop('disabled', false);
				}
				if(data.Status == "error")
				{
					for(var i = 0; i < data.ErrorList.length; i++)
					{
						if(data.ErrorList[i]["Field"] != "Common")
						{
							form.find('.form-error').append("- ");	
							
						}
						form.find('.form-error').append(data.ErrorList[i]["Message"]);
						
						if(i < data.ErrorList.length - 1)
							form.find('.form-error').append("<br />");
					}
					form.find('.form-error').show();
				}
				else
				{
					$('#thanks .thanks-message').empty();
					for(var i = 0; i < data.MessageList.length; i++)
					{
						$('#thanks .thanks-message').append(data.MessageList[i]["Message"]);
						if(i < data.MessageList.length - 1)
							$('#thanks .thanks-message').append("<br />");
					}
					form[0].reset();
					$('#thanks .thanks-sent').hide();
					$('#thanks .thanks-sent.order').show();
					ShowForm('#thanks');
				}
			}
		});
		e.preventDefault();
	});
	$('#contacts-form, #question-form, #friend-form').submit(function(e){
		var form = $(this);
		var formData = $(this).serialize();
		form.find('.form-error').empty().hide();
		$.ajax({
			url: $(this).attr('action'),
			type: "POST",
			dataType: "JSON",
			data: formData, 
			success: function(data){
				if(data.Status == "error")
				{
					for(var i = 0; i < data.ErrorList.length; i++)
					{
						if(data.ErrorList[i]["Field"] != "Common")
						{
							form.find('.form-error').append("- ");	
							
						}
						form.find('.form-error').append(data.ErrorList[i]["Message"]);
						
						if(i < data.ErrorList.length - 1)
							form.find('.form-error').append("<br />");
					}
					form.find('.form-error').show();
				}
				else
				{
					$('#thanks .thanks-message').empty();
					for(var i = 0; i < data.MessageList.length; i++)
					{
						$('#thanks .thanks-message').append(data.MessageList[i]["Message"]);
						if(i < data.MessageList.length - 1)
							$('#thanks .thanks-message').append("<br />");
					}
					form[0].reset();
					$('#thanks .thanks-sent').hide();
					$('#thanks .thanks-sent.message').show();
					ShowForm('#thanks');
				}
			}
		});
		e.preventDefault();
	});
	$("[data-toggle=popover]").popover({container: 'body'});
	$('.calculator-form input').change(function(){
		Calculate($(this).closest('.calculator-form'));
	});
	$('.calculator-form input').keyup(function(){
		Calculate($(this).closest('.calculator-form'));
	});
	$('.calculator-form select').on("selectmenuchange", function(e, ui){
		Calculate($(this).closest('.calculator-form'));
	});
	$('.calculator-form').each(function(){
		Calculate($(this));
	});
	$('.toggle-payment-list').click(function(){
		$('.payment-list').toggle();
		$(this).toggleClass('opened');
	});
	$('.change-amount').click(function(e){
		var form = $(this).closest('form');
		form.find('.amount-label, input[name=Text_Amount]').toggleClass('hidden');
		e.preventDefault();
	});
	$('input[name=Text_Amount]').change(function(){
		var form = $(this).closest('form');
		form.find('.amount-label .val').html($(this).val());
	}).change();
});

if (!Math.round10) {
	Math.round10 = function(value, exp) {
		return decimalAdjust('round', value, exp);
	};
}
function GetValue(value)
{
	var result = parseFloat(value);
	if(isNaN(result) || result <= 0)
		return false;
	else
		return result;
}
function decimalAdjust(type, value, exp) {
	// Если степень не определена, либо равна нулю...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// Если значение не является числом, либо степень не является целым числом...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Сдвиг разрядов
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Обратный сдвиг
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
function priceFormat(x)
{
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function Calculate(calculator)
{
	if($('.payment-list').size() > 0)
	{
		$('.payment-list tbody').empty();
	}
	var amount = GetValue(calculator.find('input[name=Amount],input[name=Text_Amount_r]').val());
	var period = GetValue(calculator.find('input[name=Period],input[name=Text_Period]').val()) * 12;
	var percent = GetValue(calculator.find('input[name=Percent],input[name=Text_Percent]').val());
	var paymentType = calculator.find('select[name=PaymentType],select[name=Select_PaymentType]').val();
	var paymentList = new Array();
	if(!amount || !period || !percent)
	{
		return false;
	}
	var calculatorType = calculator.find('input[name=CalculatorType]').val();
	if(calculatorType == "auto" && calculator.find('input[name=HullInsurance],input[name=Text_HullInsurance]').is(':checked'))
		amount += parseInt(calculator.find('input[name=HullInsurance],input[name=Text_HullInsurance]').val());
	
	if(paymentType == "Annuity")
	{
		var p = percent / 1200;
		var result = (p * amount) / (1 - Math.pow(1+p, -period));
		var publicResult = priceFormat(Math.round10(result, 0)); 
		calculator.find('.monthly-payment span').html(publicResult);
		
		var overpayment = result * period - amount;
		var publicOverpayment = priceFormat(Math.round10(overpayment), 0);
		calculator.find('.overpayment span').html(publicOverpayment);
		
		//payment list
		var debtLeft = amount;
		for(i = 1; i <= period; i++)
		{
			var percentPayment = debtLeft * (percent / 1200);
			var mainPayment = result-percentPayment;
			paymentList.push({
				"MonthNumber": i,
				"MonthlyPayment": sprintf("%.2f", Math.round10(result, -2)),
				"PercentPayment": sprintf("%.2f", Math.round10(percentPayment, -2)),
				"MainPayment": sprintf("%.2f", Math.round10(mainPayment, -2)),
				"DebtLeft": sprintf("%.2f", Math.round10(debtLeft, -2))
			});
			debtLeft -= mainPayment;
		}
	}
	else if(paymentType == "Differentiated")
	{
		var totalPayment = 0;
		var currentAmount = amount;
		var minPayment;
		var maxPayment;
		var payments = new Array();
		for(var i = 1; i <= period; i++)
		{
			var payment = amount / period + currentAmount * (percent / 1200);
			payments.push(payment);
			totalPayment += payment;
			if(i == 1)
				maxPayment = priceFormat(Math.round10(payment, 0));
			else if (i == period)
				minPayment = priceFormat(Math.round10(payment, 0));
			currentAmount -= amount / period;
		}
		calculator.find('.monthly-payment span').html(maxPayment + "..." + minPayment);
		var overpayment = totalPayment - amount;
		var publicOverpayment = priceFormat(Math.round10(overpayment, 0));
		calculator.find('.overpayment span').html(publicOverpayment);
		
		//payment list
		var debtLeft = amount;
		for(i = 0; i < payments.length; i++)
		{
			var percentPayment = debtLeft * (percent / 1200);
			var mainPayment = payments[i]-percentPayment;
			paymentList.push({
				"MonthNumber": i+1,
				"MonthlyPayment": sprintf("%.2f", Math.round10(payments[i], -2)),
				"PercentPayment": sprintf("%.2f", Math.round10(percentPayment, -2)),
				"MainPayment": sprintf("%.2f", Math.round10(mainPayment, -2)),
				"DebtLeft": sprintf("%.2f", Math.round10(debtLeft, -2))
			});
			debtLeft -= mainPayment;
		}
	}
	if($('.payment-list').size() > 0)
	{
		for(i = 0; i < paymentList.length; i++)
		{
			var html = '<tr>\
				<td>'+paymentList[i]["MonthNumber"]+'</td>\
				<td>'+paymentList[i]["MonthlyPayment"]+'</td>\
				<td>'+paymentList[i]["PercentPayment"]+'</td>\
				<td>'+paymentList[i]["MainPayment"]+'</td>\
				<td class="hidden-xs">'+paymentList[i]["DebtLeft"]+'</td>\
			</tr>';
			$('.payment-list').append(html);
		}
	}
}