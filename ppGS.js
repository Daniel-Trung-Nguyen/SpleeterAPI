// Payment button
(function (div, currency) {
    var item_total = {
            currency_code: currency,
            value: '14.99',
        },
        tax_total = {
            currency_code: currency,
            value: '0.00'
        },
        render = function () {
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        application_context: {
                            brand_name: "Skill-Express",
                            landing_page: "BILLING",
                            shipping_preference: "NO_SHIPPING",
                            payment_method: {
                                payee_preferred: "UNRESTRICTED"
                            }
                        },
                        purchase_units: [{
                            description: "Instrumental tracks for personal use",
                            soft_descriptor: "SKILLEXPRESS",
                            amount: {
                                breakdown: {
                                    item_total: item_total,
                                    tax_total: tax_total
                                },
                                value: '14.99'
                            },
                            items: [{
                                name: "SEK Spleeter Online Access",
                                quantity: 1,
                                description: "Unlimited Credit for SEK Spleeter Online",
                                sku: "DIO2",
                                unit_amount: item_total,
                                tax: tax_total
                            }]
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // div.innerHTML = "Order received!";
                        paymentComplete('complete');
                    });
                },
                onCancel: function (data) {},
                onError: function (err) {
                    div.innerHTML = "<pre>" + err.toString()
                }
            }).render("#digitalgoods-130520063406-dio2");
        },
        init = function () {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "https://www.paypal.com/sdk/js?client-id=AcHQjBYf739Uq5_9813poHLjpF46x6EcUZDCSoFAA7mN4uVRQGlLVTBarPv9EAUNPL8PU77WlKizYTYu\x26currency=USD";
            script.onload = render;
            div.appendChild(script);
        };
    init();
})(document.getElementById("digitalgoods-130520063406-dio2"), "USD");

function paymentComplete(status) {
    if (status === "complete") {
        $("div.payment-received").removeClass("hide");
        $("div.payment-form").addClass("hide");
    } else {
        $("div.payment-error").removeClass("hide");
    }
}


function activated() {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    $("span#expiration").text(oneYearFromNow);
    $("div.activated").removeClass("hide");
    $("div.payment-received").addClass("hide");
    // $("div.payment-form").addClass("hide");
}

// Send data to form
$(document).ready(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    var form = $('form#activateForm'),
        url =
        'https://script.google.com/macros/s/AKfycbw8EL_8P7WgunNEe0Lz21jAUptCOdfi4E_iSNtEsQqjV-umlMvJJHYk_A/exec';
    form.submit(function (e) {
        e.preventDefault();

        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: form.serializeObject()
        });
        activated()
    });
});
