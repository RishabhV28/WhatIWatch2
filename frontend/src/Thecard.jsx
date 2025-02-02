
import Axios from 'axios'
import $ from 'jquery'
import { useEffect, useState,useTransition } from 'react';

function Thecard(){
    const[isPending,startTransition]=useTransition()
    const[showdiv,setShowdiv]=useState(false)
    const[shownav,setShownav]=useState(false)
    const[isclicked,setIsclicked]=useState("Generate")
    const[data,setData]=useState(null)
    const[loading,setLoading]=useState(true)
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get("/random-film")
          .then((response) => {
            setData(response.data);
            setTimeout(() => setShowData(true), 100); // Delay to allow transition
          })
          .catch((error) => console.error("Error fetching data:", error))
          .finally(() => setLoading(false));
      }, []);

    const getData=async()=>{
        setLoading(true)

        try{

            const response=await Axios.get('/random-film')
            setData(response.data)

        } catch(error) {

            console.error("error fetching data:",error)

        }
        setLoading(false)
    }
    

    function generate(){
        setShowdiv(true)
        startTransition(()=>{getData()})
        
    }
    function shownavbar() {
        setShownav((shownav) => !shownav);
      }
    function clicked(){
        setIsclicked("Regenerate")

    }
    const fetchdata = ()=>{
        setLoading(true)
        setTimeout(()=>setLoading(false),3000)
    }
    
    return(
        <div className="daddy">

        <div  className="about" onClick={shownavbar}>

        {shownav && <div className={`burger-menu ${shownav ? "open" : ""}`} id="burgernav" >

        <nav>
            <ul className='burger_list'>
        
        
                <li><p className="description">Hello, I am Rishabh,
                    a learning web dev and the creator of this webpage,
                    I made this web page as my first passion project,
                    Since I am kind  of a film nerd myself,
                    I figured why not make a recommendation website</p>
                </li>

            <li> <a className="linkedin" target="_blank"  
                href="https://www.linkedin.com/in/rishabh-verma-9a4997262/">
                LinkedIn</a>
            </li>

            <li>
                <a className="Github" target="_blank"  href="https://github.com/RishabhV28">GitHub</a>
            </li>

            <li>
                <p><a className="letterboxd" target="_blank"  href="https://letterboxd.com/mintpapa/list/backend-project/">The full list of films</a> </p>
            
            
            </li>

            </ul>
        </nav>



    </div>}


        <img className="about_img" src="/burger-menu-svgrepo-com(1).svg" alt="" />

        </div>

        <div className="container" >
        

            <h1 className={`logo ${showdiv? "move-up" : ""}`}>What-I-Watch</h1>

            {showdiv && loading && <div className="loading-spinner"></div>}
            
            {showdiv && data && <div className={`button_div `}>
                <ul className="thefinallist">
                    <li><span><h1>{data.Name}</h1><p>Released in {data.Year}</p></span></li>
                    <li> <p>Directed by {data.director}</p></li>
                    <li><p>{data.description}</p></li>
                    <li><p>{data.runtime}</p></li>


                </ul>
                
                {data.poster && <img className="filmposter" src={data.poster} alt={`${data.Name} poster`} />}
                
                
            </div>

                }

            <button className={`GenerateButton ${isclicked? 'clicked':''}`} onClick={()=>{generate();clicked();fetchdata()}}>{isclicked}</button>

        </div>
        
    
        </div>
    )

}
export default Thecard
