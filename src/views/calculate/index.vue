<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-layout wrap>
            <v-flex xs6 sm6 md3>
              <v-text-field type="number" v-model="number_sum" persistent-hint="" hint="Số lượng số tính tổng"></v-text-field>
            </v-flex>
            <v-flex xs6 sm3 md3>
              <v-text-field type="number" v-model="number_length" persistent-hint="" hint="Số lượng số ghép"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="calculate()">Thực hiện</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    number_sum: 6,
    number_length: 45
  }),
  methods: {
    calculate() {
      console.log(this.number_sum,this.number_length)
    }
  }
}
</script>

<style>
</style>
