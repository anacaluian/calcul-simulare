<template>
  <div  id="app">
    <v-app app>
      <v-container>
          <v-row no-gutters>
          <v-col cols="12" align="center">
            <v-card >
              <v-card-text>
                Numerele castigatoare:
                <br>
                <NumberChip v-for="number in winning" :color="intersection.includes(number) ? '#009a00' : '#f0db08'" :value="number"></NumberChip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" align="center">
            <v-card >
              <v-card-text>
                Numerele jucate:
                <br>
                <NumberChip v-for="number in ticket" :color="intersection.includes(number) ? '#009a00' : '#ffa500'" :value="number"></NumberChip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" align="center">
              <input class="form-check-input" type="checkbox" v-model="same" id="defaultCheck1"> Selecteaza daca vrei sa pastrezi aceleasi numere la fiecare extragere.
           </v-col>
        </v-row>

        <br>
        <v-row no-gutters justify="center">
           <v-col class="mx-4" align="center" justify="center" cols="12">
             <v-card>
               <v-card-text>
                 <v-row justify="center">
               <v-col class="mx-4" align="center" justify="center" cols="6">
                    <v-select
                    v-model="selectedSpeed"
                    :items="['incet','repede','super_repede']"
                    filled
                    label="Viteza"
                  ></v-select>
               </v-col>
             </v-row>
                  <v-btn @click="start" class="btn" justify="center" rounded color="#1A1AFF" dark>Start</v-btn>
                  <v-btn @click="stop" class="btn" align-self="center" rounded color="#e60000" dark>Stop</v-btn>
                  <v-btn @click="reset"  class="btn" align-self="center" rounded color="#610483" dark>Reset</v-btn>
               </v-card-text>
             </v-card>
           </v-col>

        </v-row>
        <br>

        <v-row no-gutters>
          <v-col class="mx-4" cols="6" >
            <v-simple-table dark>
              <thead>
                  <tr>
                    <th>Categorie</th>
                     <th>Nr. castiguri</th>
                    <th>Castig</th>
                    <th>Proportii</th>
                    <th>Probabilitate aprox.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cat. I (6/6)</td>
                     <td>{{cat1}}</td>
                    <td>692.051,04 LEI</td>
                    <td>{{ cat1 > 0 ? (100*cat1/drawings).toFixed(2) : 0}}</td>
                    <td><sup>1</sup>&frasl;<sup> 13983816</sup> </td>
                  </tr>
                   <tr>
                    <td>Cat. II (5/6)</td>
                    <td>{{cat2}}</td>
                    <td>76.894,56 LEI</td>
                    <td>{{ cat2 > 0 ? (100*cat2/drawings).toFixed(2) : 0}}</td>
                    <td><sup>1</sup>&frasl;<sup> 54200</sup> </td>

                  </tr>
                   <tr>
                    <td>Cat. III (4/6)</td>
                    <td>{{cat3}}</td>
                    <td>555,86 LEI</td>
                    <td>{{ cat3 > 0 ? (100*cat3/drawings).toFixed(2) : 0}}</td>
                    <td><sup>1</sup>&frasl;<sup> 1032</sup> </td>
                  </tr>
                   <tr>
                    <td>Cat. IV (3/6)</td>
                    <td>{{cat4}}</td>
                    <td>30 LEI</td>
                    <td>{{ cat4 > 0 ? (100*cat4/drawings).toFixed(2) : 0}}</td>
                    <td><sup>1</sup>&frasl;<sup> 56.66</sup></td>
                  </tr>
                </tbody>
            </v-simple-table>
           </v-col>


           <v-col class="mx-4" cols="4">
            <v-simple-table dark>
              <thead>
                  <tr>
                    <th>Sumar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Numar extrageri:</td>
                    <td>{{drawings}}</td>
                  </tr>
                   <tr>
                    <td>Castig/Pierdere:</td>
                    <td>{{(money).toFixed(2)}} LEI</td>
                  </tr> 
                   <tr>
                    <td>Ani:</td>
                    <td>{{(drawings/52.17).toFixed(2)}}</td>
                  </tr> 
                </tbody>
            </v-simple-table>
           </v-col>
        </v-row>

