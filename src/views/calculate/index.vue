<template>
  <v-card>
    <v-card-title>
      <span class="title">Calculate lucky zone</span>
    </v-card-title>
    <loading :loading.sync="loading"></loading>
    <v-card-text :class="loading?'hide':''">
      <v-form>
        <v-container fluid>
          <v-layout wrap>
            <v-flex xs12 sm12 md3>
              <v-text-field type="number" v-model="number_count" persistent-hint="" hint="Count"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md3>
              <v-text-field type="number" v-model="number_length" persistent-hint="" hint="Length"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md3>
              <v-text-field type="number" v-model="number_total" persistent-hint="" hint="Total"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="list_zone.length>0" :class="loading?'hide':''">
      <div class="title">Result </div><br />
      <div v-for="(item,index) in list_zone" :key="index">
        <span class="body-1">{{item}}</span>
        <!-- <b class="ml-3">{{item.reduce(getSum)}}</b> -->
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="calculate()" :loading="loading">Calculate</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import loading from '@/components/loading-content'
export default {
  components: { loading },
  data: () => ({
    loading: false,
    numbers: [],
    list_numbers: [],
    list_zone: [],
    number_count: 6,
    number_length: 45,
    number_total: 255,
  }),
  watch: {
    // number_length(val) {
    //   for (let index = 0; index < this.number_length; index++) {
    //     console.log(index + 1)
    //   }
    // }
  },
  methods: {
    async calculate() {
      this.loading = true
      this.numbers = []
      this.list_numbers = []
      this.list_zone = []
      for (let index = 0; index < this.number_length; index++) {
        this.numbers.push(index + 1)
      }
      //
      for (let index = 0; index < this.numbers.length; index++) {
        let x = []
        for (let a = 0; a < this.number_length - (this.number_count - 1); a++) {
          x = [this.numbers[index]]
          for (let count = 1; count < this.number_count; count++) {
            let num = index + a + count
            if (num >= this.number_length) num = num - this.number_length
            x.push(this.numbers[num])
          }
          const xSort = x.sort()
          if (!this.isItemInArray(this.list_numbers, xSort)) {
            this.list_numbers.push(xSort)
            if (xSort.reduce(this.getSum) === parseInt(this.number_total))
              this.list_zone.push(xSort)
          }
        }
      }
      // await new Promise((resolve, reject) => setTimeout(resolve, 200));
      // console.log(this.list_numbers)
      this.loading = false
    },
    isItemInArray(array, item) {
      for (var i = 0; i < array.length; i++) {
        let rs = []
        for (let ii = 0; ii < array[i].length; ii++) {
          if (array[i][ii] == item[ii]) rs.push(true)
          else rs.push(false)
        }
        if (rs.indexOf(false) === -1) return true
        // if (array[i][0] == item[0] && array[i][1] == item[1]) {
        // return true;   // Found it
        // }
      }
      return false;   // Not found
    },
    getSum(total, num) {
      return total + num;
    }
  }
}
</script>

<style>
</style>
