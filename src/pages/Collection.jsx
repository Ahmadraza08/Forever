import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if(showSearch && search.length) {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts([...fpCopy].sort((a, b) => a.price - b.price));
        break;
  
      case 'high-low':
        setFilterProducts([...fpCopy].sort((a, b) => b.price - a.price));
        break;
  
      default:
        applyFilter();
        break;
    }
  };
  
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''} sm:block`}
            src={assets.dropdown_icon}
            alt="Filter Icon"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Women" onChange={toggleCategory} /> Women
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />

          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Map */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
