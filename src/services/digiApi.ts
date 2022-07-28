import axios from 'axios';

export const digiApi = axios.create({
    baseURL: 'https://digimon-api.vercel.app'
})

export async function GetDigimon() {
    const { data, status } = await digiApi.get('/api/digimon')
    if(status === 200){
        return data;
    }else{
        console.log(data)
    }
}