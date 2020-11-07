(function($){
    
    $.fn.defaults = {
        type : 'text',
        selectOptions : '',
        itemsExtraData : [],
        extrafields : '',
        callback : function(){},
        templateContainer : 'input-form-wrapper'
    };
    
    $.fn.editinline = function(options){
        var setting = $.extend({},$.fn.defaults, options);
        var targetElement = $("#" + this.attr('id'));
        
        targetElement.on({
            mouseenter: function () {
                var elePos = $(this).position(),
                    eleWidth = $(this).outerWidth();
                    if( $(this).width() == 0) { eleWidth = '200'};
                $(this).toggleClass('inline-edit-visible').on('click',function(e){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $('.input-form-wrapper').prev('.inline-edit').css("visibility","visible").end().remove();
                    var fieldValue = $(this).text();
                    var template  = '';
                        template += '<div class="input-form-wrapper" style="position:absolute;left:'+ elePos.left +'px;top:'+ elePos.top+'px;width:'+ eleWidth +'px">';
                        template += renderTemplate(setting.type,fieldValue,targetElement,setting.selectOptions);
                        template += '<div class="check-buttons"><button class="btn btn-info" id="approve-button" value="yes"><i class="fa fa-check"></i></button><button class="btn btn-info" id="reject-button" value="no"><i class="fa fa-remove"></i></button></div></div>';
                        
                    $(this).css("visibility","hidden").after(template);
                    
                    var formContainer = $("." + setting.templateContainer);
                    formContainer.find('select#basic').selectpicker('refresh');
                    formContainer.find('.dropdown-toggle').dropdown();
                    formContainer.find('#'+targetElement.selector.substr(1)+'-id').datetimepicker();
                    
                    $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
                        window.typeaheadSelectValue = suggestion;
                    });

                    initializeUserCallbackFunction();

                    formContainer.find('input').select();
                    formContainer.find('.check-buttons').children('button').on('click',function(e){
                        e.preventDefault();
                        var buttonResult = e.target.value;
                        
                        if(setting.extrafields == 'auto-complete'){
                            var inputValue = typeaheadSelectValue;
                        }else if(setting.extrafields == 'dropdown-select'){
                            inputValue = formContainer.find('.bootstrap-select ul li.selected').text();
                        }else if(setting.type == 'datetime'){
                            inputValue = formContainer.find('div.date input').val();
                        }else{
                            inputValue = formContainer.find('input,textarea,select').val();
                        }
                        
                        if(buttonResult == 'no'){
                            formContainer.remove();
                            targetElement.css("visibility","visible");
                        }
                        else{
                            formContainer.remove();
                            targetElement.css("visibility","visible").html(inputValue);
                        }
                    });
                });
            },
            mouseleave: function() {
                $(this).removeClass('inline-edit-visible');
            }
        });
        
        $('.page-content').on('click',function(e)
        {
            if(!$(e.target).is('input, select, textarea, div.bootstrap-select ul li *, span.input-group-addon, .note-editor *, .note-editable, .note-toolbar-wrapper *, span.glyphicon, div.tt-suggestion')){
                $('.input-form-wrapper').remove();
                targetElement.css("visibility","visible");
            }
        });
        
        function initializeUserCallbackFunction()
        {
            if($.isFunction(setting.callback)){
                return setting.callback.call(this);
            }
        }
        
        function renderTemplate(type, value, targetElement, options)
        {
            var type, value, options,  template = "";
            switch(type){
                case 'text':
                    template += '<input type="text" class="form-control" name="fieldHeader" value="'+ value +'" selected />';
                    break;
                case 'textarea':        
                    template += '<textarea class="summernote" style="height:200px;width:100%;">'+ value +'</textarea>';
                    break;
                case 'select':        
                    if(typeof setting.extrafields != 'undefined' && setting.extrafields.length > 0){
                        template += '<select class="form-control">';
                        template += getListItems(options, type = 'select');
                        template += '</select>';
                        template += '<div id="matter-opponent">';
                        template += '<input class="typeahead form-control" type="text" placeholder="type here ">';
                        template += '</div>';
                    }
                    else{
                        template += '<select class="form-control">';
                        template += getListItems(options, type = 'select');
                        template += '</select>';
                    }
                    break;
                case 'select-lookup':        
                    template += '<select id="basic" class="selectpicker form-control" data-live-search="true">';
                    template += getListItems(options, type = 'select');
                    template += '</select>';
                    break;
                case 'datetime':        
                    template += '<div class="form-group">';
                    template += '<div class="input-group date" id="'+targetElement.selector.substr(1)+'-id">';
                    template += '<input type="text" class="form-control" />';
                    template += '<span class="input-group-addon">';
                    template += '<span class="glyphicon glyphicon-calendar"></span>';
                    template += '</span></div></div>';
                    break;
                default:
                   template;
            }
            return template;
        }
        
                                    
        function templateFactory(templateType, options)
        {
            var templateType, type, theme = "";
            if(templateType == 'select'){
                getListItems(options, type = 'select');
            }
            return theme += '<select class="form-control">'; 
                   theme += getListItems(options, type = 'select');
                   theme += '</select>'; 
        }
        
        function getListItems(options, type)
        {
            var options, type, listItems = "", attributes = "";
            if(options instanceof  Array){
                if(type == 'select'){
                    for(var i=0; i < options.length; i++){
                         listItems  += '<option value="'+options[i]+'">'+ options[i] +'</option>';
                    }
                }else{
                    for(var i=0; i < options.length; i++){
                         listItems  += '<li>'+ options[i] +'</li>';
                    }
                }
            }else{
               jQuery.each(options, function(element, value){
                    if( typeof value == 'object' ){
                        var elementvalue = element;
                        jQuery.each(value, function(attr, attrValue){
                            attributes += attr + '="' + attrValue + '"' ;
                        });
                    }else{
                        elementvalue = value;
                    }
                    listItems  += '<option value="'+element+'" '+attributes+'>'+ elementvalue +'</option>';
                });
            }
            return listItems;
        }
        
        
    };
}(jQuery));