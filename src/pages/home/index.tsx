import { useEffect, useState } from "react";
import { digiApi, GetDigimon } from "../../services/digiApi";
import { getDigimons } from "../../types/getDigimons";
import "./index.scss";

export default function Home() {
    const [digimons, setDigimons] = useState<getDigimons[]>([]);
    const [itensPerPage, setItensPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [digimon, setDigimon] = useState([]);

    const pages = Math.ceil(digimons.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = digimons.slice(startIndex, endIndex);

    // useEffect(() => {
    //   digiApi.get('/api/digimon')
    //     .then(response => {
    //         setDigimons(response.data);
    //     })
    // }, [])

    useEffect(() => {
        getAllDigimons()
    }, [])

    async function getAllDigimons() {
        const res = await GetDigimon()
        setDigimons(res)
        setDigimon(res)
    }

    async function searchDigimon() {
        if(search !== ''){
            setDigimons(digimon.filter((e:any) => e.name === search));
        }else{
            setDigimons(digimon)
        }
    }

    useEffect(() => {
        searchDigimon()
    }, [search])
    
    useEffect(() => {
        setDigimons(digimon)
    }, [])


    return(
        <>
       
            <div className="banner">
                <h1 className="text-center">DigiDex</h1>
                <div className="searchBox d-flex flex-column justify-content-center align-items-center">
                    <input type="text"
                    value={search}
                    onChange={(e:any) => setSearch(e.target.value)}
                    placeholder="Pesquise por um digimon"/>
                     {/* <button className="mt-4" onClick={searchDigimon}>Pesquisar</button> */}
                </div>
            </div>

            <div className="row py-5 text-light">
                {currentItens.map((digis:any) => {
                    return (
                    <div key={digis.name} className="digi-card mb-5 d-flex justify-content-center flex-column align-items-center col-md-3 container py-5">
                        <h5>{digis.name}</h5>
                         <img src={digis.img} alt="digimon" /> 
                        <div className="row py-4">
                            <div className="col-md-4">
                                <h6>Level</h6>
                                 <h6>{digis.level}</h6>
                             </div>                
                            </div>
                    </div>
                    )
                })}
                {/* <button onClick={() => {setPage(page + 1)}}>Próximo</button>
                <button onClick={() => {setPage(page - 1)}}>Anterior</button> */}
                 <div className="d-flex justify-content-center pagination-digimons">
                    {Array.from(Array(pages), (item, index) => {
                    return <button value={index} onClick={() => setCurrentPage(index)}>{index}</button> 
                    })}
                </div>
            </div>

            
        </>
    )
}

