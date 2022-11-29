import { useEffect, useState } from "react";
import { GetDigimon } from "../../services/digiApi";
import { getDigimons } from "../../types/getDigimons";
import { MagnifyingGlass } from 'phosphor-react';
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
        // eslint-disable-next-line
    }, [search])

    useEffect(() => {
        setDigimons(digimon)
    }, [digimon])


    return(
        <>
        <div className="teste">
            <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}></select>
        </div>
       
            <div className="banner container-fluid">
                <h1 className="text-center">DigiDex</h1>
                <div className="searchBox d-flex">
                    <div className="search">
                    <MagnifyingGlass className="text-light" size={30}/>
                    </div>
                    <input type="text"
                    value={search}
                    onChange={(e:any) => setSearch(e.target.value)}
                    placeholder="Search"/>
                </div>
            </div>

            <div className="row px-5 py-5 text-light">
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

                 <div className="d-flex justify-content-center pagination-digimons">
                    {Array.from(Array(pages), (item, index) => {
                    return <button value={index} onClick={() => setCurrentPage(index)}>{index + 1}</button> 
                    })}
                </div>
            </div>


            <div className="end py-5">
                <p>&copy; 2022 Feito por <a target="_blank" rel="noreferrer" href="https://myst1-dev.netlify.app/">Myst1 Dev</a> </p>
            </div>
            
        </>
    )
}

