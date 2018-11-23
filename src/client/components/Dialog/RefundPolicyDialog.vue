<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    v-model="isShow"
    width="800px"
    @keydown.esc="close()">
    <v-card dark>
      <v-card-title
        class="headline font-weight-thin primary white--text font-enforce"
        primary-title
      >
        <v-spacer/>
        Refund Terms
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              class="font-enforce subheading font-weight-thin text-xs-justify">
              <ol>
                <li>
                  50% refund before 30 days tour departure.
                </li>
                <li>
                  20% refund before 21 days tour departure.
                </li>
                <li>
                  No refund less than 21 days tour departure.
                </li>
              </ol>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click.native="close()">Close</v-btn>
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
