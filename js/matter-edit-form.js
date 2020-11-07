$(document).ready(function(){
    
            $('#left-sidebar-toggle').on('click',function(){
                $('.left-sidebar-nav').toggleClass('sidebar-nav sidebar-nav-collapse').promise().done(function(){
                    $(this).find('li a').children('span').toggleClass('visible-text text-hidden');
                });
                $('.content').toggleClass('content-extended');
            });
            
           
            $(".left-sidebar-nav ul li").popover({ trigger: "hover" });
            
            $('span.audit-toogle').on('click',function(){
                var $this = $(this);
                $this.parents('.user-notes').children('.user-notes-body').slideToggle('fast','linear',function(){
                    if($this.find('i.fa').hasClass('fa-angle-down') == true){
                        $this.find('i.fa').remove().end().html('<i class="fa fa-angle-right"></i>');
                    }
                    else{
                        $this.find('i.fa').remove().end().html('<i class="fa fa-angle-down"></i>');
                    }
                });
            });
            
            $('#sidebar-toggle-btn').on('click',function(){
                $('.left-sidebar-nav').toggleClass('sidebar-nav-collapse-visible');
            });
            
            $('.expand-button').on('click',function(e){
                e.preventDefault();
               var linkClass = $(this).find('a').attr('class');
               if(linkClass == 'expand-btn'){
                   $(this).parent('.expand-links').siblings('.user-notes-activity').find('.user-notes-body').slideDown();
                   $(this).parent('.expand-links').siblings('.user-notes-activity').find('span.audit-toogle').find('i.fa').remove().end().html('<i class="fa fa-angle-down"></i>');
               }
               else{
                   $(this).parent('.expand-links').siblings('.user-notes-activity').find('.user-notes-body').slideUp();
                   $(this).parent('.expand-links').siblings('.user-notes-activity').find('span.audit-toogle').find('i.fa').remove().end().html('<i class="fa fa-angle-right"></i>');
               }
            });
            
            $('button.confirm').on('click', function() {
                $('.bg-modal').addClass('bg-modal-visible');
              });
              $('.bg-modal').on('click', function(e) {
                e.preventDefault();
                if ($(e.target).is('.fa-close') || $(e.target).is('.col-md-12') || $(e.target).is('.bg-modal') || $(e.target).is('ul li a')) {
                  $('.bg-modal').removeClass('bg-modal-visible');
                }
            });
            
            $('#progressButton').on('click',function(){
                var buttonValue = $(this).text();
                switch(buttonValue){
                    case 'close':
                        $(this).text('archived').css({"background":"#287f46"});
                    case 'archived': 
                        $(this).text('valid').css({"background":"#c3291d"});
                    case 'valid': 
                        $(this).text('close').css({"background":"#3B7FC4"});
                    default:
                        $(this).text('archived').css({"background":"#c3291d"});
                }
            });
            

            $('#matter-title').editinline({
                type : 'text'
            });
            
            $('#valuematter').editinline({type : 'text'});
            $('#jugementmatter').editinline({type : 'text'});
            $('#recoveredmatter').editinline({type : 'text'});
            
            $('#matter-custom-field').editinline({type : 'text'});
            $('#matter-custom-field2').editinline({
                type : 'select-lookup',
                selectOptions : ['option 1 ','option 2','option 3','option 4']
            });
            var stages = {1: "Reconciliation Committee", 5: "Execution", 6: "Under Settlement", 7: "Settled/Closed", 8: "Dispute", 9: "Arbitration", 10: "Other", 12: "Grievance Board", 13: "Appeal Travel Ban", 14: "Labor Arbitration Board", 15: "BOD meeting", 16: "Due Diligence", 17: "Assembly Meeting", 18: "new samo", 19: "info title", "": "None"};
            $("#client-name").editinline({type : 'text'});
            $("#matter-subject").editinline({type : 'text'});
            $("#matter-status").editinline({type : 'text'});
            $("#matter-stage").editinline({
                type : 'select',
                selectOptions : stages
            });
            $("#matter-comment").editinline({type : 'text'});
            $("#matter-priority").editinline({
                type : 'select-lookup',
                selectOptions : {
                    'critical' : {
                        "data-icon" : 'fa fa-user'
                    },
                    'high' : {
                        "data-icon" : 'glyphicon-heart'
                    },
                    'low' : {
                        "data-content" : '<span><i class="fa fa-info"></i></span>'
                    },
                    'very Low' : {
                        "data-content" : '<span><i class="fa fa-info"></i></span>'
                    }
                },
                extrafields : 'dropdown-select'
            });
            $('#matter-probability').editinline({
                type : 'select-lookup',
                selectOptions : ['High','Low','None'],
                extrafields : 'dropdown-select'
            });
            
            $('#caseProbability').editinline({
                type : 'text'
            });
            $('#clientPosition').editinline({
                type : 'text'
            });
            $('#successProbability').editinline({
                type : 'text'
            });
            
            $('#matter-fileref').editinline({
                type : 'text'
            });
            $("#matter-opponent").editinline({
                type : 'select',
                selectOptions : ['Company / Group', 'Contact'],
                extrafields : 'auto-complete',
                callback : getSuggestions
            });
            $('#opponent-name').editinline({
                type : 'select',
                selectOptions : ['Company / Group', 'Contact'],
                extrafields : 'auto-complete',
                callback : getSuggestions
            });
            $("#matter-practice").editinline({
                type : 'select',
                selectOptions :['Choose Area of Practice','Acquisition','Administrative','Agreement','Audit','Civil','Commercial','Consultation','Corporate','Criminal','Dispute','Due Diligence','Labor','Other','Real Estate','Sharia/Legacy','Signature Authority']
            });
            $("#matter-details").editinline({
                type : 'textarea',
                callback : editor
            });
            $("#matter-latest-development").editinline({type : 'textarea'});
            $("#assignee-team").editinline({type : 'select',selectOptions : ['option A1','option B2','option C3']});
            $("#requested-by").editinline({type : 'select',selectOptions : ['option A1','option B2','option C3']});
            $("#referred-by").editinline({type : 'select',selectOptions : ['option A1','option B2','option C3']});
            $("#assignee").editinline({type : 'select',selectOptions : ['option A1','option B2','option C3']});
            
            $('#field-on').editinline({
                type : 'datetime'
            });
            $('#due-date').editinline({
                type : 'datetime'
            });
            $('#closed-on').editinline({
                type : 'datetime'
            });
            $('#arrival-date').editinline({
                type : 'datetime'
            });
            
            $('.main-content-body #role-1').editinline({
                type : 'text'
            });
            $('.main-content-body #role-2').editinline({
                type : 'text'
            });
            $('.main-content-body #role-3').editinline({
                type : 'text'
            });
            
            $('.main-content-body #role-11').editinline({
                type : 'text'
            });
            $('.main-content-body #role-22').editinline({
                type : 'text'
            });
            $('.main-content-body #role-33').editinline({
                type : 'text'
            });
            
            $('#datetimepicker1').datetimepicker();
            
            $('#summernote').summernote({
                height: 200,
                tabsize: 2
            });

            
        /*
         *  check for all empty inline-edit elements and add a placeholder with "click to add " text to it.
         *  @return : null
         */
        jQuery('.inline-edit').each(function(){
            var emptyElement = jQuery(this);
            if(!emptyElement.text().trim()){
                var spanElement = '<span class="edit-placeholder"> Click To Add </span>';
                emptyElement.html(spanElement);
            }
        });

            var owl = $('.owl-carousel');
            owl.owlCarousel({
                margin: 10,
                dots: true,
                singleItem:true,
                responsive: {
                  0: {items: 1},
                  600: {items: 1},
                  1000: {items: 1}
                }
            });
            
            var currenItemTitle = owl.find('.active').children('.item').data('widget-title');
            owl.parent().siblings().find('.header-slider-title').find("p").text(currenItemTitle);
            owl.on('changed.owl.carousel', function(event) {
                var sectionTitle = $(this).find('.owl-item').children('.item').eq(event.relatedTarget.current()).data('widget-title');
                $(this).parent().siblings().find('.header-slider-title').find("p").text(sectionTitle);
            });
            
            
            var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $('.app-top');

//	$(window).scroll(function(){
//		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('app-is-visible')  : $back_to_top.removeClass('app-is-visible app-fade-out');
//
//            if( $(this).scrollTop() > offset_opacity ) { 
//			$back_to_top.addClass('app-fade-out');
//		}
//	});
        
//        $(window).scroll(function(){
//            if ($(window).scrollTop() >= 300) {
//               $('.page-header-information').addClass('header-fixed');
//            }
//            else{
//                $('.page-header-information').removeClass('header-fixed');;
//            }
//        });

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
            
            sectionToggle('btn-collpase','main-content-header','main-content-body');
            sectionToggle('btn-collpase','right-sidebar-header','right-sidebar-body');
        });
        
        function sectionToggle(eventTarget, parentElement, collpasableBody ){
            $('.' + eventTarget ).on('click',function(){
                var $this = $(this);
                $this.parents('.' + parentElement).siblings('.' + collpasableBody).slideToggle('fast','swing',function(){
                    if($this.find('i.fa').hasClass('fa-angle-down') == true){
                        $this.find('i.fa').remove().end().html('<i class="fa fa-angle-up"></i>');
                    }
                    else{
                        $this.find('i.fa').remove().end().html('<i class="fa fa-angle-down"></i>');
                    }
                });
            });
        }
        AOS.init({easing: 'ease-in-out-sine'});