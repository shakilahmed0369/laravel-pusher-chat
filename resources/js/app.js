require('./bootstrap');

import { createApp } from 'vue'
import axios from 'axios';
import Test from './components/Test.vue';
import ChatForm from './components/ChatForm.vue';
import ChatMessages from './components/ChatMessages.vue';


const app = createApp({
    components: {
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
        Echo.private('chat')
        .listen('MessageSent', (e) => {
            this.messages.push({
            message: e.message.message,
            user: e.user
            });

        });

    },

    watch: {
        messages: {
            handler(){
                // scroll bottom after dom update
                this.$nextTick(() => {
                    var obj = document.getElementsByClassName('panel-body');
                    obj[0].scrollTop = obj[0].scrollHeight;
                })
            }, deep: true
        }
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
    },

});


app.mount('#app');



