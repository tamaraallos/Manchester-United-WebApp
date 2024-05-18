<template>
    <!-- Filter buttons -->
    <div>
        <div class="container">
            <div class="row">
                 <div class="col">
                    <button class="filter" @click="filterPosition('all')">Show All</button>
                    <button class="filter" @click="filterPosition('legends')">Legends</button>
                    <button class="filter" @click="filterPosition('goalkeepers')">Goalkeepers</button>
                    <button class="filter" @click="filterPosition('defenders')">Defenders</button>
                    <button class="filter" @click="filterPosition('midfielders')">Midfielders</button>
                    <button class="filter" @click="filterPosition('forwards')">Forwards</button>
                </div>
            </div>
            <!-- Filter logic - iterates over each position - key ensures image has a unique id -->
            <div class="row">
                <div v-if="selectedPosition === 'all' || selectedPosition === 'legends'">
                    <h2>Legends</h2>
                    <div class="img-container">
                        <img v-for="legend in players.legends" :key="legend.id" :src="legend.image" alt="Legend">
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="selectedPosition === 'all' || selectedPosition === 'goalkeepers'">
                    <h2>Goalkeepers</h2>
                    <div class="img-container">
                        <img v-for="goalkeeper in players.goalkeepers" :key="goalkeeper.id" :src="goalkeeper.image" alt="Goalkeeper">
                    </div>
                </div>
            </div>

            <div class="row">
                <div v-if="selectedPosition === 'all' || selectedPosition === 'midfielders'">
                    <h2>Midfielders</h2>
                    <div class="img-container">
                        <img v-for="midfielder in players.midfielders" :key="midfielder.id" :src="midfielder.image" alt="Midfielder">
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="selectedPosition === 'all' || selectedPosition === 'defenders'">
                    <h2>Defenders</h2>
                    <div class="img-container">
                        <img v-for="defender in players.defenders" :key="defender.id" :src="defender.image" alt="Defender">
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="selectedPosition === 'all' || selectedPosition === 'forwards'">
                    <h2>Forwards</h2>
                    <div class="img-container">
                        <img v-for="forward in players.forwards" :key="forward.id" :src="forward.image" alt="Forward">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ListPlayers',
    data() {
        return {
            players: {
                legends: [
                    {id: 1, image: 'arthurAlbiston.png'},
                    {id: 2, image: 'bobbyCharlton.png'},
                    {id: 3, image: 'daviddeGea.png'},
                    {id: 4, image: 'paulScholes.png'},
                    {id: 5, image: 'ryanGiggs.png'},
                    {id: 6, image: 'wayneRooney.png'}
                ],
                goalkeepers: [
                    {id: 1, image: '1.png'},
                    {id: 2, image: '22.png'},
                    {id: 3, image: '24.png'}

                ],
                defenders: [
                    {id: 1, image: '2.png'},
                    {id: 2, image: '5.png'},
                    {id: 3, image: '6.png'},
                    {id: 4, image: '20.png'},
                    {id: 5, image: '23.png'},
                    {id: 6, image: '29.png'}

                ],
                midfielders: [
                    {id: 1, image: '8.png'},
                    {id: 2, image: '14.png'},
                    {id: 3, image: '18.png'},
                    {id: 4, image: '39.png'}
                ],
                forwards: [
                    {id: 1, image: '10.png'},
                    {id: 2, image: '11.png'},
                    {id: 3, image: '17.png'},
                    {id: 4, image: '21.png'}

                ]
            },
            selectedPosition: 'all'
        };
    },
    methods: {
        filterPosition(position) {
        this.selectedPosition = position;
        }
    }
};
</script>

<style scoped>
.filter {
    margin: 1px;
}

h2 {
    text-transform: uppercase;
    text-align: left;
    margin-top: 40px; 
    border-bottom: 1px solid rgb(207, 207, 207); 
    color: #333; 
    font-size: 28px; 
    font-weight: bold; 
    padding-bottom: 10px; 
}

.img-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.img-container img {
    border-radius: 15px;
    width: 30%; /** allows for dynamic adjust */
    margin: 5px; 
    transition: transform 0.4s, filter 0.2s;
}

.img-container img:hover {
    transform: scale(0.99); 
    filter: drop-shadow(15px 15px 15px rgba(110, 110, 110, 0.3)); 
}
</style>