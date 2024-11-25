import React from 'react';

const Servicecss = () => {
  return (
    <style jsx='true'>{`
      .services {
        width:90%;
        // background-color: red;
        display: flex;
        flex-wrap: wrap;
        // flex:1;
        justify-content: center;
        align-items:center;
        margin:0 auto;
      }
    
      .service-card {
        width: calc(20% - 1rem);
        margin: 1rem;
        padding: 1rem;
        border: 1px solid #ccc;
        background-color: #fff;
        text-align: center;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
    
      .service-thumb {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
      }
    
      .service-title {
        font-weight: bold;
        font-size: 1.1875rem;
        text-align: left;
        font-family:'Poppins';
        margin-top: 1rem;
        // style={{fontSize:19,fontFamily:'Poppins'}}
      }
    
      .service-description {
        font-weight: 400;
        font-size: 1rem;
        text-align: left;
        margin-top:0.4rem;
      }
    
      .service-price {
        
        font-size: 0.8rem;
      //  background:red;
       float:left;
       margin-top:0.2rem;
       font-weight: 600;
      
      }
    
      .service-link {
        color: blue;
        font-size: 0.8rem;
        float:right;
        margin-top:0.2rem;
      }

      @media (max-width: 768px) {
        .services {
          // width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          max-width: 100%; /* Change max-width to 100% for full width on small devices */
        }

        .service-card {
          width: 88%; /* Make the cards take 100% width on small devices */
        }
      }
    `}</style>
  );
};

export default Servicecss;
