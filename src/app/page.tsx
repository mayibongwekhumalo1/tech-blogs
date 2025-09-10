import Banner from '../components/Banner';

export default function Home() {
  return <main className="border-gray-50"> 
  
  
   <Banner />

   <div className="my-10 bg-blue-500 flex mx-auto w-[70%] ">

    <div className="flex px-auto items-center px-3.5 bg-gray-50">
      <h2>
        Modern Technology  <br />Fest Here
      </h2>

      <button
      
      className='rounded-xl bg-accent w-30 text-sm mx-3 py-2 px-2.5 h-10'
      
      >See Details</button>
    </div>



   </div>


   
  
  
  
   </main>;
}
