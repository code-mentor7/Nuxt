<template>
  <v-card flat>
    <template v-for="(item, i) in transactionData" >
      <v-tooltip
        :key="i"
        :nudge-bottom="50"
        top>
        <v-layout
          slot="activator"
          align-center
          @click="clickPurchaseHistory(item)">
          <v-flex
            xs9
            md4
            ellipsis>
            <v-card-title
              primary-title
              class="pt-3 pb-0">
              #{{ item._id }}
            </v-card-title>
          </v-flex>
          <v-flex
            xs3
            md4
            class="text-xs-center">
            <v-card-text class="green--text">
              MYR{{ item.total_amount }}
            </v-card-text>
          </v-flex>

          <v-flex
            xs3
            sm5
            md4
            hidden-sm-and-down
            class="text-xs-right">
            <v-card-text >
              Placed on {{ item.created_at | formatDate }}
            </v-card-text>
          </v-flex>

        </v-layout>
        Click for more details
      </v-tooltip>
      <v-divider
        :key="`${i}divider`"
        class="grey lighten-2"
      />
    </template>
    <purchase-history-detail-dialog
      :show="showPurchaseHistoryDetail"
      :sub-loading="subLoading"
      :purchase-history="purchaseHistory"
      @close="showPurchaseHistoryDetail = false"/>
  </v-card>
</template>

<script>
import PurchaseHistoryDetailDialog from "~/components/Dialog/PurchaseHistoryDetailDialog.vue"
export default {
  components: {
    PurchaseHistoryDetailDialog
  },
  props: {
    transactionProp: {
      type: Array,
      required: true
    }
  },
  data () {
    let defaultData = {
      transactionData: [...this.transactionProp],
      purchaseHistory: {},
      showPurchaseHistoryDetail: false,
      subLoading: false
    }
    return defaultData
  },
  watch: {
    transactionProp (val) {
      if (val) {
        this.transactionData = [...val]
      }
    }
  },
  methods: {
    clickPurchaseHistory (purchaseHistory) {
      this.purchaseHistory = purchaseHistory
      this.showPurchaseHistoryDetail = true
      // this.time = new Date().getTime()
      // this.$subscribe("getCustomerTransactionItems", () => [this.purchaseHistory._id])
    }
  }
  // meteor: {
  //   subReady () {
  //     this.subLoading = !this.$subReady.getCustomerTransactionItems
  //     // console.log('getCustomerTransactionItems', this.subLoading, this.$subReady.getCustomerTransactionItems, new Date().getTime() - this.time);
  //   }
  // }

}
</script>

<style>

</style>
