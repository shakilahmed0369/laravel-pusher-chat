require('./bootstrap');

import { createApp } from 'vue'
import axios from 'axios';
import Test from './components/Test.vue';
import ChatForm from './components/ChatForm.vue';
import ChatMessages from './components/ChatMessages.vue';


const app = createApp({
    components: {
        Test,
        ChatForm,
        ChatMessages
    },

    data() {
       return {
            messages: []
       }
    },

    created() {
        this.fetchMessages();
    },

    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/messages', message).then(response => {
              console.log(response.data);
            });
        }
    }
});


app.mount('#app');