<br>
        <v-row no-gutters justify="space-around">
          <v-col cols="6" >
            <v-simple-table dark>
              <thead>
                  <tr>
                    <th>Raport castig/an</th>
                     <th>Pierderi</th>
                    <th>Castiguri</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(year,index) in yearProbabilityValue" v-bind:key="year">
                    <td>{{year}}</td>
                    <td>{{win_loss[index]['0']}}</td>
                    <td>{{win_loss[index]['1']}}</td>
                  </tr>
                </tbody>
            </v-simple-table>
           </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import NumberChip from './components/NumberChip';
export default {
    data(){
        return {
          win_loss:[],
          yearProbability:[],
          yearProbabilityValue:[],
          started:false,
          same:false,
          speed:[
            ['incet',1000],
            ['repede',400],
            ['super_repede',100]
          ],
          selectedSpeed:'incet',
          ticket:[],
          winning:[],
          intersection:[],
          cat1:0,
          cat2:0,
          cat3:0,
          cat4:0,
          drawings:0,
          money:0,
          years:0,
        }
},
mounted(){
this.ticket = this.generateNumbers();
this.winning = this.generateNumbers();
},
methods:{
  start(){
    if(!this.started){
var self = this;
    window.startInterval = setInterval(function(){
      self.drawings ++;
      self.money -=5.10;
      if(!self.same){
      self.ticket = self.generateNumbers();
      }
      self.winning = self.generateNumbers();
      self.intersection = self.$collect(self.ticket).intersect(self.winning).all();
      var speedy = self.$collect(self.speed).where('0','=',self.selectedSpeed).pluck('1').first();
      switch(self.intersection.length){
        case 3:
           self.$toast.open({
              message: 'Ai nimerit 3 numere !',
              type: 'success',
          });
          self.cat4++;
          self.money += 30 ;
         
          break;
        case 4:
          self.$toast.open({
              message: 'Ai nimerit 4 numere !',
              type: 'success',
          });
          self.cat3++;
          self.money += 555.86;
          
          break;
        case 5:
          self.$toast.open({
              message: 'Ai nimerit 5 numere !',
              type: 'success',
          });
          self.cat2++;
          self.money += 76894.56;
          
          break;
        case 6:
           self.$toast.open({
              message: 'Ai castigat !',
              type: 'success',
          });
          self.cat1++;
          self.money += 692051.04;
         
          break;
      }

      if(self.yearProbability.length == 48){
          let draws = self.$collect(self.yearProbability).countBy().all();
          self.win_loss.push(draws);
          let loses = self.$collect(draws).first();
          let wins = 48 - loses;
          self.yearProbabilityValue.push((100 * wins)/48);
      }
         if(self.yearProbability.length < 48){
        if(self.intersection.length >= 3){
          self.yearProbability.push(1);
        }else{
           self.yearProbability.push(0);
        }
      }else{
        self.yearProbability.length = 0;
      }
    
    },self.$collect(self.speed).where('0','=',self.selectedSpeed).pluck('1').first());
    this.started = true;
    }  
  },
  stop(){
    clearInterval(window.startInterval);
    this.started = false;
  },
  reset(){
     clearInterval(window.startInterval);
      this.started = false;
      this.cat1 = 0;
      this.cat2 = 0;
      this.cat3 = 0;
      this.cat4 = 0;
      this.drawings = 0;
      this.money = 0;
      this.intersection = [];
      this.yearProbabilityValue.length = 0;
      this.yearProbability.length = 0;
      this.win_loss.length = 0;

  },
  checkWin(){
 
  },
  generateNumbers(){
    let numbers = [];
    while(numbers.length<6){  
      let generatedNumber = Math.floor(Math.random() * (49 - 1) ) + 1;
        if(! numbers.includes(generatedNumber)){
          numbers.push(generatedNumber);
        }
    }
    return numbers;
  }
},
components:{NumberChip}
};
</script>

<style scoped>
.btn{
  margin: 10px;
}
.f {
    display: inline-block;
    width: 1em;
}
.n {
    text-align: center;
    border-bottom: 1px solid black; 
}

.d {
    text-align: center;
}
</style>
