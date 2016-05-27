/* =================================================
// jQuery address Plugins 1.0
// author:lokialone
// email:648875862@qq.com
// github:https://github.com/lokialone
// 2016/05/27
// =================================================*/


;
(function($) {

    var tab_box = $('.tab_box'),
        tab_box_div = $('.tab_box div'),
        tab_menu = $('.tab_menu'),
        tab_menu_li = $('.tab_menu li'),
        address_input = $('#address_input'),
        address_panel = $('#address_panel'),
        address_str = '',
        index = '0';

    var level = {
        "province": 0,
        "city": 1,
        "county": 2
    }
    $.fn.address = function() {

        addressInstance();
        hidePanel();

    }

    function hidePanel() {

    }
    function addressInstance() {
        address_panel.Tabs({
            event: 'click'
        });
        address_panel.hide();

        address_input.focusin(function(event) {
            init();
        });

        function init() {
            index = '0';
            address_str = '';
            address_input.val('');
            address_panel.show();
            changeState(level.province);
            tab_box_div.eq(level.province).empty();
            /*省份数据显示*/
            $.each(dsy.Items['0'], function(index, data) {
                tab_box_div.eq(level.province).append("<span data-index='" + index + "''>" + data + "</span>");
            });
        }

        // 地址选择
        // 点击省份显示城市的数据
        tab_box_div.eq(level.province).delegate('span', 'click', function() {
            var _self = $(this);
            index = index + "_" + _self.attr('data-index');
            showAddressData(level.city, index);
            changeState(level.city);
            showInputAddress(_self);
        });
        // 点击城市显示区数据
        tab_box_div.eq(1).delegate('span', 'click', function() {
            var _self = $(this);
            index = index + "_" + _self.attr('data-index');
            showAddressData(level.county, index);
            changeState(level.county);
            showInputAddress(_self)
        });

        tab_box_div.eq(2).delegate('span', 'click', function() {
            var _self = $(this);
            addressPanelHide();
            showInputAddress(_self);
           
        });

        /*显示数据*/
        function showAddressData(i, index) {
            var _self = tab_box_div.eq(i);
            _self.empty();
            if (typeof(dsy.Items[index]) == "undefined") {
                addressPanelHide();
            } else {
                $.each(dsy.Items[index], function(index, data) {
                    _self.append("<span data-index='" + index + "''>" + data + "</span>");
                });
            }
        }

        function showInputAddress(_self) {
            address_str = address_str + _self.html() + "/";
            address_input.val(address_str);
        }

        function changeState(index) {
            tab_box_div.addClass('hide');
            tab_menu_li.removeClass('current');
            tab_box_div.eq(index).removeClass('hide');
            tab_menu_li.eq(index).addClass('current');
        }

        function addressPanelHide() {
            address_panel.hide();
            index = '0';
            tab_box_div.eq(level.city).empty();
            tab_box_div.eq(level.county).empty();
        }
    }

})(jQuery);
