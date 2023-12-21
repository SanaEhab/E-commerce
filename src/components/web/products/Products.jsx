import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader';
import '../../../index.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Products() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [countPages, setCountPages] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get("page")) || 1;

    function handlePageChange(newPage) {
        queryParams.set("page", newPage);
        navigate({ search: queryParams.toString() });
      }
    
    const getAllProducts = async()=>{
        try{
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}`);
            setProducts(data.products);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
    } 


    const numberOfPages = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      let pageNumbers = data.total / data.page;
      let pages = [];
      for(let i = 1; i <= pageNumbers; i++){
         pages.push(i);
      }
      setCountPages (pages);
      return pages;
      }

     
    useEffect(() => {
        getAllProducts(currentPage);
        numberOfPages();
    }, [currentPage]);

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className="container">
      <div className="row d-flex flex-wrap">
        {products?(
          products.map((product, index) => (
            <div className="col-lg-12 my-4 d-flex" key={index}>
              <img
                src={product.mainImage.secure_url}
                className="width img-fluid"
                alt={product.name}
              />
              <div className="ms-3 text-center">
                <h6>Product name:</h6>
                <p>{product.name}</p>
                <h6>Description:</h6>
                <p>{product.description}</p>
                <h6>Product price:</h6>
                <p>{product.price}</p>
                <hr />
              </div>
            </div>
          ))
        ) : (
          <p>no products</p>
        )}
      </div>
    
      <nav aria-label="Page navigation example" className='d-flex justify-content-center'>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {countPages&& countPages.map((item,index)=>
          <li className="page-item" key={index}>
            <button className="page-link" onClick={() => handlePageChange(item)}>
              {item}
            </button>
          </li>
          )}
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
