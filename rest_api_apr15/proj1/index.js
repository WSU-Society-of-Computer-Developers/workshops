const axios = require("axios")
const URL = "https://asli-fun-fact-api.herokuapp.com/"
function main() {
    axios.get(URL).then(response => {
        /* 
        // SAMPLE DATA:
        {
            status: true,
            data: {
                id: '85',
                fact: 'We spend around 10 years watching TV',
                cat: 'tech',
                hits: '1113'
            }
        }
        */
        const { data: { data } } = response
        /* 
            data = {
                id: '85',
                fact: 'We spend around 10 years watching TV',
                cat: 'tech',
                hits: '1113'
            }
        */
        /* const responseData = response.data
        const factObj = responseData.data */
        console.log(`Fun Fact: ${data.fact}\nCategory: ${data.cat}\nThis fact has ${data.hits} hits!`)
    })
}

main()