import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from './product';
import { Skeleton } from './skeleton';

function url(page = 1) {
  return `https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&page=${page}&apiKey=mPlbr5GXMVkagVgzwT7T2V5X`;
}

const emptyList = Array.from(Array(10).keys());

export function ProductList() {
  const [data, setData] = useState({ products: [] });
  const [pending, setPending] = useState(true);

  function handleScroll() {
    // if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setPending(true);
    }
  }

  function fetchNextPage() {
    // currentPage is data defined from the api response and there's no value for currentPage until the response has come back
    if (data.currentPage) {
      setTimeout(() => {
        // increment the page number before formatting that number for the next page
        fetch(url(++data.currentPage))
          .then((res) => res.json())
          .then((d) =>
            // merge the current value of data with the next value, and combine the existing list of products with the additional products that came back on the response
            setData((currentData) => ({
              ...d,
              products: [...currentData.products, ...d.products],
            })),
          )
          .catch(console.error)
          .finally(() => setPending(false));
      }, 2000);
    } else {
      setPending(false);
    }
  }

  useEffect(() => {
    fetch(url())
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!pending) {
      return;
    }
    fetchNextPage();
  }, [pending]);

  return (
    <Container>
      <Ul>
        {data.products.map((product) => (
          <Product data={product} key={product.sku} />
        ))}
        {/* when the user has scrolled to the bottom, show something that tells the user that data is in flight */}
        {pending
          ? emptyList.map((i) => (
              <SkeletonContainer key={i}>
                <Skeleton height='100px' width='100%' />
              </SkeletonContainer>
            ))
          : null}
      </Ul>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 1145px;
`;

const Ul = styled.ul`
  list-style: none;
`;

const SkeletonContainer = styled.div`
  margin: 20px 0;
`;
