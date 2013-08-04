define(function(require){
    return {
        isDevelopment: true,
        baseApiUrl: 'http://localhost:5000',
        pubnub: {
            subscribe_key: 'sub-c-bf1ed188-d4af-11e2-bfe7-02ee2ddab7fe'
        },

        tokens: {
            2: '',
            3: 'x',
            5: 'o'
        }
    };
});