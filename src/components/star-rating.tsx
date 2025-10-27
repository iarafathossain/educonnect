import Image from "next/image";

const StarRating = ({ rating }) => {
  const stars = new Array(rating).fill(0);

  return (
    <>
      {stars.map((_, index) => (
        <Image
          key={index}
          src={`/assets/star.svg`}
          alt="star"
          width={20}
          height={20}
        />
      ))}
    </>
  );
};

export default StarRating;
