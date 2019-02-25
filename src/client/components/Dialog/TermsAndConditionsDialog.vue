<template>
  <v-dialog
    v-model="isShow"
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    scrollable
    @keydown.esc="close()"
  >
    <v-card dark>
      <v-card-title
        class="headline font-weight-thin primary white--text font-enforce"
        primary-title
      >
        <v-spacer />
        Terms and Conditions
        <v-spacer />
        <v-btn
          class="white--text"
          icon
          @click="close()"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              class="font-enforce subheading font-weight-thin text-xs-justify"
            >
              <ol>
                <li>Registration / Booking / Travel Information
                  <ol>
                    <li>
                      Travelers can register or book their journey in writing, orally, by phone or electronically (e.g. e-mail). Registration / booking shall be a binding order on the travel agency by the travel participant to arrange for a travel contract between him or her and the tour operator or other service providers.
                    </li>
                    <li>
                      The traveler shall be bound to his or her registration or booking order from the date of registration / booking.
                    </li>
                    <li>
                      The contractual obligation of the travel agency shall be limited to orderly provision of the travel services. To the extent that the travel agency delivers information on travel services to the traveler, no liability or warranty on the part of the travel agency shall be involved. The travel agency expressly does not assume any liability or warranty for the success of the tour.
                    </li>
                  </ol>
                </li>
                <li>
                  Registration of Several People
                  <ol>
                    <li>
                      To the extent that the registration / booking includes further travel participants, the person making the registration / booking shall act as their representative. The person making the registration / booking shall be liable for fulfillment of the contract, also for the additional persons included in the services.
                    </li>
                    <li>
                      To the extent that the traveler making the registration / booking intends to establish a separate contractual relationship of the additional travelers to the service providers, this shall be expressly explained in writing, stating booking and personal data.
                    </li>
                  </ol>
                </li>
                <li>
                  Booking Confirmation
                  <ol>
                    <li>
                      The tour operators or other service providers shall confirm registrations / bookings in writing.
                    </li>
                    <li>
                      Travelers shall be obliged to verify the booking confirmation delivered to them immediately for correctness and completeness, and to point out any incorrectness or differences to the tour operator or other service provider.
                    </li>
                    <li>
                      Flight tickets are at all times delivered to the travelers by mail or by e-mail as electronic tickets. In exceptional cases, tickets shall be deposited with the airline.
                    </li>
                    <li>
                      As to package tours, the traveler shall receive the documents by mail or at the airport desk. For any details, refer to the instructions / information on the booking confirmation.
                    </li>
                  </ol>
                </li>
                <li>
                  Liability of Travel Agency
                  <ol>
                    <li>
                      Information on travel services are based on the information of the tour operators or other service providers. The travel agency shall not assume any warranties or guarantees for correctness, completeness or updatedness of the information provided to the traveler.
                    </li>
                  </ol>
                </li>
                <li>
                  Change in Booking / Travel Cancelation
                  <ol>
                    <li>
                      The traveler shall be allowed to withdraw from the contract at any time. In case of withdrawal, the tour operator shall be entitled to charge a reasonable reimbursement. The height of reimbursement shall be determined by the travel price, deducting the value of the expenses saved by the tour operator and after that, what he was able to get as compensation by using the travel service otherwise.
                    </li>
                    <li>
                      In case of cancelation before start of the journey and also thereafter, the tour operator shall be entitled to charge ______ percent of the travel price as compensation.
                    </li>
                    <li>
                      The height of the compensation is stipulated in the conditions of travel of the respective tour operator.
                    </li>
                    <li>
                      The travel agency will not be liable when the flight reservations for special flights and charter flights are cancelled.
                    </li>
                    <li>
                      Change of Booking
                      <ol>
                        <li>
                          If after making the booking the customer wants to change the trip with respect to the date of travel, the destination, the place where the trip starts, the accommodation or the means of transport, the customer should contact the Customer Support Team for assistance. A fee may be imposed by the applicable supplier in the event of a change to a booking.
                          <br>
                          Come Travel Sdn Bhd  administration fee will apply in addition to any fees imposed by the supplier. Please see the table below for the specific fees applicable.
                          <table>
                            <tr>
                              <td>Service</td>
                              <td>Administration Fee</td>
                            </tr>
                            <tr>
                              <td>Flight</td>
                              <td>MYR250</td>
                            </tr>
                            <tr>
                              <td>Hotel</td>
                              <td>MYR30</td>
                            </tr>
                            <tr>
                              <td>Flight + Hotel</td>
                              <td>MYR250</td>
                            </tr>
                            <tr>
                              <td>Car</td>
                              <td>MYR50</td>
                            </tr>
                            <tr>
                              <td>Transfer</td>
                              <td>MYR50</td>
                            </tr>
                            <tr>
                              <td>Activities</td>
                              <td>MYR50</td>
                            </tr>
                            <tr>
                              <td>Package</td>
                              <td>MYR250</td>
                            </tr>
                            <tr>
                              <td>Cruise</td>
                              <td>MYR250</td>
                            </tr>
                          </table>
                        </li>
                      </ol>
                    </li>
                    <li>
                      Refunds
                      <ol>
                        <li>
                          In the event of a refund to the customer after the above deductions, the relevant amounts will be transferred back by the party of the payment card used to make the original booking. Any booking charges applied will not be eligible for reimbursement. Customers should note that refunds of flight bookings may take up to 6 months.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  Restricted Fares
                  <ol>
                    <li>
                      Unless otherwise stated by the customer, it is assumed that the customer requires the least expensive services. Such services (e.g. "economy class") may be provided without any possibility of modification or cancellation. In such cases, the services cannot be provided in a different manner or at a different time or place to those contracted.
                    </li>
                  </ol>
                </li>
                <li>
                  Reference to Special Stipulations
                  <ol>
                    <li>
                      When a flight was booked, the travel agency shall inform the traveler in relation to the travel arrangement about the identity of the airline providing the services.
                    </li>
                    <li>
                      The travel agency shall not have a separate obligation to clarify or notify the travel participant as to legal provisions or other travel regulations as to his or her destination or other travel conditions.
                    </li>
                  </ol>
                </li>
                <li>
                  Payment Transactions
                  <ol>
                    <li>
                      Payments can be made by: direct debit, credit card, transfer, or cash payment at the travel agency.
                    </li>
                    <li>
                      As to different terms of payment, the instructions / information of the tour operators shall apply. With the consent of the traveler, payments can be made via credit card numbers or by direct debit.
                    </li>
                    <li>
                      Fees for cancelation, handling and changes in booking shall become due immediately.
                    </li>
                  </ol>
                </li>
                <li>
                  Price and Payments
                  <ol>
                    <li>
                      The default currency on the website is Malaysia Ringgit (MYR). Payment through the payment gateway will be processed and charged in Malaysia Ringgit. Prices in other currencies are indicative and subject to exchange rate charged by your bank plus any transaction fee determined by the bank or other agency processing the transaction. This means the amount listed on your credit or debit card statement may be a different figure than the figure shown when making your reservations on this website. If you have any questions about these fees or any exchange rate applied to your booking, please contact your bank
                    </li>
                  </ol>
                </li>
                <li>
                  Other Provisions and Terms
                </li>

              </ol>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          flat
          @click.native="close()"
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    isShow: {
      // https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
/* https://stackoverflow.com/questions/10405945/html-ordered-list-1-1-1-2-nested-counters-and-scope-not-working */
ol {
  counter-reset: item
}
li {
  display: block
}
li:before {
  content: counters(item, ".") " ";
  counter-increment: item;
  color: #6dffff;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
</style>
