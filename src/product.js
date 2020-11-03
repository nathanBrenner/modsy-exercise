import styled from 'styled-components';

export function Product({ data }) {
  return (
    <li>
      <Grid>
        <Name>{data.name}</Name>

        <ImgContainer>
          <Img src={data.image} />
        </ImgContainer>
        <Price>${data.regularPrice.toFixed(2)}</Price>
        <Description>{data.shortDescription}</Description>
      </Grid>
    </li>
  );
}

const Grid = styled.div`
  /* mobile first */
  display: grid;
  grid-gap: 20px;
  border-bottom: 1px solid rgb(224, 230, 239);
  padding: 30px 0;
  grid-template-areas:
    'name name'
    'img price'
    'img description';

  /* tablet */
  @media (min-width: 740px) {
    grid-template-rows: 38px 38px 1fr;
    grid-template-areas:
      'img name'
      'img price'
      'img description';
  }

  /* desktop */
  @media (min-width: 1145px) {
    grid-template-areas:
      'img name price'
      'img description .'
      'img description .';
  }
`;

const Name = styled.h4`
  font-family: arial;
  font-size: 16px;
  font-weight: 400;
  color: rgb(4, 87, 200);
  grid-area: name;
  margin: 0;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: auto;
  grid-area: img;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 26px;
  font-family: arial;
  margin: 0;
  grid-area: price;
`;

const Description = styled.p`
  font-size: 16px;
  font-family: arial;
  grid-area: description;
`;
