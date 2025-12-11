export const allCarsQuery = `
  *[_type == "car"] | order(_createdAt desc) {
    _id,
    title,
    price,
    image{
      asset->{
        url
      }
    },
    description
  }
`;
