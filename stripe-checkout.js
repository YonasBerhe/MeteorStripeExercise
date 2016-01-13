if (Meteor.isClient) {
      Template.hello.events({
        'click button': function(e) {
          e.preventDefault();

          StripeCheckout.open({
            key: 'sk_test_SPVzieat8HCaKQI0gRqC1yPj',
            amount: 5000, // this is equivalent to $50
            name: 'Meteor Tutorial',
            description: 'On how to use Stripe ($50.00)',
            panelLabel: 'Pay Now',
            token: function(res) {
              stripeToken = res.id;
              console.info(res);
              Meteor.call('chargeCard', stripeToken);
            }
          });
        }
      });
    }

    if (Meteor.isServer) {
      Meteor.methods({
        'chargeCard': function(stripeToken) {
          check(stripeToken, String);
          var Stripe = StripeAPI('sk_live_0uhv8KV40NCe79pJDtTWejWD');

          Stripe.charges.create({
            source: stripeToken,
            amount: 5000, // this is equivalent to $50
            currency: 'usd'
          }, function(err, charge) {
            console.log(err, charge);
          });
        }
      });
    }
